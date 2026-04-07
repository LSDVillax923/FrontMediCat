import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { Cliente } from '../../../cliente/cliente';
import { Veterinario } from '../../../veterinario/veterinario';
import { AuthService } from '../../../user/services/auth.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

interface NuevaMascotaForm {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fechaNacimiento: string;
  edad: number | null;
  peso: number | null;
  estado: string;
  clienteId: number | null;
  enfermedad: string;
  veterinarioAsignado: string;
  observaciones: string;
}

@Component({
  selector: 'app-nueva-mascota',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './nueva-mascota.html',
  styleUrl: './nueva-mascota.css',
})
export class NuevaMascota {
  clientes: Cliente[] = [];
  veterinariosDisponibles: Veterinario[] = [];

  mascotaForm: NuevaMascotaForm = this.formInicial();
  mascotaRegistrada = '';
  error = '';

  constructor(
    private readonly mascotaService: MascotaService,
    private readonly clienteService: ClienteService,
    private readonly veterinarioService: VeterinarioService,
    private readonly authService: AuthService,
  ) {
    const sesion = this.authService.getSesion();

    // Si es un cliente registrando su propia mascota, pre-selecciona su id
    if (sesion?.rol === 'cliente') {
      this.mascotaForm.clienteId = sesion.id;
      this.clientes = this.clienteService.getAll().filter((c) => c.id === sesion.id);
    } else {
      this.clientes = this.clienteService.getAll();
    }

    this.veterinariosDisponibles = this.veterinarioService.getActivos();
  }

  registrarMascota(): void {
    const { clienteId, nombre, especie, raza, sexo, fechaNacimiento, edad, peso, estado, enfermedad, veterinarioAsignado, observaciones } = this.mascotaForm;

    if (!clienteId || !nombre || !especie || !raza || !estado) {
      this.error = 'Completa todos los campos obligatorios.';
      return;
    }

    const cliente = this.clienteService.getById(clienteId);
    const propietario = cliente ? `${cliente.nombre} ${cliente.apellido}` : '';

    this.mascotaService.add({
      nombre,
      especie,
      raza,
      sexo,
      fechaNacimiento,
      edad: edad ?? 0,
      peso: peso ?? 0,
      estado: estado as 'Activa' | 'Tratamiento' | 'Inactiva', 
      enfermedad,
      observaciones,
      veterinarioAsignado,
      clienteId,
      propietario,
    });

    this.mascotaRegistrada = `La mascota "${nombre}" fue registrada correctamente.`;
    this.error = '';
    this.mascotaForm = this.formInicial();

    // Restaurar clienteId si es cliente
    const sesion = this.authService.getSesion();
    if (sesion?.rol === 'cliente') {
      this.mascotaForm.clienteId = sesion.id;
    }
  }

  private formInicial(): NuevaMascotaForm {
    return {
      nombre: '',
      especie: '',
      raza: '',
      sexo: '',
      fechaNacimiento: '',
      edad: null,
      peso: null,
      estado: '',
      clienteId: null,
      enfermedad: '',
      veterinarioAsignado: '',
      observaciones: '',
    };
  }
}
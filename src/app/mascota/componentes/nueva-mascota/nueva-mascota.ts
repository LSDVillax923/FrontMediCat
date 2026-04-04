import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { Cliente } from '../../../cliente/cliente';
import { Veterinario } from '../../../veterinario/veterinario';

interface NuevaMascotaForm {
  nombre: string;
  especie: string;
  raza: string;
  edad: number | null;
  peso: number | null;
  estado: string;
  clienteId: number | null;
  enfermedad: string;
  tratamiento: string;
  veterinarioAsignado: string;
  observaciones: string;
}

@Component({
  selector: 'app-nueva-mascota',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nueva-mascota.html',
  styleUrl: './nueva-mascota.css',
})
export class NuevaMascota {
  clientes: Cliente[] = [];
  veterinariosDisponibles: Veterinario[] = [];
  readonly tratamientosDisponibles = [
    'Control general',
    'Antibiótico oral',
    'Curaciones y seguimiento',
  ];

  mascotaForm: NuevaMascotaForm = this.crearFormularioInicial();
  mascotaRegistrada = '';

  constructor(
    private readonly mascotaService: MascotaService,
    private readonly clienteService: ClienteService,
    private readonly veterinarioService: VeterinarioService,
  ) {
    this.clientes = this.clienteService.getAll();
    this.veterinariosDisponibles = this.veterinarioService.getActivos();
  }

  registrarMascota(): void {
    const clienteSeleccionado = this.clienteService.getById(this.mascotaForm.clienteId!);
    if (!clienteSeleccionado) return;

    this.mascotaService.add({
      nombre: this.mascotaForm.nombre,
      especie: this.mascotaForm.especie,
      raza: this.mascotaForm.raza,
      edad: this.mascotaForm.edad ?? 0,
      peso: this.mascotaForm.peso ?? 0,
      foto: '',
      estado: (this.mascotaForm.estado as 'activa' | 'tratamiento' | 'inactiva') || 'activa',
      enfermedad: this.mascotaForm.enfermedad,
      observaciones: this.mascotaForm.observaciones,
      tratamiento: this.mascotaForm.tratamiento,
      veterinarioAsignado: this.mascotaForm.veterinarioAsignado,
      cliente: clienteSeleccionado,
      tratamientos: [],
    });

    this.mascotaRegistrada = `Mascota "${this.mascotaForm.nombre}" registrada correctamente.`;
    this.mascotaForm = this.crearFormularioInicial();
  }

  private crearFormularioInicial(): NuevaMascotaForm {
    return {
      nombre: '',
      especie: '',
      raza: '',
      edad: null,
      peso: null,
      estado: '',
      clienteId: null,
      enfermedad: '',
      tratamiento: '',
      veterinarioAsignado: '',
      observaciones: '',
    };
  }
}
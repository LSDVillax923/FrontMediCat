import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
}

interface Veterinario {
  nombre: string;
  especialidad: string;
}

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
  clientes: Cliente[] = [
    { id: 1, nombre: 'María', apellido: 'Gómez' },
    { id: 2, nombre: 'Carlos', apellido: 'Ramos' },
    { id: 3, nombre: 'Laura', apellido: 'Pérez' },
  ];

  tratamientosDisponibles: string[] = [
    'Control general',
    'Antibiótico oral',
    'Curaciones y seguimiento',
  ];

  veterinariosDisponibles: Veterinario[] = [
    { nombre: 'Dra. Martínez', especialidad: 'Dermatología' },
    { nombre: 'Dr. Herrera', especialidad: 'Cirugía' },
    { nombre: 'Dra. Salazar', especialidad: 'Medicina interna' },
  ];

  mascotaForm: NuevaMascotaForm = this.crearFormularioInicial();
  mascotaRegistrada = '';

  registrarMascota(): void {
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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { EstadoMascota } from '../../models/mascota.model';
import { MascotaService } from '../../services/mascota.service';

interface MascotaForm {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: EstadoMascota;
  enfermedad: string;
  observaciones: string;
  tratamiento: string;
  veterinarioAsignado: string;
}

@Component({
  selector: 'app-editar-mascota',
 
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-mascota.html',
  styleUrl: './editar-mascota.css',
})

export class EditarMascota {
  mascota: MascotaForm = {
    id: 0,
     nombre: '',
    especie: '',
    raza: '',
    edad: 0,
    peso: 0,
    estado: 'activa',
    enfermedad: '',
    observaciones: '',
    tratamiento: '',
    veterinarioAsignado: '',
  };

  readonly tratamientosDisponibles = [
    'Control antiparasitario',
    'Antibiótico oral',
    'Suplementación vitamínica',
    'Fisioterapia',
  ];

  readonly veterinariosDisponibles = [
    { nombre: 'Dra. Paula Torres', especialidad: 'Medicina Interna' },
    { nombre: 'Dr. Mateo Salazar', especialidad: 'Cirugía' },
    { nombre: 'Dra. Laura Ramírez', especialidad: 'Dermatología' },
  ];

  mensaje = '';
  error = '';


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly mascotaService: MascotaService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const mascotaExistente = this.mascotaService.getById(id);

    if (!mascotaExistente) {
      this.error = 'No se encontró la mascota para editar.';
      return;
    }

    this.mascota = {
      id: mascotaExistente.id,
      nombre: mascotaExistente.nombre,
      especie: mascotaExistente.especie,
      raza: mascotaExistente.raza,
      edad: mascotaExistente.edad,
      peso: mascotaExistente.peso,
      estado: mascotaExistente.estado,
      enfermedad: mascotaExistente.enfermedad ?? '',
      observaciones: mascotaExistente.observaciones ?? '',
      tratamiento: mascotaExistente.tratamiento ?? '',
      veterinarioAsignado: mascotaExistente.veterinarioAsignado ?? '',
    };
  }

  guardarCambios(): void {
    if (!this.mascota.nombre || !this.mascota.especie || !this.mascota.raza) {
      this.error = 'Completa los campos obligatorios de la mascota.';
      this.mensaje = '';
      return;
    }

    this.mascotaService.update(this.mascota.id, {
      nombre: this.mascota.nombre,
      especie: this.mascota.especie,
      raza: this.mascota.raza,
      edad: this.mascota.edad,
      peso: this.mascota.peso,
      estado: this.mascota.estado,
      enfermedad: this.mascota.enfermedad,
      observaciones: this.mascota.observaciones,
      tratamiento: this.mascota.tratamiento,
      veterinarioAsignado: this.mascota.veterinarioAsignado,
    });
    this.mensaje = `Se actualizaron los datos de ${this.mascota.nombre}.`;
    this.error = '';
    this.router.navigate(['/mascotas']);
  }

  cancelar(): void {
    this.router.navigate(['/mascotas']);
  }
}
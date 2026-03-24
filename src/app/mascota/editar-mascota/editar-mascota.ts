import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface MascotaForm {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: 'Sano' | 'En Tratamiento' | 'Requiere Atención';
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
    nombre: 'Luna',
    especie: 'Canino',
    raza: 'Labrador',
    edad: 4,
    peso: 18.2,
    estado: 'Sano',
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mascota.id = Number.isNaN(id) ? 0 : id;
  }

  guardarCambios(): void {
    this.mensaje = `Se actualizaron los datos de ${this.mascota.nombre}.`;
  }

  cancelar(): void {
    this.router.navigate(['/mascotas']);
  }
}
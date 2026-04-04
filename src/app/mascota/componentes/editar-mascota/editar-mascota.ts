import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';

interface MascotaForm {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: 'activa' | 'tratamiento' | 'inactiva';
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

  veterinariosDisponibles: { nombre: string; especialidad: string }[] = [];
  mensaje = '';
  noEncontrada = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly mascotaService: MascotaService,
    private readonly veterinarioService: VeterinarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const encontrada = this.mascotaService.getById(id);

    if (encontrada) {
      this.mascota = {
        id: encontrada.id,
        nombre: encontrada.nombre,
        especie: encontrada.especie,
        raza: encontrada.raza,
        edad: encontrada.edad,
        peso: encontrada.peso,
        estado: encontrada.estado as 'activa' | 'tratamiento' | 'inactiva',
        enfermedad: encontrada.enfermedad,
        observaciones: encontrada.observaciones,
        tratamiento: encontrada.tratamiento,
        veterinarioAsignado: encontrada.veterinarioAsignado,
      };
    } else {
      this.noEncontrada = true;
    }

    this.veterinariosDisponibles = this.veterinarioService
      .getActivos()
      .map((v) => ({ nombre: v.nombre, especialidad: v.especialidad }));
  }

  guardarCambios(): void {
    this.mascotaService.update(this.mascota.id, this.mascota);
    this.mensaje = `Se actualizaron los datos de ${this.mascota.nombre}.`;
  }

  cancelar(): void {
    this.router.navigate(['/mascotas']);
  }
}
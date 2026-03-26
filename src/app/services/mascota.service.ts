import { Injectable } from '@angular/core';
import type { Mascota } from '../models/mascota.model';
import type { EstadoMascota } from '../models/mascota.model';
import { MOCK_MASCOTAS } from '../data/mock-data';

export interface MascotaFormData {
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: EstadoMascota;
  foto?: string;
  enfermedad?: string;
  observaciones?: string;
  tratamiento?: string;
  veterinarioAsignado?: string;
}

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = MOCK_MASCOTAS.map((m) => ({ ...m }));
  private nextId: number = Math.max(...MOCK_MASCOTAS.map((m) => m.id)) + 1;

   getAll(): Mascota[] {
    return this.mascotas;
  }

  getById(id: number): Mascota | undefined {
    return this.mascotas.find((m) => m.id === id);
  }

  add(data: MascotaFormData): void {
    this.mascotas.push({
      id: this.nextId++,
      ...data,
    });
  }

  update(id: number, data: MascotaFormData): void {
    const idx = this.mascotas.findIndex((m) => m.id === id);
    if (idx === -1) return;

    this.mascotas[idx] = {
      ...this.mascotas[idx],
      ...data,
    };
  }

  delete(id: number): void {
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
  }

  // Compatibilidad con componentes actuales
  listar(): Mascota[] {
    return this.getAll();
  }
  desactivar(id: number): void {
    const mascota = this.getById(id);
    if (!mascota) return;

    this.update(id, {
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      edad: mascota.edad,
      peso: mascota.peso,
      estado: 'inactiva',
      foto: mascota.foto,
      enfermedad: mascota.enfermedad,
      observaciones: mascota.observaciones,
      tratamiento: mascota.tratamiento,
      veterinarioAsignado: mascota.veterinarioAsignado,
    });
  }
}
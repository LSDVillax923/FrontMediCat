import { Injectable } from '@angular/core';
import { Mascota } from '../mascota';
import { MASCOTAS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = [...MASCOTAS_MOCK];
  private nextId = this.mascotas.length + 1;

  /** Devuelve todas las mascotas */
  getAll(): Mascota[] {
    return this.mascotas;
  }

  /** Devuelve las mascotas de un cliente específico */
  getByClienteId(clienteId: number): Mascota[] {
    return this.mascotas.filter((m) => m.cliente?.id === clienteId);
  }

  /** Devuelve una mascota por id */
  getById(id: number): Mascota | null {
    return this.mascotas.find((m) => m.id === id) ?? null;
  }

  /** Agrega una nueva mascota */
  add(mascota: Omit<Mascota, 'id'>): Mascota {
    const nueva: Mascota = { ...mascota, id: this.nextId++ };
    this.mascotas.push(nueva);
    return nueva;
  }

  /** Actualiza una mascota existente */
  update(id: number, cambios: Partial<Mascota>): Mascota | null {
    const idx = this.mascotas.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.mascotas[idx] = { ...this.mascotas[idx], ...cambios };
    return this.mascotas[idx];
  }

  /** Desactiva una mascota (cambia estado a 'inactiva') */
  desactivar(id: number): boolean {
    return !!this.update(id, { estado: 'inactiva' });
  }

  /** Elimina una mascota */
  delete(id: number): boolean {
    const antes = this.mascotas.length;
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
    return this.mascotas.length < antes;
  }

  /** Estadísticas rápidas */
  getStats(): { total: number; activas: number; tratamiento: number; inactivas: number } {
    return {
      total: this.mascotas.length,
      activas: this.mascotas.filter((m) => m.estado === 'activa').length,
      tratamiento: this.mascotas.filter((m) => m.estado === 'tratamiento').length,
      inactivas: this.mascotas.filter((m) => m.estado === 'inactiva').length,
    };
  }
}
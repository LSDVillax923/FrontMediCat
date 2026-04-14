import { Injectable } from '@angular/core';
import { Mascota } from '../mascota';
import { MASCOTAS_MOCK } from '../../shared/data/mock-data';
import { TratamientoService } from '../../tratamiento/services/tratamiento-service';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = [];
  private nextId = 1;

  constructor(private readonly tratamientoService: TratamientoService) {
    this.mascotas = [...MASCOTAS_MOCK];
    this.nextId = Math.max(...this.mascotas.map(m => m.id), 0) + 1;
  }

  getAll(): Mascota[] {
    return this.mascotas;
  }

  getById(id: number): Mascota | null {
    return this.mascotas.find((m) => m.id === id) ?? null;
  }

  getByClienteId(clienteId: number): Mascota[] {
    return this.mascotas.filter((m) => m.clienteId === clienteId);
  }

  add(mascota: Omit<Mascota, 'id'>): Mascota {
    const nueva: Mascota = { ...mascota, id: this.nextId++ };
    this.mascotas.push(nueva);
    return nueva;
  }

  update(id: number, cambios: Partial<Mascota>): Mascota | null {
    const idx = this.mascotas.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.mascotas[idx] = { ...this.mascotas[idx], ...cambios };
    return this.mascotas[idx];
  }

  /**
   * ELIMINACIÓN EN CASCADA DE MASCOTA
   * 1. Elimina todos los tratamientos asociados a la mascota
   * 2. Elimina la mascota
   */
  delete(id: number): boolean {
    const mascota = this.getById(id);
    if (!mascota) {
      console.log(`Mascota con ID ${id} no encontrada`);
      return false;
    }

    console.log(`Eliminando mascota: ${mascota.nombre} (ID: ${mascota.id})`);

    // 1. Eliminar todos los tratamientos de esta mascota
    const tratamientosEliminados = this.tratamientoService.deleteByMascotaId(id);
    console.log(`  Tratamientos eliminados: ${tratamientosEliminados}`);

    // 2. Eliminar la mascota
    const antes = this.mascotas.length;
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
    const mascotaEliminada = this.mascotas.length < antes;

    if (mascotaEliminada) {
      console.log(`  Mascota ${mascota.nombre} eliminada correctamente`);
    } else {
      console.log(`  Error al eliminar mascota ${mascota.nombre}`);
    }

    return mascotaEliminada;
  }

  /**
   * Marca la mascota como inactiva (no la elimina físicamente)
   */
  desactivar(id: number): void {
    this.update(id, { estado: 'Inactiva' });
  }

  /**
   * Reactiva una mascota
   */
  activar(id: number): void {
    this.update(id, { estado: 'Activa' });
  }

  search(query: string): Mascota[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.getAll();
    return this.getAll().filter(
      (m) =>
        m.nombre.toLowerCase().includes(filtro) ||
        m.especie.toLowerCase().includes(filtro) ||
        m.raza.toLowerCase().includes(filtro) ||
        (m.propietario?.toLowerCase().includes(filtro) ?? false),
    );
  }
}
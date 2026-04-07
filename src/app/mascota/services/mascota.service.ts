import { Injectable } from '@angular/core';
import { Mascota } from '../mascota';
import { MASCOTAS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = [...MASCOTAS_MOCK];
  private nextId = this.mascotas.length + 1;

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

  delete(id: number): boolean {
    const antes = this.mascotas.length;
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
    return this.mascotas.length < antes;
  }

 // Marca la mascota como inactiva sin eliminarla
  desactivar(id: number): void {
    this.update(id, { estado: 'Inactiva' }); // ¡CORREGIDO! (Antes era 'Crítico')
  }

  search(query: string): Mascota[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.mascotas;
    return this.mascotas.filter(
      (m) =>
        m.nombre.toLowerCase().includes(filtro) ||
        m.especie.toLowerCase().includes(filtro) ||
        m.raza.toLowerCase().includes(filtro),
    );
  }
}
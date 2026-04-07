import { Injectable } from '@angular/core';
import { Mascota } from '../mascota';
import { MASCOTAS_MOCK } from '../../shared/data/mock-data';
import { TratamientoService } from '../../tratamiento/services/tratamiento.service';

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

  delete(id: number): boolean {
    const antes = this.mascotas.length;
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
    return this.mascotas.length < antes;
  }

  desactivar(id: number): void {
    this.update(id, { estado: 'Inactiva' });
  }

  search(query: string): Mascota[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.getAll();
    return this.getAll().filter(
      (m) =>
        m.nombre.toLowerCase().includes(filtro) ||
        m.especie.toLowerCase().includes(filtro) ||
        m.raza.toLowerCase().includes(filtro),
    );
  }
}
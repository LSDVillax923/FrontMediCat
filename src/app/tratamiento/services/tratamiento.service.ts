import { Injectable } from '@angular/core';
import { Tratamiento } from '../tratamiento';
import { TRATAMIENTOS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private tratamientos: Tratamiento[] = [...TRATAMIENTOS_MOCK];
  private nextId = this.tratamientos.length + 1;

  getAll(): Tratamiento[] {
    return this.tratamientos;
  }

  getById(id: number): Tratamiento | null {
    return this.tratamientos.find((t) => t.id === id) ?? null;
  }

  getByClienteId(clienteId: number): Tratamiento[] {
    return this.tratamientos.filter((t) => t.clienteId === clienteId);
  }

  getByMascotaId(mascotaId: number): Tratamiento[] {
    return this.tratamientos.filter((t) => t.mascotaId === mascotaId);
  }

  getByVeterinarioId(veterinarioId: number): Tratamiento[] {
    return this.tratamientos.filter((t) => t.veterinarioId === veterinarioId);
  }

  add(tratamiento: Omit<Tratamiento, 'id'>): Tratamiento {
    const nuevo: Tratamiento = { ...tratamiento, id: this.nextId++ };
    this.tratamientos.push(nuevo);
    return nuevo;
  }

  update(id: number, cambios: Partial<Tratamiento>): Tratamiento | null {
    const idx = this.tratamientos.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.tratamientos[idx] = { ...this.tratamientos[idx], ...cambios };
    return this.tratamientos[idx];
  }

  delete(id: number): boolean {
    const antes = this.tratamientos.length;
    this.tratamientos = this.tratamientos.filter((t) => t.id !== id);
    return this.tratamientos.length < antes;
  }

  search(query: string): Tratamiento[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.tratamientos;
    return this.tratamientos.filter(
      (t) =>
        t.mascota.toLowerCase().includes(filtro) ||
        t.veterinario.toLowerCase().includes(filtro) ||
        t.diagnostico.toLowerCase().includes(filtro),
    );
  }
}
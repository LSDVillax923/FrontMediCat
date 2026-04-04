import { Injectable } from '@angular/core';
import { Veterinario } from '../veterinario';
import { VETERINARIOS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private veterinarios: Veterinario[] = [...VETERINARIOS_MOCK];
  private nextId = this.veterinarios.length + 1;

  getAll(): Veterinario[] {
    return this.veterinarios;
  }

  getActivos(): Veterinario[] {
    return this.veterinarios.filter((v) => v.estado === 'activo');
  }

  getById(id: number): Veterinario | null {
    return this.veterinarios.find((v) => v.id === id) ?? null;
  }

  add(vet: Omit<Veterinario, 'id' | 'tratamientos'>): Veterinario {
    const nuevo: Veterinario = { ...vet, id: this.nextId++, tratamientos: [] };
    this.veterinarios.push(nuevo);
    return nuevo;
  }

  update(id: number, cambios: Partial<Veterinario>): Veterinario | null {
    const idx = this.veterinarios.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    this.veterinarios[idx] = { ...this.veterinarios[idx], ...cambios };
    return this.veterinarios[idx];
  }

  delete(id: number): boolean {
    const antes = this.veterinarios.length;
    this.veterinarios = this.veterinarios.filter((v) => v.id !== id);
    return this.veterinarios.length < antes;
  }
}
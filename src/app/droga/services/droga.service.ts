import { Injectable } from '@angular/core';
import { Droga } from '../droga';
import { DROGAS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class DrogaService {
  private drogas: Droga[] = [...DROGAS_MOCK];
  private nextId = this.drogas.length + 1;

  getAll(): Droga[] {
    return this.drogas;
  }

  getById(id: number): Droga | null {
    return this.drogas.find((d) => d.id === id) ?? null;
  }

  add(droga: Omit<Droga, 'id'>): Droga {
    const nueva: Droga = { ...droga, id: this.nextId++ };
    this.drogas.push(nueva);
    return nueva;
  }

  update(id: number, cambios: Partial<Droga>): Droga | null {
    const idx = this.drogas.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    this.drogas[idx] = { ...this.drogas[idx], ...cambios };
    return this.drogas[idx];
  }

  delete(id: number): boolean {
    const antes = this.drogas.length;
    this.drogas = this.drogas.filter((d) => d.id !== id);
    return this.drogas.length < antes;
  }

  search(query: string): Droga[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.drogas;
    return this.drogas.filter(
      (d) =>
        d.nombre.toLowerCase().includes(filtro) ||
        d.descripcion.toLowerCase().includes(filtro),
    );
  }
}

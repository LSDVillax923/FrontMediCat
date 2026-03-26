import { Injectable } from '@angular/core';
import type { Mascota } from '../models/mascota.model';
import { MOCK_MASCOTAS } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = structuredClone(MOCK_MASCOTAS);

  listar(): Mascota[] {
    return this.mascotas;
  }

  desactivar(id: number): void {
    this.mascotas = this.mascotas.map((m) =>
      m.id === id ? { ...m, estado: 'inactiva' } : m,
    );
  }
}
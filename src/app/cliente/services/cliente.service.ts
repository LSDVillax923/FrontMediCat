import { Injectable } from '@angular/core';
import { Cliente } from '../cliente';
import { CLIENTES_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [...CLIENTES_MOCK];
  private nextId = this.clientes.length + 1;

  getAll(): Cliente[] {
    return this.clientes;
  }

  getById(id: number): Cliente | null {
    return this.clientes.find((c) => c.id === id) ?? null;
  }

  add(cliente: Omit<Cliente, 'id' | 'mascotas'>): Cliente {
    const nuevo: Cliente = { ...cliente, id: this.nextId++, mascotas: [] };
    this.clientes.push(nuevo);
    return nuevo;
  }

  update(id: number, cambios: Partial<Cliente>): Cliente | null {
    const idx = this.clientes.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.clientes[idx] = { ...this.clientes[idx], ...cambios };
    return this.clientes[idx];
  }

  delete(id: number): boolean {
    const antes = this.clientes.length;
    this.clientes = this.clientes.filter((c) => c.id !== id);
    return this.clientes.length < antes;
  }

  /** Busca clientes por nombre, apellido, correo o celular */
  search(query: string): Cliente[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.clientes;
    return this.clientes.filter(
      (c) =>
        c.nombre.toLowerCase().includes(filtro) ||
        c.apellido.toLowerCase().includes(filtro) ||
        c.correo.toLowerCase().includes(filtro) ||
        c.celular.toLowerCase().includes(filtro),
    );
  }
}
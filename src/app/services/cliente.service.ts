import { Injectable } from '@angular/core';
import type { Cliente } from '../models/cliente.model';
import { MOCK_CLIENTES } from '../data/mock-data';

export interface ClienteFormData {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia?: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
   private clientes: Cliente[] = MOCK_CLIENTES.map((c) => ({ ...c }));
  private nextId: number = Math.max(...MOCK_CLIENTES.map((c) => c.id)) + 1;
  getAll(): Cliente[] {
    return this.clientes;
  }
  getById(id: number): Cliente | undefined {
    return this.clientes.find((c) => c.id === id);
  }

  add(data: ClienteFormData): void {
    this.clientes.push({
      id: this.nextId++,
      ...data,
      mascotas: [],
    });
  }

  update(id: number, data: ClienteFormData): void {
    const idx = this.clientes.findIndex((c) => c.id === id);
    if (idx === -1) return;

    this.clientes[idx] = {
      ...this.clientes[idx],
      ...data,
    };
  }

  delete(id: number): void {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }
  // Compatibilidad con componentes actuales
  listar(): Cliente[] {
    return this.getAll();
  }

  eliminar(id: number): void {
    this.delete(id);
  }
}
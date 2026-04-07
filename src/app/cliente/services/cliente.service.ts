import { Injectable } from '@angular/core';
import { Cliente } from '../cliente';
import { CLIENTES_MOCK } from '../../shared/data/mock-data';
import { MascotaService } from '../../mascota/services/mascota.service';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor(private readonly mascotaService: MascotaService) {
    this.clientes = [...CLIENTES_MOCK];
    this.actualizarMascotasDeClientes();
  }

  private actualizarMascotasDeClientes(): void {
    this.clientes.forEach(cliente => {
      cliente.mascotas = this.mascotaService.getByClienteId(cliente.id);
    });
  }

  getAll(): Cliente[] {
    this.actualizarMascotasDeClientes();
    return this.clientes;
  }

  getById(id: number): Cliente | null {
    const cliente = this.clientes.find((c) => c.id === id) ?? null;
    if (cliente) {
      cliente.mascotas = this.mascotaService.getByClienteId(id);
    }
    return cliente;
  }

  add(cliente: Omit<Cliente, 'id' | 'mascotas'>): Cliente {
    const nuevoId = Math.max(...this.clientes.map(c => c.id), 0) + 1;
    const nuevo: Cliente = { ...cliente, id: nuevoId, mascotas: [] };
    this.clientes.push(nuevo);
    return nuevo;
  }

  update(id: number, cambios: Partial<Omit<Cliente, 'mascotas'>>): Cliente | null {
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

  search(query: string): Cliente[] {
    const filtro = query.trim().toLowerCase();
    if (!filtro) return this.getAll();
    return this.getAll().filter(
      (c) =>
        c.nombre.toLowerCase().includes(filtro) ||
        c.apellido.toLowerCase().includes(filtro) ||
        c.correo.toLowerCase().includes(filtro) ||
        c.celular.toLowerCase().includes(filtro),
    );
  }
}
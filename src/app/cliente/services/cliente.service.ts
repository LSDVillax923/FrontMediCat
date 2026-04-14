import { Injectable } from '@angular/core';
import { Cliente } from '../cliente';
import { CLIENTES_MOCK } from '../../shared/data/mock-data';
import { MascotaService } from '../../mascota/services/mascota.service';
import { TratamientoService } from '../../tratamiento/services/tratamiento-service';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [];
  private nextId = 1;

  constructor(
    private readonly mascotaService: MascotaService,
    private readonly tratamientoService: TratamientoService,
  ) {
    this.cargarClientesConMascotas();
  }

  private cargarClientesConMascotas(): void {
    this.clientes = [...CLIENTES_MOCK];
    
    this.clientes.forEach(cliente => {
      cliente.mascotas = this.mascotaService.getByClienteId(cliente.id);
    });
    
    this.nextId = Math.max(...this.clientes.map(c => c.id), 0) + 1;
  }

  getAll(): Cliente[] {
    this.clientes.forEach(cliente => {
      cliente.mascotas = this.mascotaService.getByClienteId(cliente.id);
    });
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
    const nuevo: Cliente = { ...cliente, id: this.nextId++, mascotas: [] };
    this.clientes.push(nuevo);
    return nuevo;
  }

  update(id: number, cambios: Partial<Omit<Cliente, 'mascotas'>>): Cliente | null {
    const idx = this.clientes.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.clientes[idx] = { ...this.clientes[idx], ...cambios };
    return this.clientes[idx];
  }

  /**
   * ELIMINACIÓN EN CASCADA COMPLETA
   * 1. Obtiene todas las mascotas del cliente
   * 2. Por cada mascota, elimina sus tratamientos
   * 3. Elimina cada mascota
   * 4. Finalmente elimina el cliente
   */
  delete(id: number): boolean {
    const cliente = this.getById(id);
    if (!cliente) {
      console.log(`Cliente con ID ${id} no encontrado`);
      return false;
    }

    console.log(`Eliminando cliente: ${cliente.nombre} ${cliente.apellido}`);
    console.log(`Mascotas a eliminar: ${cliente.mascotas.length}`);

    // 1. Eliminar todas las mascotas del cliente (cada una elimina sus tratamientos)
    for (const mascota of cliente.mascotas) {
      console.log(`  Eliminando mascota: ${mascota.nombre} (ID: ${mascota.id})`);
      const mascotaEliminada = this.mascotaService.delete(mascota.id);
      if (!mascotaEliminada) {
        console.log(`    Error al eliminar mascota ${mascota.nombre}`);
      }
    }

    // 2. Eliminar el cliente
    const antes = this.clientes.length;
    this.clientes = this.clientes.filter((c) => c.id !== id);
    const clienteEliminado = this.clientes.length < antes;

    if (clienteEliminado) {
      console.log(`Cliente ${cliente.nombre} ${cliente.apellido} eliminado correctamente`);
    } else {
      console.log(`Error al eliminar cliente ${cliente.nombre} ${cliente.apellido}`);
    }

    return clienteEliminado;
  }

  /**
   * Elimina un cliente solo si no tiene mascotas (eliminación segura)
   */
  deleteIfNoMascotas(id: number): { success: boolean; message: string } {
    const cliente = this.getById(id);
    if (!cliente) {
      return { success: false, message: 'Cliente no encontrado' };
    }

    if (cliente.mascotas.length > 0) {
      return { 
        success: false, 
        message: `No se puede eliminar el cliente porque tiene ${cliente.mascotas.length} mascota(s) asociadas.`
      };
    }

    const antes = this.clientes.length;
    this.clientes = this.clientes.filter((c) => c.id !== id);
    
    return { 
      success: this.clientes.length < antes, 
      message: this.clientes.length < antes ? 'Cliente eliminado correctamente' : 'Error al eliminar cliente'
    };
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
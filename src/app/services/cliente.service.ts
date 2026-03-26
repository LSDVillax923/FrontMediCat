import { Injectable } from '@angular/core';
import type { Cliente } from '../models/cliente.model';
import { MOCK_CLIENTES } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = structuredClone(MOCK_CLIENTES);

  listar(): Cliente[] {
    return this.clientes;
  }

  eliminar(id: number): void {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }
}
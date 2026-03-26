import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-cliente.html',
  styleUrl: './listar-cliente.css',
})

export class ListarCliente {
  busqueda = '';
  mensaje = '';
  error = '';
  clientes: Cliente[] = [];

  constructor(private readonly clienteService: ClienteService) {
    this.clientes = this.clienteService.listar();
  }

  get clientesFiltrados(): Cliente[] {
    const filtro = this.busqueda.trim().toLowerCase();

    return this.clientes.filter((cliente) => {
      if (!filtro) {
        return true;
      }

      return (
        cliente.nombre.toLowerCase().includes(filtro) ||
        cliente.apellido.toLowerCase().includes(filtro) ||
        cliente.correo.toLowerCase().includes(filtro) ||
        cliente.celular.toLowerCase().includes(filtro)
      );
    });
  }

  get totalClientes(): number {
    return this.clientesFiltrados.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

   eliminarCliente(cliente: Cliente): void {
    this.clienteService.eliminar(cliente.id);
    this.clientes = this.clienteService.listar();
    this.mensaje = `${cliente.nombre} ${cliente.apellido} fue eliminado correctamente.`;
    this.error = '';
  }
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../cliente';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-cliente.html',
  styleUrl: './listar-cliente.css',
})
export class ListarCliente {
  busqueda = '';
  mensaje = '';
  error = '';

  constructor(private readonly clienteService: ClienteService) {}

  get clientesFiltrados(): Cliente[] {
    return this.clienteService.search(this.busqueda);
  }

  get totalClientes(): number {
    return this.clientesFiltrados.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  eliminarCliente(cliente: Cliente): void {
  const mensajeConfirmacion = cliente.mascotas.length > 0
    ? `¿Eliminar a ${cliente.nombre} ${cliente.apellido}? Esta acción también eliminará sus ${cliente.mascotas.length} mascota(s) y todos sus tratamientos asociados.`
    : `¿Eliminar a ${cliente.nombre} ${cliente.apellido}?`;

  if (!confirm(mensajeConfirmacion)) return;
  
  const ok = this.clienteService.delete(cliente.id);
  if (ok) {
    this.mensaje = `${cliente.nombre} ${cliente.apellido} fue eliminado correctamente junto con sus mascotas y tratamientos.`;
    this.error = '';
  } else {
    this.error = 'No se pudo eliminar el cliente.';
  }
}
}
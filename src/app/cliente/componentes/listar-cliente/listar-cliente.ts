import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../cliente';
import { ClienteRestService } from '../../services/cliente-rest.service';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { ClienteMapper } from '../../../shared/api/model-mappers';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-cliente.html',
  styleUrl: './listar-cliente.css',
})

export class ListarCliente implements OnInit {
  busqueda = '';
  mensaje = '';
  error = '';
  clientes: Cliente[] = [];

  constructor(private readonly clienteRestService: ClienteRestService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes(): void {
    this.clienteRestService.getAll().subscribe({
      next: (clientesDto) => {
        this.clientes = clientesDto.map(ClienteMapper.fromDto);
      },
      error: () => {
        this.error = 'No se pudieron cargar los clientes desde el servidor.';
        this.clientes = [];
      },
    });
  }

  get clientesFiltrados(): Cliente[] {
    if (!this.busqueda.trim()) {
      return this.clientes;
    }
    const filtro = this.busqueda.trim().toLowerCase();
    return this.clientes.filter(
      (c) =>
        c.nombre.toLowerCase().includes(filtro) ||
        c.apellido.toLowerCase().includes(filtro) ||
        c.correo.toLowerCase().includes(filtro) ||
        c.celular.toLowerCase().includes(filtro),
    );
  }

  get totalClientes(): number {
    return this.clientesFiltrados.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  eliminarCliente(cliente: Cliente): void {
    const totalMascotas = cliente.mascotas?.length || 0;
    

    let mensajeConfirmacion = '';
    if (totalMascotas > 0) {
      mensajeConfirmacion =
        `⚠️ ¡ADVERTENCIA!\n\n` +
        `¿Estás seguro de eliminar a ${cliente.nombre} ${cliente.apellido}?\n\n` +
        `Esta acción ELIMINARÁ PERMANENTEMENTE:\n` +
        `• ${totalMascotas} mascota(s) asociada(s)\n` +
        `• Todos los tratamientos de esas mascotas\n\n` +
        `Esta acción no se puede deshacer.`;
    } else {
      mensajeConfirmacion =
        `¿Eliminar a ${cliente.nombre} ${cliente.apellido}?\n\n` +
        `Esta acción no se puede deshacer.`;
    }

    if (!confirm(mensajeConfirmacion)) return;
    this.clienteRestService.delete(cliente.id).subscribe({
      next: () => {
        let mensaje = `${cliente.nombre} ${cliente.apellido} fue eliminado correctamente.`;
        if (totalMascotas > 0) {
          mensaje += ` Se eliminaron ${totalMascotas} mascota(s) y sus tratamientos.`;
        }
        this.mensaje = mensaje;
        this.error = '';
        this.cargarClientes();
      },
      error: () => {
        this.error = 'No se pudo eliminar el cliente.';
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Mascota {
  id: number;
  nombre: string;
}

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mascotas?: Mascota[];
}

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

  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'Martínez',
      correo: 'ana.martinez@email.com',
      celular: '3101234567',
      mascotas: [
        { id: 1, nombre: 'Luna' },
        { id: 2, nombre: 'Tom' },
      ],
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Ruiz',
      correo: 'carlos.ruiz@email.com',
      celular: '3209876543',
      mascotas: [{ id: 3, nombre: 'Milo' }],
    },
    {
      id: 3,
      nombre: 'Diana',
      apellido: 'Gómez',
      correo: 'diana.gomez@email.com',
      celular: '3001122334',
    },
  ];

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
    this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
    this.mensaje = `${cliente.nombre} ${cliente.apellido} fue eliminado correctamente.`;
    this.error = '';
  }
}
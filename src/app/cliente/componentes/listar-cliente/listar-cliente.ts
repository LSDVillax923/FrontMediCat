import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteRestService } from '../../services/cliente-rest.service';
import { Cliente } from '../../../shared/api/backend-contracts';
import { nombreCompletoCliente } from '../../../shared/api/model-mappers';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-cliente.html',
  styleUrls: ['./listar-cliente.css']
})
export class ListarClienteComponent implements OnInit {
  
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  loading = false;
  error: string | null = null;
  filtro: string = '';

  constructor(private clienteService: ClienteRestService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.loading = true;
    this.clienteService.findAll().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.aplicarFiltro();
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Error al cargar los clientes';
        console.error(err);
        this.loading = false;
      }
    });
  }

  aplicarFiltro(): void {
    if (!this.filtro) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }

    const filtroLower = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(filtroLower) ||
      cliente.apellido.toLowerCase().includes(filtroLower) ||
      cliente.correo.toLowerCase().includes(filtroLower) ||
      cliente.celular.includes(filtro)
    );
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => this.cargarClientes(),
        error: (err: Error) => {
          alert('Error al eliminar el cliente');
          console.error(err);
        }
      });
    }
  }

  nombreCompleto(cliente: Cliente): string {
    return nombreCompletoCliente(cliente);
  }
}
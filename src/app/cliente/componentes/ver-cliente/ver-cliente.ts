import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../cliente';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-ver-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './ver-cliente.html',
  styleUrl: './ver-cliente.css',
})
export class VerCliente {
  cliente: Cliente | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clienteService: ClienteService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cliente = this.clienteService.getById(id);
  }

  get totalMascotas(): number {
    return this.cliente?.mascotas?.length ?? 0;
  }
}
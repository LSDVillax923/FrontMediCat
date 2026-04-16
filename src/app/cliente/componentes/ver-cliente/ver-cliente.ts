import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from '../../../shared/api/backend-contracts';
import { ClienteRestService } from '../../services/cliente.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-ver-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './ver-cliente.html',
  styleUrl: './ver-cliente.css',
})
export class VerCliente implements OnInit {
  cliente: Cliente | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clienteRestService: ClienteRestService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteRestService.findById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
      },
      error: () => {
        this.cliente = null;
      },
    });
  }

  get totalMascotas(): number {
    return this.cliente?.mascotas?.length ?? 0;
  }
}

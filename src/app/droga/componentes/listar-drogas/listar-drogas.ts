import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';
import { AuthService } from '../../../user/services/auth.service';
import { Droga } from '../../droga';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listar-drogas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-drogas.html',
  styleUrl: './listar-drogas.css',
})
export class ListarDrogas {
  busqueda = '';
  mensaje = '';
  error = '';

  constructor(
    private readonly drogaService: DrogaService,
    private readonly authService: AuthService,
  ) {}

  get esAdmin(): boolean {
    return this.authService.getSesion()?.rol === 'admin';
  }

  get puedeEditar(): boolean {
    const rol = this.authService.getSesion()?.rol;
    return rol === 'admin' || rol === 'veterinario';
  }

  get drogasFiltradas(): Droga[] {
    return this.drogaService.search(this.busqueda);
  }

  stockClase(stock: number): string {
    if (stock === 0) return 'badge-danger';
    if (stock <= 5) return 'badge-warning';
    return 'badge-activo';
  }

  eliminarDroga(droga: Droga): void {
    if (!confirm(`¿Eliminar ${droga.nombre} del inventario?`)) return;
    const ok = this.drogaService.delete(droga.id);
    if (ok) {
      this.mensaje = `${droga.nombre} fue eliminado del inventario.`;
      this.error = '';
    } else {
      this.error = 'No se pudo eliminar el medicamento.';
    }
  }
}
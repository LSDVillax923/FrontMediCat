import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { AuthService } from '../../../user/services/auth.service';
import { Tratamiento } from '../../tratamiento';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listar-tratamientos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-tratamientos.html',
  styleUrl: './listar-tratamientos.css',
})
export class ListarTratamientos {
  busqueda = '';
  filtroEstado = '';
  mensaje = '';
  error = '';

  private todos: Tratamiento[] = [];

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
  ) {
    const sesion = this.authService.getSesion();

    if (sesion?.rol === 'cliente') {
      this.todos = this.tratamientoService.getByClienteId(sesion.id);
    } else if (sesion?.rol === 'veterinario') {
      // El veterinario ve todos, ya que atiende a distintos clientes
      this.todos = this.tratamientoService.getAll();
    } else {
      this.todos = this.tratamientoService.getAll();
    }

    // Soporte para ?mascota=id en URL (desde mis-mascotas)
    const mascotaId = this.route.snapshot.queryParamMap.get('mascota');
    if (mascotaId) {
      this.todos = this.todos.filter((t) => t.mascotaId === Number(mascotaId));
    }
  }

  get sesion() {
    return this.authService.getSesion();
  }

  get esCliente(): boolean {
    return this.sesion?.rol === 'cliente';
  }

  get puedeEditar(): boolean {
    const rol = this.sesion?.rol;
    return rol === 'veterinario' || rol === 'admin';
  }

  get puedeCrear(): boolean {
    return this.puedeEditar;
  }

  get tratamientosFiltrados(): Tratamiento[] {
    let lista = this.tratamientoService.search(this.busqueda);

    // Mantener el subset correcto según rol / filtro de mascota
    const ids = new Set(this.todos.map((t) => t.id));
    lista = lista.filter((t) => ids.has(t.id));

    if (this.filtroEstado) {
      lista = lista.filter((t) => t.estado === this.filtroEstado);
    }

    return lista;
  }

  estadoClase(estado: string): string {
    const map: Record<string, string> = {
      Activo:     'badge-activo',
      Completado: 'badge-activo',
      Pendiente:  'badge-warning',
      Cancelado:  'badge-danger',
    };
    return map[estado] ?? '';
  }
}
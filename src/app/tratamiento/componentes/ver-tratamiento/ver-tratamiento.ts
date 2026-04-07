import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { AuthService } from '../../../user/services/auth.service';
import { Tratamiento } from '../../tratamiento';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-ver-tratamiento',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './ver-tratamiento.html',
  styleUrl: './ver-tratamiento.css',
})
export class VerTratamiento {
  tratamiento: Tratamiento | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tratamientoService: TratamientoService,
    private readonly authService: AuthService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tratamiento = this.tratamientoService.getById(id);
  }

  get puedeEditar(): boolean {
    const rol = this.authService.getSesion()?.rol;
    return rol === 'veterinario' || rol === 'admin';
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
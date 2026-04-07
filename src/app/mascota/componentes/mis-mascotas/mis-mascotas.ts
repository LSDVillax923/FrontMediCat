import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../user/services/auth.service';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../mascota';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './mis-mascotas.html',
  styleUrl: './mis-mascotas.css',
})
export class MisMascotas {
  mascotas: Mascota[] = [];

  readonly navBotones = [
    { label: '+ Nueva Mascota', ruta: '/mascotas/nueva', tipo: 'primary' as const },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly mascotaService: MascotaService,
  ) {
    const sesion = this.authService.getSesion();
    if (sesion) {
      this.mascotas = this.mascotaService.getByClienteId(sesion.id);
    }
  }

  get totalPerros(): number {
    return this.mascotas.filter((m) => m.especie.toLowerCase() === 'canino').length;
  }

  get totalGatos(): number {
    return this.mascotas.filter((m) => m.especie.toLowerCase() === 'felino').length;
  }

  estadoBadge(estado: string): string {
    const map: Record<string, string> = {
      activa:      'badge-verde',
      tratamiento: 'badge-amarillo',
      inactiva:    'badge-rojo',
    };
    return map[estado] ?? '';
  }

  especieBadge(especie: string): string {
    const e = especie.toLowerCase();
    if (e === 'canino') return 'badge-especie--perro';
    if (e === 'felino') return 'badge-especie--gato';
    return 'badge-especie--otro';
  }

  especieLabel(especie: string): string {
    const e = especie.toLowerCase();
    if (e === 'canino') return 'Perro';
    if (e === 'felino') return 'Gato';
    return especie;
  }
}
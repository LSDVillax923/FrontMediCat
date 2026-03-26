import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Mascota } from '../../models/mascota.model';
import { MascotaService } from '../../services/mascota.service';


@Component({
  selector: 'app-listar-mascotas',

  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-mascotas.html',
  styleUrl: './listar-mascotas.css',
})

export class ListarMascotas {
  busqueda = '';
  estadoSeleccionado = '';
  mensaje = '';
  error = '';
  clienteId: number | null = null;

  mascotas: Mascota[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mascotaService: MascotaService,
  ) {
    this.mascotas = this.mascotaService.listar();
    mascotas: Mascota[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mascotaService: MascotaService,
  ) {
    this.mascotas = this.mascotaService.listar();
      this.mascotaService.desactivar(mascota.id);
    this.mascotas = this.mascotaService.listar();
    this.mensaje = `${mascota.nombre} fue desactivada correctamente.`;
    this.error = '';
  }
}
} 
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  private readonly route = inject(ActivatedRoute);
  private readonly mascotaService = inject(MascotaService);

  constructor() {
    this.clienteId = Number(this.route.snapshot.queryParamMap.get('clienteId')) || null;
    this.mascotas = this.mascotaService.listar();
  }
    get mascotasFiltradas(): Mascota[] {
    const texto = this.busqueda.trim().toLowerCase();

    return this.mascotas.filter((mascota) => {
      const coincideCliente = this.clienteId ? mascota.cliente?.id === this.clienteId : true;
      const coincideEstado = this.estadoSeleccionado
        ? mascota.estado === this.estadoSeleccionado
        : true;
      const coincideBusqueda = texto
        ? [
            mascota.nombre,
            mascota.especie,
            mascota.raza,
            mascota.cliente?.nombre,
            mascota.cliente?.apellido,
          ]
            .filter(Boolean)
            .some((valor) => valor!.toLowerCase().includes(texto))
        : true;

      return coincideCliente && coincideEstado && coincideBusqueda;
    });
  }

  get totalMascotas(): number {
    return this.mascotasFiltradas.length;
  }

  get saludables(): number {
    return this.mascotasFiltradas.filter((mascota) => mascota.estado === 'activa').length;
  }

  get tratamiento(): number {
    return this.mascotasFiltradas.filter((mascota) => mascota.estado === 'tratamiento').length;
  }

  get inactivas(): number {
    return this.mascotasFiltradas.filter((mascota) => mascota.estado === 'inactiva').length;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.estadoSeleccionado = '';
    this.mensaje = '';
    this.error = '';
  }

  desactivarMascota(mascota: Mascota): void {
    if (mascota.estado === 'inactiva') {
      this.error = `${mascota.nombre} ya está inactiva.`;
      this.mensaje = '';
      return;
    }

    this.mascotaService.desactivar(mascota.id);
    this.mascotas = this.mascotaService.listar();
    this.mensaje = `${mascota.nombre} fue desactivada correctamente.`;
    this.error = '';
  }
}
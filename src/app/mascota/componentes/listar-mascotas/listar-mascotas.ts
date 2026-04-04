import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../mascota';

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

  constructor(
    private readonly mascotaService: MascotaService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => {
      const routeClienteId = params.get('id');
      this.clienteId = routeClienteId ? Number(routeClienteId) : null;
    });
  }

  get mascotasFiltradas(): Mascota[] {
    const filtro = this.busqueda.trim().toLowerCase();

    return this.mascotaService.getAll().filter((mascota) => {
      const coincideCliente = !this.clienteId || mascota.cliente?.id === this.clienteId;
      const coincideTexto =
        !filtro ||
        mascota.nombre.toLowerCase().includes(filtro) ||
        mascota.raza.toLowerCase().includes(filtro) ||
        `${mascota.cliente?.nombre ?? ''} ${mascota.cliente?.apellido ?? ''}`
          .toLowerCase()
          .includes(filtro);
      const coincideEstado =
        !this.estadoSeleccionado || mascota.estado === this.estadoSeleccionado;

      return coincideCliente && coincideTexto && coincideEstado;
    });
  }

  get totalMascotas(): number {
    return this.mascotasFiltradas.length;
  }

  get saludables(): number {
    return this.mascotasFiltradas.filter((m) => m.estado === 'activa').length;
  }

  get tratamiento(): number {
    return this.mascotasFiltradas.filter((m) => m.estado === 'tratamiento').length;
  }

  get inactivas(): number {
    return this.mascotasFiltradas.filter((m) => m.estado === 'inactiva').length;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.estadoSeleccionado = '';
  }

  desactivarMascota(mascota: Mascota): void {
    this.mascotaService.desactivar(mascota.id);
    this.mensaje = `${mascota.nombre} fue desactivada correctamente.`;
    this.error = '';
  }
}
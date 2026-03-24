import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

type EstadoMascota = 'activa' | 'tratamiento' | 'inactiva';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
}

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: EstadoMascota;
  cliente?: Cliente;
}

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

  mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Luna',
      especie: 'Canino',
      raza: 'Labrador',
      edad: 5,
      peso: 20.3,
      estado: 'activa',
      cliente: { id: 1, nombre: 'María', apellido: 'Gómez' },
    },
    {
      id: 2,
      nombre: 'Milo',
      especie: 'Felino',
      raza: 'Siamés',
      edad: 3,
      peso: 4.2,
      estado: 'tratamiento',
      cliente: { id: 2, nombre: 'Carlos', apellido: 'Ramos' },
    },
    {
      id: 3,
      nombre: 'Rocky',
      especie: 'Canino',
      raza: 'Bulldog',
      edad: 8,
      peso: 17.8,
      estado: 'inactiva',
      cliente: { id: 1, nombre: 'María', apellido: 'Gómez' },
    },
  ];

   constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const routeClienteId = params.get('id');
      this.clienteId = routeClienteId ? Number(routeClienteId) : null;
    });
  }

  get mascotasFiltradas(): Mascota[] {
    const filtro = this.busqueda.trim().toLowerCase();

    return this.mascotas.filter((mascota) => {
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
    mascota.estado = 'inactiva';
    this.mensaje = `${mascota.nombre} fue desactivada correctamente.`;
    this.error = '';
  }
}

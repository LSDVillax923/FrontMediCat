import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { AuthService } from '../../../user/services/auth.service';
import { Mascota } from '../../mascota';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listar-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-mascotas.html',
  styleUrl: './listar-mascotas.css',
})
export class ListarMascotas {
  busqueda = '';
  estadoSeleccionado = '';
  mensaje = '';
  error = '';
  clienteId: number | null = null;
  esCliente = false;
  private todasMascotas: Mascota[] = [];

  constructor(
    private readonly mascotaService: MascotaService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
  ) {
    const sesion = this.authService.getSesion();
    this.todasMascotas = this.mascotaService.getAll();

    if (sesion?.rol === 'cliente') {
      this.clienteId = sesion.id;
      this.esCliente = true;
    } else {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.clienteId = id ? Number(id) : null;
      });
    }
  }

  get mascotasFiltradas(): Mascota[] {
    const filtroTexto = this.busqueda.trim().toLowerCase();
    
    return this.todasMascotas.filter((mascota) => {
      const coincideCliente = !this.clienteId || mascota.clienteId === this.clienteId;
      
      const coincideTexto = !filtroTexto ||
        mascota.nombre.toLowerCase().includes(filtroTexto) ||
        mascota.raza.toLowerCase().includes(filtroTexto) ||
        mascota.especie.toLowerCase().includes(filtroTexto) ||
        (mascota.propietario?.toLowerCase().includes(filtroTexto) ?? false);
      
      const coincideEstado = !this.estadoSeleccionado || mascota.estado === this.estadoSeleccionado;
      
      return coincideCliente && coincideTexto && coincideEstado;
    });
  }

  get totalMascotas(): number { 
    return this.mascotasFiltradas.length; 
  }

  get saludables(): number { 
    return this.mascotasFiltradas.filter((m) => m.estado === 'Activa').length; 
  }

  get tratamiento(): number { 
    return this.mascotasFiltradas.filter((m) => m.estado === 'Tratamiento').length; 
  }

  get inactivas(): number { 
    return this.mascotasFiltradas.filter((m) => m.estado === 'Inactiva').length; 
  }

  // Alias para mantener compatibilidad con el HTML
  get enTratamiento(): number {
    return this.tratamiento;
  }

  get filtroNombre(): string {
    return this.busqueda;
  }

  set filtroNombre(value: string) {
    this.busqueda = value;
  }

  aplicarFiltros(): void {
    // Los filtros ya se aplican en el getter
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.estadoSeleccionado = '';
  }

  desactivarMascota(mascota: Mascota): void {
    if (!confirm(`¿Desactivar a ${mascota.nombre}? Esto la marcará como Inactiva.`)) return;
    
    this.mascotaService.desactivar(mascota.id);
    this.mensaje = `${mascota.nombre} fue desactivada correctamente.`;
    this.error = '';
    
    // Actualizar la lista local
    this.todasMascotas = this.mascotaService.getAll();
  }

  // Alias para compatibilidad
  borrarMascota(mascota: Mascota): void {
    this.desactivarMascota(mascota);
  }
}
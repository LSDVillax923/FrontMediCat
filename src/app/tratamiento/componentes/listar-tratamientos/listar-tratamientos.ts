import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../user/services/auth.service';
import { Tratamiento } from '../../tratamiento';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { TratamientoRestService } from '../../services/tratamiento-rest.service';
import { TratamientoMapper } from '../../../shared/api/model-mappers';

@Component({
  selector: 'app-listar-tratamientos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-tratamientos.html',
  styleUrl: './listar-tratamientos.css',
})
export class ListarTratamientos implements OnInit {
  busqueda = '';
  filtroEstado = '';
  mensaje = '';
  error = '';
  cargando = false;

  private todos: Tratamiento[] = [];

  constructor(
    private readonly tratamientoRestService: TratamientoRestService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.cargarTratamientos();
  }

  private cargarTratamientos(): void {
    this.cargando = true;
    this.error = '';

    this.tratamientoRestService.getAll().subscribe({
      next: (tratamientosDto) => {
        const sesion = this.authService.getSesion();
        let tratamientos = tratamientosDto.map(TratamientoMapper.fromDto);

        if (sesion?.rol === 'cliente') {
          tratamientos = tratamientos.filter((t) => t.clienteId === sesion.id);
        }

        const mascotaId = this.route.snapshot.queryParamMap.get('mascota');
        if (mascotaId) {
          tratamientos = tratamientos.filter((t) => t.mascotaId === Number(mascotaId));
        }

        this.todos = tratamientos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los tratamientos desde el servidor.';
        this.todos = [];
        this.cargando = false;
      },
    });
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
    let lista = this.todos;

    const filtro = this.busqueda.trim().toLowerCase();
    if (filtro) {
      lista = lista.filter(
        (t) =>
          t.mascota.toLowerCase().includes(filtro) ||
          t.veterinario.toLowerCase().includes(filtro) ||
          t.diagnostico.toLowerCase().includes(filtro),
      );
    }

    if (this.filtroEstado) {
      lista = lista.filter((t) => t.estado === this.filtroEstado);
    }

    return lista;
  }

  estadoClase(estado: string): string {
    const map: Record<string, string> = {
      Activo: 'badge-activo',
      Completado: 'badge-activo',
      Pendiente: 'badge-warning',
      Cancelado: 'badge-danger',
    };
    return map[estado] ?? '';
  }
}

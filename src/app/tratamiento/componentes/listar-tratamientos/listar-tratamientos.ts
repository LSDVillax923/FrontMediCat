import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { Tratamiento } from '../../tratamiento';

@Component({
  selector: 'app-listar-tratamientos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-tratamientos.html',
  styleUrl: './listar-tratamientos.css',
})
export class ListarTratamientos {
  busqueda = '';
  mensaje = '';

  constructor(private readonly tratamientoService: TratamientoService) {}

  get tratamientosFiltrados(): Tratamiento[] {
    const filtro = this.busqueda.trim().toLowerCase();
    return this.tratamientoService.getAll().filter(
      (t) =>
        !filtro ||
        t.mascota.nombre.toLowerCase().includes(filtro) ||
        t.veterinario.nombre.toLowerCase().includes(filtro) ||
        t.descripcion.toLowerCase().includes(filtro),
    );
  }

  get totalTratamientos(): number {
    return this.tratamientosFiltrados.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  eliminarTratamiento(t: Tratamiento): void {
    this.tratamientoService.delete(t.id);
    this.mensaje = `Tratamiento #${t.id} eliminado correctamente.`;
  }
}
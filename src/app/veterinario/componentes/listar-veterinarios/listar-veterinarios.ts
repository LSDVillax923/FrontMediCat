import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../veterinario';

@Component({
  selector: 'app-listar-veterinarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-veterinarios.html',
  styleUrl: './listar-veterinarios.css',
})
export class ListarVeterinarios {
  busqueda = '';
  mensaje = '';
  error = '';

  constructor(private readonly veterinarioService: VeterinarioService) {}

  get veterinariosFiltrados(): Veterinario[] {
    const filtro = this.busqueda.trim().toLowerCase();
    return this.veterinarioService.getAll().filter(
      (v) =>
        !filtro ||
        v.nombre.toLowerCase().includes(filtro) ||
        v.especialidad.toLowerCase().includes(filtro) ||
        v.cedula.toLowerCase().includes(filtro),
    );
  }

  get totalVeterinarios(): number {
    return this.veterinariosFiltrados.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  eliminarVeterinario(vet: Veterinario): void {
    this.veterinarioService.delete(vet.id);
    this.mensaje = `${vet.nombre} fue eliminado correctamente.`;
    this.error = '';
  }
}
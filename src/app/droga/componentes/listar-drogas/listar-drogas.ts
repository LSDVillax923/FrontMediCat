import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';
import { Droga } from '../../droga';

@Component({
  selector: 'app-listar-drogas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-drogas.html',
  styleUrl: './listar-drogas.css',
})
export class ListarDrogas {
  busqueda = '';
  mensaje = '';
  error = '';

  constructor(private readonly drogaService: DrogaService) {}

  get drogasFiltradas(): Droga[] {
    const filtro = this.busqueda.trim().toLowerCase();
    return this.drogaService
      .getAll()
      .filter((d) => !filtro || d.nombre.toLowerCase().includes(filtro));
  }

  get totalDrogas(): number {
    return this.drogasFiltradas.length;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  eliminarDroga(droga: Droga): void {
    this.drogaService.delete(droga.id);
    this.mensaje = `"${droga.nombre}" fue eliminado del inventario.`;
    this.error = '';
  }
}
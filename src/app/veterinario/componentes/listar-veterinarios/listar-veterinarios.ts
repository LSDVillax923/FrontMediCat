import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../veterinario';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listar-veterinarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './listar-veterinarios.html',
  styleUrl: './listar-veterinarios.css',
})
export class ListarVeterinarios {
  busqueda = '';
  mensaje = '';
  error = '';

  constructor(private readonly veterinarioService: VeterinarioService) {}

  get veterinariosFiltrados(): Veterinario[] {
    return this.veterinarioService.search(this.busqueda);
  }

  eliminarVeterinario(vet: Veterinario): void {
    if (!confirm(`¿Eliminar a ${vet.nombre} ${vet.apellido}?`)) return;
    const ok = this.veterinarioService.delete(vet.id);
    if (ok) {
      this.mensaje = `${vet.nombre} ${vet.apellido} fue eliminado correctamente.`;
      this.error = '';
    } else {
      this.error = 'No se pudo eliminar el veterinario.';
    }
  }
}
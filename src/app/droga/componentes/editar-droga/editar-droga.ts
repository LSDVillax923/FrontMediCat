import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';
import { AuthService } from '../../../user/services/auth.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

interface DrogaEditable {
  id: number;
  nombre: string;
  descripcion: string;
  unidad: string;
  stock: number;
  dosis: string;
}

@Component({
  selector: 'app-editar-droga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './editar-droga.html',
  styleUrl: './editar-droga.css',
})
export class EditarDroga {
  formData: DrogaEditable = { id: 0, nombre: '', descripcion: '', unidad: '', stock: 0, dosis: '' };
  mensaje = '';
  error = '';
  noEncontrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly drogaService: DrogaService,
    private readonly authService: AuthService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const droga = this.drogaService.getById(id);
    if (droga) {
      this.formData = {
        id: droga.id,
        nombre: droga.nombre,
        descripcion: droga.descripcion ?? '',
        unidad: droga.unidad ?? '',
        stock: droga.stock ?? 0,
        dosis: droga.dosis ?? '',
      };
    } else {
      this.noEncontrado = true;
      this.error = 'No se encontró el medicamento solicitado.';
    }
  }

  get esAdmin(): boolean {
    return this.authService.getSesion()?.rol === 'admin';
  }

  guardarCambios(): void {
    const { id, nombre, descripcion, unidad, stock, dosis } = this.formData;
    if (!nombre) {
      this.error = 'El nombre del medicamento es obligatorio.';
      return;
    }

    const cambios: Partial<DrogaEditable> = { nombre, descripcion, unidad, stock };

    // Admin no puede modificar la dosis
    if (!this.esAdmin) {
      cambios['dosis'] = dosis;
    }

    this.drogaService.update(id, cambios);
    this.mensaje = `${nombre} fue actualizado correctamente.`;
    this.error = '';
  }
}
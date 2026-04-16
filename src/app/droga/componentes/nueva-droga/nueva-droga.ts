import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrogaCreateDto } from '../../../shared/api/backend-contracts.ts';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { DrogaRestService } from '../../services/droga-rest.service';

interface NuevaDrogaForm {
  nombre: string;
  descripcion: string;
  unidad: string;
  stock: number;
  dosis: string;
}

@Component({
  selector: 'app-nueva-droga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './nueva-droga.html',
  styleUrl: './nueva-droga.css',
})
export class NuevaDroga {
  mensaje = '';
  error = '';

  formData: NuevaDrogaForm = {
    nombre: '',
    descripcion: '',
    unidad: '',
    stock: 0,
    dosis: '',
  };

constructor(private readonly drogaRestService: DrogaRestService) {}

  guardarDroga(): void {
    const { nombre, descripcion, unidad, stock, dosis } = this.formData;

    if (!nombre) {
      this.error = 'El nombre del medicamento es obligatorio.';
      return;
    }

    const payload: DrogaCreateDto = { nombre, descripcion, unidad, stock, dosis };
    this.drogaRestService.create(payload).subscribe({
      next: () => {
        this.mensaje = `${nombre} fue agregado al inventario.`;
        this.error = '';
        this.formData = { nombre: '', descripcion: '', unidad: '', stock: 0, dosis: '' };
      },
      error: () => {
        this.error = 'No se pudo agregar el medicamento.';
      },
    });
}
}
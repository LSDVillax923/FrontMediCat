import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

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

  constructor(private readonly drogaService: DrogaService) {}

  guardarDroga(): void {
    const { nombre, descripcion, unidad, stock, dosis } = this.formData;

    if (!nombre) {
      this.error = 'El nombre del medicamento es obligatorio.';
      return;
    }

    this.drogaService.add({ nombre, descripcion, unidad, stock, dosis });
    this.mensaje = `${nombre} fue agregado al inventario.`;
    this.error = '';
    this.formData = { nombre: '', descripcion: '', unidad: '', stock: 0, dosis: '' };
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';

interface DrogaForm {
  nombre: string;
  precioCompra: number | null;
  precioVenta: number | null;
  unidadesDisponibles: number | null;
  unidadesVendidas: number | null;
}

@Component({
  selector: 'app-nueva-droga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nueva-droga.html',
  styleUrl: './nueva-droga.css',
})
export class NuevaDroga {
  mensaje = '';
  error = '';

  formData: DrogaForm = this.crearFormulario();

  constructor(private readonly drogaService: DrogaService) {}

  guardarDroga(): void {
    const { nombre, precioCompra, precioVenta, unidadesDisponibles, unidadesVendidas } =
      this.formData;

    if (!nombre || precioCompra == null || precioVenta == null || unidadesDisponibles == null) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (precioVenta < precioCompra) {
      this.error = 'El precio de venta no puede ser menor al de compra.';
      return;
    }

    this.drogaService.add({
      nombre,
      precioCompra,
      precioVenta,
      unidadesDisponibles,
      unidadesVendidas: unidadesVendidas ?? 0,
    });

    this.mensaje = `"${nombre}" fue agregado al inventario correctamente.`;
    this.error = '';
    this.formData = this.crearFormulario();
  }

  private crearFormulario(): DrogaForm {
    return {
      nombre: '',
      precioCompra: null,
      precioVenta: null,
      unidadesDisponibles: null,
      unidadesVendidas: 0,
    };
  }
}
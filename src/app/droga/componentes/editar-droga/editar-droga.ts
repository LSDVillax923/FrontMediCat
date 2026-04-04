import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DrogaService } from '../../services/droga.service';
import { Droga } from '../../droga';

@Component({
  selector: 'app-editar-droga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-droga.html',
  styleUrl: './editar-droga.css',
})
export class EditarDroga {
  formData: Droga = {
    id: 0,
    nombre: '',
    precioCompra: 0,
    precioVenta: 0,
    unidadesDisponibles: 0,
    unidadesVendidas: 0,
  };

  mensaje = '';
  error = '';
  noEncontrada = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly drogaService: DrogaService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const droga = this.drogaService.getById(id);

    if (droga) {
      this.formData = { ...droga };
    } else {
      this.noEncontrada = true;
    }
  }

  guardarCambios(): void {
    if (this.formData.precioVenta < this.formData.precioCompra) {
      this.error = 'El precio de venta no puede ser menor al de compra.';
      return;
    }

    this.drogaService.update(this.formData.id, this.formData);
    this.mensaje = `"${this.formData.nombre}" fue actualizado correctamente.`;
    this.error = '';
  }

  cancelar(): void {
    this.router.navigate(['/drogas']);
  }
}
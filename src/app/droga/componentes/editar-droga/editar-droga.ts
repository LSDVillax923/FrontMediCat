import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DrogaUpdateDto } from '../../../shared/api/backend-contracts.ts';
import { DrogaMapper } from '../../../shared/api/model-mappers';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { AuthService } from '../../../user/services/auth.service';
import { DrogaRestService } from '../../services/droga-rest.service';

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

export class EditarDroga implements OnInit {
  formData: DrogaEditable = { id: 0, nombre: '', descripcion: '', unidad: '', stock: 0, dosis: '' };
  mensaje = '';
  error = '';
  noEncontrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly drogaRestService: DrogaRestService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.drogaRestService.getById(id).subscribe({
      next: (drogaDto) => {
        const droga = DrogaMapper.fromDto(drogaDto);
        this.formData = {
          id: droga.id,
          nombre: droga.nombre,
          descripcion: droga.descripcion ?? '',
          unidad: droga.unidad ?? '',
          stock: droga.stock ?? 0,
          dosis: droga.dosis ?? '',
        };
      },
      error: () => {
        this.noEncontrado = true;
        this.error = 'No se encontró el medicamento solicitado.';
      },
    });
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

    const cambios: DrogaUpdateDto = { nombre, descripcion, unidad, stock };

   
    if (!this.esAdmin) {
      cambios.dosis = dosis;
    }

   
    this.drogaRestService.update(id, cambios).subscribe({
      next: () => {
        this.mensaje = `${nombre} fue actualizado correctamente.`;
        this.error = '';
      },
      error: () => {
        this.error = 'No se pudo actualizar el medicamento.';
      },
    });
  }
}

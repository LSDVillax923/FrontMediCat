import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { MascotaService } from '../../../mascota/services/mascota.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { Mascota } from '../../../mascota/mascota';
import { Veterinario } from '../../../veterinario/veterinario';

interface TratamientoForm {
  id: number;
  descripcion: string;
  fecha: string;
  mascotaId: number | null;
  veterinarioId: number | null;
}

@Component({
  selector: 'app-editar-tratamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-tratamiento.html',
  styleUrl: './editar-tratamiento.css',
})
export class EditarTratamiento {
  formData: TratamientoForm = {
    id: 0,
    descripcion: '',
    fecha: '',
    mascotaId: null,
    veterinarioId: null,
  };

  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  mensaje = '';
  error = '';
  noEncontrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tratamientoService: TratamientoService,
    private readonly mascotaService: MascotaService,
    private readonly veterinarioService: VeterinarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const tratamiento = this.tratamientoService.getById(id);

    if (tratamiento) {
      this.formData = {
        id: tratamiento.id,
        descripcion: tratamiento.descripcion,
        fecha: tratamiento.fecha,
        mascotaId: tratamiento.mascota.id,
        veterinarioId: tratamiento.veterinario.id,
      };
    } else {
      this.noEncontrado = true;
    }

    this.mascotas = this.mascotaService.getAll();
    this.veterinarios = this.veterinarioService.getActivos();
  }

  guardarCambios(): void {
    const mascota = this.mascotaService.getById(this.formData.mascotaId!);
    const veterinario = this.veterinarioService.getById(this.formData.veterinarioId!);

    if (!mascota || !veterinario) {
      this.error = 'Selecciona una mascota y un veterinario válidos.';
      return;
    }

    this.tratamientoService.update(this.formData.id, {
      descripcion: this.formData.descripcion,
      fecha: this.formData.fecha,
      mascota,
      veterinario,
    });

    this.mensaje = `Tratamiento #${this.formData.id} actualizado correctamente.`;
    this.error = '';
  }

  cancelar(): void {
    this.router.navigate(['/tratamientos']);
  }
}
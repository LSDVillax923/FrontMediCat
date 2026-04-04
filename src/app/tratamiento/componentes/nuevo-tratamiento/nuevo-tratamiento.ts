import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { MascotaService } from '../../../mascota/services/mascota.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { Mascota } from '../../../mascota/mascota';
import { Veterinario } from '../../../veterinario/veterinario';

interface TratamientoForm {
  descripcion: string;
  fecha: string;
  mascotaId: number | null;
  veterinarioId: number | null;
}

@Component({
  selector: 'app-nuevo-tratamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-tratamiento.html',
  styleUrl: './nuevo-tratamiento.css',
})
export class NuevoTratamiento {
  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  mensaje = '';
  error = '';

  formData: TratamientoForm = this.crearFormulario();

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly mascotaService: MascotaService,
    private readonly veterinarioService: VeterinarioService,
  ) {
    this.mascotas = this.mascotaService.getAll();
    this.veterinarios = this.veterinarioService.getActivos();
  }

  guardarTratamiento(): void {
    const { descripcion, fecha, mascotaId, veterinarioId } = this.formData;

    const mascota = this.mascotaService.getById(mascotaId!);
    const veterinario = this.veterinarioService.getById(veterinarioId!);

    if (!mascota || !veterinario) {
      this.error = 'Selecciona una mascota y un veterinario válidos.';
      return;
    }

    this.tratamientoService.add({ descripcion, fecha, mascota, veterinario, drogas: [] });
    this.mensaje = `Tratamiento registrado para ${mascota.nombre} correctamente.`;
    this.error = '';
    this.formData = this.crearFormulario();
  }

  private crearFormulario(): TratamientoForm {
    return { descripcion: '', fecha: '', mascotaId: null, veterinarioId: null };
  }
}
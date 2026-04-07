import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { DrogaService } from '../../../droga/services/droga.service';
import { AuthService } from '../../../user/services/auth.service';
import { Tratamiento } from '../../tratamiento';
import { Veterinario } from '../../../veterinario/veterinario';
import { Droga } from '../../../droga/droga';
import { TratamientoDroga } from '../../../tratamiento-droga/tratamiento-droga';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-editar-tratamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './editar-tratamiento.html',
  styleUrl: './editar-tratamiento.css',
})
export class EditarTratamiento {
  formData: Tratamiento = {
    id: 0,
    mascotaId: 0,
    mascota: '',
    clienteId: 0,
    veterinarioId: 0,
    veterinario: '',
    diagnostico: '',
    observaciones: '',
    fecha: '',
    estado: 'Pendiente',
    drogas: [],
  };

  mensaje = '';
  error = '';
  noEncontrado = false;

  veterinarios: Veterinario[] = [];
  drogas: Droga[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tratamientoService: TratamientoService,
    private readonly veterinarioService: VeterinarioService,
    private readonly drogaService: DrogaService,
    private readonly authService: AuthService,
  ) {
    this.veterinarios = this.veterinarioService.getAll();
    this.drogas = this.drogaService.getAll();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const tratamiento = this.tratamientoService.getById(id);
    if (tratamiento) {
      this.formData = { ...tratamiento, drogas: tratamiento.drogas.map((d) => ({ ...d })) };
    } else {
      this.noEncontrado = true;
      this.error = 'No se encontró el tratamiento solicitado.';
    }
  }

  get esAdmin(): boolean {
    return this.authService.getSesion()?.rol === 'admin';
  }

  onVetChange(id: number): void {
    const vet = this.veterinarioService.getById(id);
    if (vet) {
      this.formData.veterinario = `${vet.nombre} ${vet.apellido}`;
    }
  }

  agregarDroga(): void {
  const nuevoId = Math.max(0, ...this.formData.drogas.map(d => d.id || 0)) + 1;
  this.formData.drogas.push({ 
    id: nuevoId,
    drogaId: 0, 
    nombreDroga: '', 
    dosis: '', 
    frecuencia: '', 
    duracion: '' 
  });
}

  onDrogaChange(index: number, id: number): void {
    const droga = this.drogaService.getById(id);
    if (droga) {
      this.formData.drogas[index].nombreDroga = droga.nombre;
      // Solo el veterinario puede cambiar la dosis; el admin conserva la existente
      if (!this.esAdmin) {
        this.formData.drogas[index].dosis = droga.dosis ?? '';
      }
    }
  }

  quitarDroga(index: number): void {
    this.formData.drogas.splice(index, 1);
  }

  guardarCambios(): void {
    const { id, veterinarioId, diagnostico, fecha, estado } = this.formData;

    if (!veterinarioId || !diagnostico || !fecha) {
      this.error = 'Veterinario, diagnóstico y fecha son obligatorios.';
      return;
    }

    const cambios: Partial<Tratamiento> = {
      veterinarioId: this.formData.veterinarioId,
      veterinario: this.formData.veterinario,
      diagnostico,
      observaciones: this.formData.observaciones,
      fecha,
      estado,
    };

    // Si es admin, conserva la dosis original en cada droga
    if (this.esAdmin) {
      const original = this.tratamientoService.getById(id);
      cambios['drogas'] = this.formData.drogas.map((d, i) => ({
        ...d,
        dosis: original?.drogas[i]?.dosis ?? d.dosis,
      }));
    } else {
      cambios['drogas'] = this.formData.drogas;
    }

    this.tratamientoService.update(id, cambios);
    this.mensaje = 'El tratamiento fue actualizado correctamente.';
    this.error = '';
  }
}

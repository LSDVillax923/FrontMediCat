import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { MascotaService } from '../../../mascota/services/mascota.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { DrogaService } from '../../../droga/services/droga.service';
import { Mascota } from '../../../mascota/mascota';
import { Veterinario } from '../../../veterinario/veterinario';
import { Droga } from '../../../droga/droga';
import { TratamientoDroga } from '../../../tratamiento-droga/tratamiento-droga';
import { Navbar } from '../../../shared/components/navbar/navbar';

interface NuevoTratamientoForm {
  mascotaId: number;
  mascota: string;
  clienteId: number;
  veterinarioId: number;
  veterinario: string;
  diagnostico: string;
  observaciones: string;
  fecha: string;
  estado: 'Activo' | 'Completado' | 'Pendiente' | 'Cancelado';
  drogas: TratamientoDroga[];
}

@Component({
  selector: 'app-nuevo-tratamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './nuevo-tratamiento.html',
  styleUrl: './nuevo-tratamiento.css',
})
export class NuevoTratamiento {
  mensaje = '';
  error = '';

  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  drogas: Droga[] = [];

  formData: NuevoTratamientoForm = {
    mascotaId: 0,
    mascota: '',
    clienteId: 0,
    veterinarioId: 0,
    veterinario: '',
    diagnostico: '',
    observaciones: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente',
    drogas: [],
  };

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly mascotaService: MascotaService,
    private readonly veterinarioService: VeterinarioService,
    private readonly drogaService: DrogaService,
  ) {
    this.mascotas = this.mascotaService.getAll();
    this.veterinarios = this.veterinarioService.getAll();
    this.drogas = this.drogaService.getAll();
  }

  onMascotaChange(id: number): void {
    const mascota = this.mascotaService.getById(id);
    if (mascota) {
      this.formData.mascota = mascota.nombre;
      this.formData.clienteId = mascota.clienteId;
    }
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
      this.formData.drogas[index].dosis = droga.dosis ?? '';
    }
  }

  quitarDroga(index: number): void {
    this.formData.drogas.splice(index, 1);
  }

  guardarTratamiento(): void {
    const { mascotaId, clienteId, veterinarioId, diagnostico, fecha, estado } = this.formData;

    if (!mascotaId || !veterinarioId || !diagnostico || !fecha) {
      this.error = 'Mascota, veterinario, diagnóstico y fecha son obligatorios.';
      return;
    }

    this.tratamientoService.add({
      ...this.formData,
    });

    this.mensaje = 'El tratamiento fue registrado correctamente.';
    this.error = '';
    this.formData = {
      mascotaId: 0,
      mascota: '',
      clienteId: 0,
      veterinarioId: 0,
      veterinario: '',
      diagnostico: '',
      observaciones: '',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      drogas: [],
    };
  }
}
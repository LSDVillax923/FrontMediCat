import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VeterinarioCreateDto } from '../../../shared/api/backend-contracts.ts';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { VeterinarioRestService } from '../../services/veterinario-rest.service';

interface NuevoVeterinarioForm {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia: string;
  especialidad: string;
  numeroLicencia: string;
}

@Component({
  selector: 'app-nuevo-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './nuevo-veterinario.html',
  styleUrl: './nuevo-veterinario.css',
})
export class NuevoVeterinario {
  mensaje = '';
  error = '';

  especialidades = [
    'Medicina General',
    'Cirugía',
    'Dermatología',
    'Cardiología',
    'Oncología',
    'Oftalmología',
    'Neurología',
    'Ortopedia',
    'Odontología',
    'Nutrición',
  ];

  formData: NuevoVeterinarioForm = {
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    contrasenia: '',
    especialidad: '',
    numeroLicencia: '',
  };

  constructor(private readonly veterinarioRestService: VeterinarioRestService) {}

  guardarVeterinario(): void {
    const { nombre, apellido, correo, celular, contrasenia, especialidad, numeroLicencia } = this.formData;

    if (!nombre || !apellido || !correo || !celular || !contrasenia || !especialidad || !numeroLicencia) {
      this.error = 'Todos los campos son obligatorios.';
      this.mensaje = '';
      return;
    }

    const payload: VeterinarioCreateDto = {
      nombre,
      apellido,
      correo,
      celular,
      contrasenia,
      especialidad,
      numeroLicencia,
    };

    this.veterinarioRestService.create(payload).subscribe({
      next: () => {
        this.mensaje = `${nombre} ${apellido} fue registrado correctamente.`;
        this.error = '';
        this.formData = {
          nombre: '',
          apellido: '',
          correo: '',
          celular: '',
          contrasenia: '',
          especialidad: '',
          numeroLicencia: '',
        };
      },
      error: () => {
        this.error = 'No se pudo registrar el veterinario.';
        this.mensaje = '';
      },
    });
  }
}
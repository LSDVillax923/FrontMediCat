import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';

interface VeterinarioForm {
  nombre: string;
  cedula: string;
  celular: string;
  correo: string;
  especialidad: string;
  contrasenia: string;
  estado: string;
}

@Component({
  selector: 'app-nuevo-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-veterinario.html',
  styleUrl: './nuevo-veterinario.css',
})
export class NuevoVeterinario {
  mensaje = '';
  error = '';

  readonly especialidades = [
    'Medicina Interna',
    'Cirugía',
    'Dermatología',
    'Odontología',
    'Oftalmología',
    'Traumatología',
    'Oncología',
    'Urgencias',
  ];

  formData: VeterinarioForm = this.crearFormulario();

  constructor(private readonly veterinarioService: VeterinarioService) {}

  guardarVeterinario(): void {
    const { nombre, cedula, celular, correo, especialidad, contrasenia, estado } = this.formData;

    if (!nombre || !cedula || !celular || !correo || !especialidad || !contrasenia) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.veterinarioService.add({
      nombre,
      cedula,
      celular,
      correo,
      especialidad,
      contrasenia,
      estado,
      imageURL: '',
      num_Atenciones: 0,
    });

    this.mensaje = `${nombre} fue registrado correctamente.`;
    this.error = '';
    this.formData = this.crearFormulario();
  }

  private crearFormulario(): VeterinarioForm {
    return {
      nombre: '',
      cedula: '',
      celular: '',
      correo: '',
      especialidad: '',
      contrasenia: '',
      estado: 'activo',
    };
  }
}
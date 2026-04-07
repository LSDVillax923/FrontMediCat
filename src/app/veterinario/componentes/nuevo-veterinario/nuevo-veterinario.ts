import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

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

  constructor(private readonly veterinarioService: VeterinarioService) {}

  guardarVeterinario(): void {
    const { nombre, apellido, correo, celular, contrasenia, especialidad, numeroLicencia } = this.formData;

    if (!nombre || !apellido || !correo || !celular || !contrasenia || !especialidad || !numeroLicencia) {
      this.error = 'Todos los campos son obligatorios.';
      this.mensaje = '';
      return;
    }

    this.veterinarioService.add({ nombre, apellido, correo, celular, contrasenia, especialidad, numeroLicencia });
    this.mensaje = `${nombre} ${apellido} fue registrado correctamente.`;
    this.error = '';
    this.formData = { nombre: '', apellido: '', correo: '', celular: '', contrasenia: '', especialidad: '', numeroLicencia: '' };
  }
}
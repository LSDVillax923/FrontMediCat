import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface NuevoClienteForm {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia: string;
}

@Component({
  selector: 'app-nuevo-cliente',

  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-cliente.html',
  styleUrl: './nuevo-cliente.css',
})

export class NuevoCliente {
  mensaje = '';
  error = '';

  formData: NuevoClienteForm = {
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    contrasenia: '',
  };

  guardarCliente(): void {
    const { nombre, apellido, correo, celular, contrasenia } = this.formData;

    if (!nombre || !apellido || !correo || !celular || !contrasenia) {
      this.error = 'Todos los campos son obligatorios.';
      this.mensaje = '';
      return;
    }

    this.mensaje = `${nombre} ${apellido} se registró correctamente.`;
    this.error = '';

    this.formData = {
      nombre: '',
      apellido: '',
      correo: '',
      celular: '',
      contrasenia: '',
    };
  }
}
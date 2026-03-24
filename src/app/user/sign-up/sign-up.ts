import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface RegistroForm {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia: string;
  confirmar: string;
  terminos: boolean;
}

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})

export class SignUp {
  form: RegistroForm = {
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    contrasenia: '',
    confirmar: '',
    terminos: false,
  };

  mensaje = '';
  error = '';

  constructor(private readonly router: Router) {}

  registrar(): void {
    this.mensaje = '';
    this.error = '';

    if (this.form.contrasenia !== this.form.confirmar) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.mensaje = 'Cuenta creada correctamente. Redirigiendo al listado de clientes...';

    setTimeout(() => {
      this.router.navigate(['/clientes']);
    }, 1000);
  }
}
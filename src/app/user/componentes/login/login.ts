import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRestService } from '../../../shared/auth/auth-rest.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  contrasenia = '';
  error = '';
  cargando = false;
  mostrarContrasenia = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
      private readonly authRestService: AuthRestService,
  ) {}

  iniciarSesion(): void {
    this.error = '';
    const correo = this.correo.trim().toLowerCase();
    const { contrasenia } = this;

    if (!correo || !contrasenia) {
      this.error = 'Ingresa tu correo y contraseña.';
      return;
    }

    this.cargando = true;

      this.authRestService.login({ correo, contrasenia }).subscribe({
      next: (sesion) => {
        this.authService.setSesion({
          id: sesion.id,
          nombre: sesion.nombre,
          correo: sesion.correo,
          rol: sesion.rol,
          token: sesion.token,
        });
               if (sesion.rol === 'admin') {
          this.router.navigate(['/dashboard']);
          return;
        }
        if (sesion.rol === 'veterinario') {
          this.router.navigate(['/mascotas']);
          return;
        }
        this.router.navigate(['/mis-mascotas']);
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos.';
        this.cargando = false;
      },
    });
  }
}
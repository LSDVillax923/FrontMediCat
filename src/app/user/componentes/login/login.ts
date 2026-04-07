import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../../admin/services/admin.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';

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
    private readonly adminService: AdminService,
    private readonly clienteService: ClienteService,
    private readonly veterinarioService: VeterinarioService,
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

    // 1. Verificar admin
    const admin = this.adminService.validarCredenciales(correo, contrasenia);
    if (admin) {
      this.authService.setSesion({
        id: admin.id,
        nombre: admin.nombre,
        correo: admin.correo,
        rol: 'admin',
      });
      this.router.navigate(['/dashboard']);
      return;
    }

    // 2. Verificar veterinario
    const vet = this.veterinarioService.validarCredenciales(correo, contrasenia);
    if (vet) {
      this.authService.setSesion({
        id: vet.id,
        nombre: `${vet.nombre} ${vet.apellido}`,
        correo: vet.correo,
        rol: 'veterinario',
      });
      this.router.navigate(['/mascotas']);
      return;
    }

    // 3. Verificar cliente
    const clientes = this.clienteService.getAll();
    const cliente = clientes.find(
      (c) => c.correo.toLowerCase() === correo && c.contrasenia === contrasenia,
    );
    if (cliente) {
      this.authService.setSesion({
        id: cliente.id,
        nombre: `${cliente.nombre} ${cliente.apellido}`,
        correo: cliente.correo,
        rol: 'cliente',
      });
      this.router.navigate(['/mis-mascotas']);
      return;
    }

    this.error = 'Correo o contraseña incorrectos.';
    this.cargando = false;
  }
}

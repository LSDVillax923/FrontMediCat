import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../../user/services/auth.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

interface ClienteEditable {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia: string;
}

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './editar-cliente.html',
  styleUrl: './editar-cliente.css',
})
export class EditarCliente {
  formData: ClienteEditable = { id: 0, nombre: '', apellido: '', correo: '', celular: '', contrasenia: '' };
  mensaje = '';
  error = '';
  noEncontrado = false;
  esPerfil = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly clienteService: ClienteService,
    private readonly authService: AuthService,
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    const sesion = this.authService.getSesion();
    const id = paramId ? Number(paramId) : sesion?.id ?? 0;
    this.esPerfil = !paramId;

    const cliente = this.clienteService.getById(id);
    if (cliente) {
      this.formData = {
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        celular: cliente.celular,
        contrasenia: '',
      };
    } else {
      this.noEncontrado = true;
      this.error = 'No se encontró el cliente solicitado.';
    }
  }

  guardarCambios(): void {
    const { id, nombre, apellido, correo, celular, contrasenia } = this.formData;
    if (!nombre || !apellido || !correo || !celular) {
      this.error = 'Los campos nombre, apellido, correo y celular son obligatorios.';
      return;
    }

    const cambios: Partial<{ nombre: string; apellido: string; correo: string; celular: string; contrasenia: string }> = {
      nombre,
      apellido,
      correo,
      celular,
    };

    if (contrasenia) {
      cambios['contrasenia'] = contrasenia;
    }

    this.clienteService.update(id, cambios);
    this.mensaje = `Los datos de ${nombre} ${apellido} fueron actualizados.`;
    this.error = '';
  }

  volver(): void {
    const sesion = this.authService.getSesion();
    if (sesion?.rol === 'admin') {
      this.router.navigate(this.esPerfil ? ['/dashboard'] : ['/clientes']);
    } else if (sesion?.rol === 'cliente') {
      this.router.navigate(['/mis-mascotas']);
    } else {
      this.router.navigate(['/inicio']);
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';


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

  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-cliente.html',
  styleUrl: './editar-cliente.css',
})

export class EditarCliente {
  clienteId = 0;
  mensaje = '';
  error = '';

  formData: ClienteEditable = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    contrasenia: '',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly clienteService: ClienteService,
  ) {
    this.cargarCliente();
  }

  private cargarCliente(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));

   const cliente = this.clienteService.getById(this.clienteId);

    if (!cliente) {
      this.error = 'No se encontró el cliente para editar.';
      return;
    }

    this.formData = {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      celular: cliente.celular,
      contrasenia: cliente.contrasenia ?? '',
    };
  }

  guardarCambios(): void {
    const { nombre, apellido, correo, celular, contrasenia } = this.formData;

    if (!nombre || !apellido || !correo || !celular || !contrasenia) {
      this.error = 'Todos los campos son obligatorios.';
      this.mensaje = '';
      return;
    }

    this.clienteService.update(this.clienteId, {
      nombre,
      apellido,
      correo,
      celular,
      contrasenia,
    });

    this.error = '';
    this.mensaje = `Se actualizó el cliente ${nombre} ${apellido}.`;
    this.router.navigate(['/clientes']);
  }

  volverAClientes(): void {
    this.router.navigate(['/clientes']);
  }
}
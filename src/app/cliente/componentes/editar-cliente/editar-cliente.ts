import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  private readonly clientesMock: ClienteEditable[] = [
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'Martínez',
      correo: 'ana.martinez@email.com',
      celular: '3101234567',
      contrasenia: '12345',
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Ruiz',
      correo: 'carlos.ruiz@email.com',
      celular: '3209876543',
      contrasenia: '12345',
    },
    {
      id: 3,
      nombre: 'Diana',
      apellido: 'Gómez',
      correo: 'diana.gomez@email.com',
      celular: '3001122334',
      contrasenia: '12345',
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.cargarCliente();
  }

  private cargarCliente(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));

    const cliente = this.clientesMock.find((item) => item.id === this.clienteId);

    if (!cliente) {
      this.error = 'No se encontró el cliente para editar.';
      return;
    }

    this.formData = { ...cliente };
  }

  guardarCambios(): void {
    const { nombre, apellido, correo, celular, contrasenia } = this.formData;

    if (!nombre || !apellido || !correo || !celular || !contrasenia) {
      this.error = 'Todos los campos son obligatorios.';
      this.mensaje = '';
      return;
    }

    this.error = '';
    this.mensaje = `Se actualizó el cliente ${nombre} ${apellido}.`;
  }

  volverAClientes(): void {
    this.router.navigate(['/clientes']);
  }
}
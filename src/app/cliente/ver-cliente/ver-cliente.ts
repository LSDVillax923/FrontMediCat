import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface MascotaDetalle {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  estado: string;
}

interface ClienteDetalle {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mascotas: MascotaDetalle[];
}

@Component({
  selector: 'app-ver-cliente',
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-cliente.html',
  styleUrl: './ver-cliente.css',
})

export class VerCliente {
  cliente: ClienteDetalle | null = null;

  private readonly clientesMock: ClienteDetalle[] = [
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'Martínez',
      correo: 'ana.martinez@email.com',
      celular: '3101234567',
      mascotas: [
        { id: 1, nombre: 'Luna', especie: 'Perro', raza: 'Labrador', estado: 'Sano' },
        { id: 2, nombre: 'Tom', especie: 'Gato', raza: 'Criollo', estado: 'En control' },
      ],
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Ruiz',
      correo: 'carlos.ruiz@email.com',
      celular: '3209876543',
      mascotas: [{ id: 3, nombre: 'Milo', especie: 'Perro', raza: 'Pug', estado: 'Recuperación' }],
    },
    {
      id: 3,
      nombre: 'Diana',
      apellido: 'Gómez',
      correo: 'diana.gomez@email.com',
      celular: '3001122334',
      mascotas: [],
    },
  ];

  constructor(private readonly route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cliente = this.clientesMock.find((cliente) => cliente.id === id) ?? null;
  }

  get totalMascotas(): number {
    return this.cliente?.mascotas.length ?? 0;
  }
}
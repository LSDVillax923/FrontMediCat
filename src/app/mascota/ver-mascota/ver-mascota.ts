import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface MascotaDetalle {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: string;
  enfermedad: string;
  observaciones: string;
  tratamiento?: string;
  veterinarioAsignado?: string;
  foto: string;
}

@Component({
  selector: 'app-ver-mascota',

  imports: [CommonModule, RouterLink],
  templateUrl: './ver-mascota.html',
  styleUrl: './ver-mascota.css',
})

export class VerMascota {
  clienteId: number | null = null;
  errorMascota = '';

  private readonly mascotas: MascotaDetalle[] = [
    {
      id: 1,
      nombre: 'Luna',
      especie: 'Canino',
      raza: 'Labrador',
      edad: 5,
      peso: 20.3,
      estado: 'Sano',
      enfermedad: 'Sin enfermedad',
      observaciones: 'Muy juguetona y amigable.',
      tratamiento: 'No registrado',
      veterinarioAsignado: 'Dr. Felipe Cárdenas',
      foto: 'dog1.jpg',
    },
    {
      id: 2,
      nombre: 'Milo',
      especie: 'Felino',
      raza: 'Siamés',
      edad: 3,
      peso: 4.2,
      estado: 'En tratamiento',
      enfermedad: 'Gastritis leve',
      observaciones: 'Debe mantener dieta blanda por 7 días.',
      tratamiento: 'Omeprazol veterinario',
      veterinarioAsignado: 'Dra. Laura Rojas',
      foto: 'cat1.jpg',
    },
    {
      id: 3,
      nombre: 'Rocky',
      especie: 'Canino',
      raza: 'Bulldog',
      edad: 8,
      peso: 17.8,
      estado: 'Control',
      enfermedad: 'Artritis',
      observaciones: 'Control mensual para seguimiento articular.',
      tratamiento: 'Suplemento articular',
      veterinarioAsignado: 'Dr. Daniel Ruiz',
      foto: 'dog2.jpg',
    },
  ];

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      const queryClienteId = params.get('clienteId');
      this.clienteId = queryClienteId ? Number(queryClienteId) : null;
    });
  }

  get mascota(): MascotaDetalle | null {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const encontrada = this.mascotas.find((item) => item.id === id) ?? null;

    if (!encontrada) {
      this.errorMascota = 'No se encontró la mascota solicitada.';
    }

    return encontrada;
  }

  get volverUrl(): string[] {
    if (this.clienteId) {
      return ['/clientes', this.clienteId.toString(), 'mismascotas'];
    }
    return ['/mascotas'];
  }

  get volverTexto(): string {
    return this.clienteId ? '← Mis Mascotas' : '← Volver al listado';
  }
}
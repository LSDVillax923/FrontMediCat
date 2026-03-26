import type { Cliente } from './cliente.model';
import type { Tratamiento } from '../tratamiento/tratamiento';

export type EstadoMascota = 'activa' | 'tratamiento' | 'inactiva';

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  foto?: string;
  estado: EstadoMascota;
  enfermedad?: string;
  observaciones?: string;
  tratamiento?: string;
  veterinarioAsignado?: string;
  cliente?: Cliente;
  tratamientos?: Tratamiento[];
}
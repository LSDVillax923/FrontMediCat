import { Cliente } from '../cliente/cliente';
import { Tratamiento } from '../tratamiento/tratamiento';

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fechaNacimiento: string;
  edad: number;
  peso: number;
  enfermedad?: string;
  observaciones?: string;
  foto?: string;
  veterinarioAsignado?: string;
  estado: 'Activa' | 'Tratamiento' | 'Inactiva';
  clienteId: number;
  cliente?: Cliente;
  propietario?: string;
}
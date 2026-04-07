import { Cliente } from '../cliente/cliente';
import { Tratamiento } from '../tratamiento/tratamiento';

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fechaNacimiento: string;

  // Campos clínicos
  edad: number;
  peso: number;
  enfermedad?: string;
  observaciones?: string;
  foto?: string;
  veterinarioAsignado?: string;

  // Estado funcional (¡CORREGIDO!)
  estado: 'Activa' | 'Tratamiento' | 'Inactiva';

  // Relaciones
  clienteId: number;
  propietario?: string;
}
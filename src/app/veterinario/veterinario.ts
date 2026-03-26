import { Tratamiento } from '../tratamiento/tratamiento';

export interface Veterinario {
  id: number;
  nombre: string;
  cedula: string;
  celular: string;
  correo: string;
  especialidad: string;
  contrasenia: string;
  imageURL: string;
  estado: string;
  num_Atenciones: number;

  // Relación
  tratamientos?: Tratamiento[];
}
import { Cliente } from '../cliente/cliente';
import { Tratamiento } from '../tratamiento/tratamiento';


export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  foto: string;
  estado: string;
  enfermedad: string;
  observaciones: string;
  tratamiento: string;
  veterinarioAsignado: string;

  cliente: Cliente;

  tratamientos?: Tratamiento[];

}
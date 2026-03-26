import type { Mascota } from './mascota.model';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia?: string;
  mascotas?: Mascota[];
}
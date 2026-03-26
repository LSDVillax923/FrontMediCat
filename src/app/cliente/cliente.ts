import {Mascota} from '../mascota/mascota';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  celular: string;
  mascotas: Mascota[];
}
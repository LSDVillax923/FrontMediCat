import { Tratamiento } from '../tratamiento/tratamiento';

export interface Veterinario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  celular: string;
  especialidad: string;
  numeroLicencia: string;
}

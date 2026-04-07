import { Tratamiento } from '../tratamiento/tratamiento';
import { Droga } from '../droga/droga';

export interface TratamientoDroga {
  id: number;
  drogaId: number;
  nombreDroga: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
}
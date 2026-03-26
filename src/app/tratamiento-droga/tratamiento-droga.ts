import { Tratamiento } from '../tratamiento/tratamiento';
import { Droga } from '../droga/droga';

export interface TratamientoDroga {
  id: number;

  // Relaciones
  tratamiento?: Tratamiento;
  droga: Droga;

  cantidad: number;
}
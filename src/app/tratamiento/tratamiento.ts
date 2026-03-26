import { Mascota } from '../mascota/mascota';
import { Veterinario } from '../veterinario/veterinario';
import { TratamientoDroga } from '../tratamiento-droga/tratamiento-droga';

export interface Tratamiento {
  id: number;
  descripcion: string;
  fecha: string;

  // Relaciones
  mascota: Mascota;
  veterinario: Veterinario;
  drogas: TratamientoDroga[];
}
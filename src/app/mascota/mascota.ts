export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fechaNacimiento: string;
  edad?: number;
  peso: number;
  enfermedad: string;
  observaciones: string;
  foto?: string;
  estado: 'Activa' | 'Tratamiento' | 'Inactiva';
  clienteId: number;
  propietario?: string;
  veterinarioAsignado?: string;
}

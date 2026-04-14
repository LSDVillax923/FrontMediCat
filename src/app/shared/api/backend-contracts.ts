import { Cliente } from '../../cliente/cliente';
import { Droga } from '../../droga/droga';
import { Mascota } from '../../mascota/mascota';
import { Tratamiento } from '../../tratamiento/tratamiento';
import { TratamientoDroga } from '../../tratamiento-droga/tratamiento-droga';
import { Veterinario } from '../../veterinario/veterinario';

export type EntityId = number;

export interface ClienteDto {
  id: EntityId;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  celular: string;
}

export type ClienteCreateDto = Omit<ClienteDto, 'id'>;
export type ClienteUpdateDto = Partial<ClienteCreateDto>;

export interface VeterinarioDto {
  id: EntityId;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  celular: string;
  especialidad: string;
  numeroLicencia: string;
}

export type VeterinarioCreateDto = Omit<VeterinarioDto, 'id'>;
export type VeterinarioUpdateDto = Partial<VeterinarioCreateDto>;

export interface MascotaDto {
  id: EntityId;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fechaNacimiento: string;
  edad: number;
  peso: number;
  enfermedad?: string;
  observaciones?: string;
  foto?: string;
  veterinarioAsignado?: string;
  estado: Mascota['estado'];
  clienteId: EntityId;
}

export type MascotaCreateDto = Omit<MascotaDto, 'id'>;
export type MascotaUpdateDto = Partial<MascotaCreateDto>;

export interface DrogaDto {
  id: EntityId;
  nombre: string;
  descripcion: string;
  unidad: string;
  stock: number;
  dosis: string;
}

export type DrogaCreateDto = Omit<DrogaDto, 'id'>;
export type DrogaUpdateDto = Partial<DrogaCreateDto>;

export interface TratamientoDrogaDto {
  id: EntityId;
  drogaId: EntityId;
  nombreDroga: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
}

export interface TratamientoDto {
  id: EntityId;
  mascotaId: EntityId;
  mascota: string;
  clienteId: EntityId;
  veterinarioId: EntityId;
  veterinario: string;
  diagnostico: string;
  observaciones: string;
  fecha: string;
  estado: Tratamiento['estado'];
  drogas: TratamientoDrogaDto[];
}

export type TratamientoCreateDto = Omit<TratamientoDto, 'id'>;
export type TratamientoUpdateDto = Partial<TratamientoCreateDto>;

export interface AuthLoginRequestDto {
  correo: string;
  contrasenia: string;
}

export interface AuthRegisterRequestDto {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  contrasenia: string;
}

export interface AuthLoginResponseDto {
  id: EntityId;
  nombre: string;
  correo: string;
  rol: 'admin' | 'cliente' | 'veterinario';
  token: string;
}

export type FrontModel =
  | Cliente
  | Veterinario
  | Mascota
  | Droga
  | Tratamiento
  | TratamientoDroga;


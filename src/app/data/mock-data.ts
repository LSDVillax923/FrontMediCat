import type { Cliente } from '../models/cliente.model';
import type { Mascota } from '../models/mascota.model';

export const MOCK_CLIENTES: Cliente[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Martínez',
    correo: 'ana.martinez@email.com',
    celular: '3101234567',
    mascotas: [
      { id: 1, nombre: 'Luna' } as Mascota,
      { id: 2, nombre: 'Tom' } as Mascota,
    ],
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Ruiz',
    correo: 'carlos.ruiz@email.com',
    celular: '3209876543',
    mascotas: [{ id: 3, nombre: 'Milo' } as Mascota],
  },
  {
    id: 3,
    nombre: 'Diana',
    apellido: 'Gómez',
    correo: 'diana.gomez@email.com',
    celular: '3001122334',
    mascotas: [],
  },
];

export const MOCK_MASCOTAS: Mascota[] = [
  {
    id: 1,
    nombre: 'Luna',
    especie: 'Canino',
    raza: 'Labrador',
    edad: 5,
    peso: 20.3,
    estado: 'activa',
    cliente: { id: 1, nombre: 'María', apellido: 'Gómez', correo: '', celular: '' },
  },
  {
    id: 2,
    nombre: 'Milo',
    especie: 'Felino',
    raza: 'Siamés',
    edad: 3,
    peso: 4.2,
    estado: 'tratamiento',
    cliente: { id: 2, nombre: 'Carlos', apellido: 'Ramos', correo: '', celular: '' },
  },
  {
    id: 3,
    nombre: 'Rocky',
    especie: 'Canino',
    raza: 'Bulldog',
    edad: 8,
    peso: 17.8,
    estado: 'inactiva',
    cliente: { id: 1, nombre: 'María', apellido: 'Gómez', correo: '', celular: '' },
  },
];
import { Cliente } from '../../cliente/cliente';
import { Mascota } from '../../mascota/mascota';
import { Veterinario } from '../../veterinario/veterinario';
import { Droga } from '../../droga/droga';
import { Tratamiento } from '../../tratamiento/tratamiento';
import { Admin } from '../../admin/admin';

// ADMINS
export const ADMINS_MOCK: Admin[] = [
  { id: 1, nombre: 'Super', apellido: 'Admin', correo: 'admin@medicat.com', contrasenia: 'admin123' },
];

// CLIENTES
export const CLIENTES_MOCK: Cliente[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Martínez',
    correo: 'ana.martinez@email.com',
    contrasenia: 'pass123',
    celular: '3101234567',
    mascotas: [],
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Ruiz',
    correo: 'carlos.ruiz@email.com',
    contrasenia: 'pass456',
    celular: '3209876543',
    mascotas: [],
  },
  {
    id: 3,
    nombre: 'Diana',
    apellido: 'Gómez',
    correo: 'diana.gomez@email.com',
    contrasenia: 'pass789',
    celular: '3001122334',
    mascotas: [],
  },
];

// VETERINARIOS
export const VETERINARIOS_MOCK: Veterinario[] = [
  {
    id: 1,
    nombre: 'Dra. Paula Torres',
    cedula: '12345678',
    celular: '3111234567',
    correo: 'paula.torres@medicat.com',
    especialidad: 'Medicina Interna',
    contrasenia: 'vet123',
    imageURL: 'assets/img/vet1.jpeg',
    estado: 'activo',
    num_Atenciones: 120,
    tratamientos: [],
  },
  {
    id: 2,
    nombre: 'Dr. Mateo Salazar',
    cedula: '87654321',
    celular: '3229876543',
    correo: 'mateo.salazar@medicat.com',
    especialidad: 'Cirugía',
    contrasenia: 'vet456',
    imageURL: 'assets/img/vet2.jpeg',
    estado: 'activo',
    num_Atenciones: 85,
    tratamientos: [],
  },
  {
    id: 3,
    nombre: 'Dra. Laura Ramírez',
    cedula: '11223344',
    celular: '3001122334',
    correo: 'laura.ramirez@medicat.com',
    especialidad: 'Dermatología',
    contrasenia: 'vet789',
    imageURL: 'assets/img/vet4.jpeg',
    estado: 'activo',
    num_Atenciones: 60,
    tratamientos: [],
  },
];

// DROGAS
export const DROGAS_MOCK: Droga[] = [
  { id: 1, nombre: 'Amoxicilina', precioCompra: 5000, precioVenta: 12000, unidadesDisponibles: 50, unidadesVendidas: 30 },
  { id: 2, nombre: 'Omeprazol veterinario', precioCompra: 3000, precioVenta: 8000, unidadesDisponibles: 40, unidadesVendidas: 15 },
  { id: 3, nombre: 'Suplemento articular', precioCompra: 15000, precioVenta: 35000, unidadesDisponibles: 20, unidadesVendidas: 10 },
  { id: 4, nombre: 'Ivermectina', precioCompra: 2000, precioVenta: 6000, unidadesDisponibles: 60, unidadesVendidas: 45 },
  { id: 5, nombre: 'Dexametasona', precioCompra: 4000, precioVenta: 10000, unidadesDisponibles: 30, unidadesVendidas: 20 },
];

// MASCOTAS
export const MASCOTAS_MOCK: Mascota[] = [
  {
    id: 1,
    nombre: 'Luna',
    especie: 'Canino',
    raza: 'Labrador',
    edad: 5,
    peso: 20.3,
    foto: 'dog1.jpg',
    estado: 'activa',
    enfermedad: 'Sin enfermedad',
    observaciones: 'Muy juguetona y amigable.',
    tratamiento: 'No registrado',
    veterinarioAsignado: 'Dra. Paula Torres',
    cliente: CLIENTES_MOCK[0],
    tratamientos: [],
  },
  {
    id: 2,
    nombre: 'Milo',
    especie: 'Felino',
    raza: 'Siamés',
    edad: 3,
    peso: 4.2,
    foto: 'cat1.jpg',
    estado: 'tratamiento',
    enfermedad: 'Gastritis leve',
    observaciones: 'Debe mantener dieta blanda por 7 días.',
    tratamiento: 'Omeprazol veterinario',
    veterinarioAsignado: 'Dra. Laura Ramírez',
    cliente: CLIENTES_MOCK[1],
    tratamientos: [],
  },
  {
    id: 3,
    nombre: 'Rocky',
    especie: 'Canino',
    raza: 'Bulldog',
    edad: 8,
    peso: 17.8,
    foto: 'dog2.jpg',
    estado: 'inactiva',
    enfermedad: 'Artritis',
    observaciones: 'Control mensual para seguimiento articular.',
    tratamiento: 'Suplemento articular',
    veterinarioAsignado: 'Dr. Mateo Salazar',
    cliente: CLIENTES_MOCK[0],
    tratamientos: [],
  },
  {
    id: 4,
    nombre: 'Tom',
    especie: 'Felino',
    raza: 'Criollo',
    edad: 2,
    peso: 3.8,
    foto: 'cat2.jpg',
    estado: 'activa',
    enfermedad: 'Sin enfermedad',
    observaciones: '',
    tratamiento: '',
    veterinarioAsignado: '',
    cliente: CLIENTES_MOCK[0],
    tratamientos: [],
  },
];

// TRATAMIENTOS
export const TRATAMIENTOS_MOCK: Tratamiento[] = [
  {
    id: 1,
    descripcion: 'Tratamiento antibiótico por infección respiratoria',
    fecha: '2026-03-10',
    mascota: MASCOTAS_MOCK[0],
    veterinario: VETERINARIOS_MOCK[0],
    drogas: [],
  },
  {
    id: 2,
    descripcion: 'Control de gastritis y dieta especial',
    fecha: '2026-03-15',
    mascota: MASCOTAS_MOCK[1],
    veterinario: VETERINARIOS_MOCK[2],
    drogas: [],
  },
];
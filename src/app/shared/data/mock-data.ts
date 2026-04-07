import { Cliente } from '../../cliente/cliente';
import { Mascota } from '../../mascota/mascota';
import { Admin } from '../../admin/admin';
import { Veterinario } from '../../veterinario/veterinario';
import { Droga } from '../../droga/droga';
import { Tratamiento } from '../../tratamiento/tratamiento';

// ── Admins ───────────────────────────────────────────────
export const ADMINS_MOCK: Admin[] = [
  {
    id: 1,
    nombre: 'Laura Administradora',
    correo: 'admin@medicat.com',
    contrasenia: 'admin123',
  },
];

// ── Veterinarios ─────────────────────────────────────────
export const VETERINARIOS_MOCK: Veterinario[] = [
  {
    id: 20,
    nombre: 'Sofía',
    apellido: 'Herrera',
    correo: 'sofia@medicat.com',
    contrasenia: 'vet123',
    celular: '3151234567',
    especialidad: 'Medicina General',
    numeroLicencia: 'MV-10021',
  },
  {
    id: 21,
    nombre: 'Andrés',
    apellido: 'Mora',
    correo: 'andres@medicat.com',
    contrasenia: 'vet123',
    celular: '3167654321',
    especialidad: 'Cirugía',
    numeroLicencia: 'MV-10045',
  },
  {
    id: 22,
    nombre: 'Valentina',
    apellido: 'Castro',
    correo: 'valentina@medicat.com',
    contrasenia: 'vet123',
    celular: '3209988776',
    especialidad: 'Dermatología',
    numeroLicencia: 'MV-10078',
  },
];

// ── Clientes ─────────────────────────────────────────────
export const CLIENTES_MOCK: Cliente[] = [
  {
    id: 10,
    nombre: 'Ana',
    apellido: 'Martínez',
    correo: 'ana@email.com',
    contrasenia: 'cliente123',
    celular: '3101234567',
    mascotas: [],
  },
  {
    id: 11,
    nombre: 'Carlos',
    apellido: 'Ruiz',
    correo: 'carlos@email.com',
    contrasenia: 'cliente123',
    celular: '3209876543',
    mascotas: [],
  },
  {
    id: 12,
    nombre: 'Diana',
    apellido: 'Gómez',
    correo: 'diana@email.com',
    contrasenia: 'cliente123',
    celular: '3001122334',
    mascotas: [],
  },
];

// ── Mascotas ─────────────────────────────────────────────
export const MASCOTAS_MOCK: Mascota[] = [
  {
    id: 1,
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Labrador',
    sexo: 'Hembra',
    fechaNacimiento: '2020-03-15',
    edad: 5,
    peso: 28.5,
    estado: 'Activa',
    enfermedad: '',
    observaciones: 'Vacunas al día. Control anual pendiente.',
    foto: 'luna.jpg',
    veterinarioAsignado: 'Sofía Herrera',
    clienteId: 10,
    propietario: 'Ana Martínez',
  },
  {
    id: 2,
    nombre: 'Tom',
    especie: 'Gato',
    raza: 'Criollo',
    sexo: 'Macho',
    fechaNacimiento: '2021-07-22',
    edad: 3,
    peso: 4.2,
    estado: 'Tratamiento',
    enfermedad: 'Gastroenteritis',
    observaciones: 'Dieta blanda. Revisión en 5 días.',
    foto: 'tom.jpg',
    veterinarioAsignado: 'Sofía Herrera',
    clienteId: 10,
    propietario: 'Ana Martínez',
  },
  {
    id: 3,
    nombre: 'Milo',
    especie: 'Perro',
    raza: 'Pug',
    sexo: 'Macho',
    fechaNacimiento: '2019-11-05',
    edad: 6,
    peso: 9.8,
    estado: 'Activa',
    enfermedad: 'Post-quirúrgico castración',
    observaciones: 'Collar isabelino 10 días. Control de herida cada 48h.',
    foto: 'milo.jpg',
    veterinarioAsignado: 'Andrés Mora',
    clienteId: 11,
    propietario: 'Carlos Ruiz',
  },
  {
    id: 4,
    nombre: 'Coco',
    especie: 'Conejo',
    raza: 'Holland Lop',
    sexo: 'Hembra',
    fechaNacimiento: '2022-01-10',
    edad: 2,
    peso: 1.9,
    estado: 'Tratamiento',
    enfermedad: 'Dermatitis alérgica',
    observaciones: 'Evitar contacto con pasto recién cortado.',
    foto: 'coco.jpg',
    veterinarioAsignado: 'Valentina Castro',
    clienteId: 12,
    propietario: 'Diana Gómez',
  },
];

// ── Drogas ───────────────────────────────────────────────
export const DROGAS_MOCK: Droga[] = [
  {
    id: 100,
    nombre: 'Amoxicilina',
    descripcion: 'Antibiótico de amplio espectro para infecciones bacterianas',
    unidad: 'mg',
    stock: 50,
    dosis: '10mg por kg de peso cada 12 horas',
  },
  {
    id: 101,
    nombre: 'Meloxicam',
    descripcion: 'Antiinflamatorio no esteroideo para dolor y fiebre',
    unidad: 'mg',
    stock: 30,
    dosis: '0.2mg por kg de peso una vez al día',
  },
  {
    id: 102,
    nombre: 'Metronidazol',
    descripcion: 'Antibiótico y antiparasitario para infecciones digestivas',
    unidad: 'mg',
    stock: 40,
    dosis: '15mg por kg de peso cada 8 horas',
  },
  {
    id: 103,
    nombre: 'Prednisona',
    descripcion: 'Corticoide para procesos inflamatorios y alérgicos',
    unidad: 'mg',
    stock: 5,
    dosis: '1mg por kg de peso una vez al día',
  },
  {
    id: 104,
    nombre: 'Furosemida',
    descripcion: 'Diurético para retención de líquidos e insuficiencia cardíaca',
    unidad: 'mg',
    stock: 0,
    dosis: '2mg por kg de peso cada 12 horas',
  },
];

// ── Tratamientos ─────────────────────────────────────────
export const TRATAMIENTOS_MOCK: Tratamiento[] = [
  {
    id: 200,
    mascotaId: 1,
    mascota: 'Luna',
    clienteId: 10,
    veterinarioId: 20,
    veterinario: 'Sofía Herrera',
    diagnostico: 'Infección respiratoria leve',
    observaciones: 'Mantener en reposo. Evitar paseos bajo lluvia.',
    fecha: '2026-03-20',
    estado: 'Completado',
    drogas: [
      { id: 1000, drogaId: 100, nombreDroga: 'Amoxicilina', dosis: '10mg/kg', frecuencia: 'Cada 12 horas', duracion: '7 días' },
      { id: 1001, drogaId: 101, nombreDroga: 'Meloxicam', dosis: '0.2mg/kg', frecuencia: 'Una vez al día', duracion: '5 días' },
    ],
  },
  {
    id: 201,
    mascotaId: 2,
    mascota: 'Tom',
    clienteId: 10,
    veterinarioId: 20,
    veterinario: 'Sofía Herrera',
    diagnostico: 'Gastroenteritis aguda',
    observaciones: 'Dieta blanda por 5 días. Hidratación abundante.',
    fecha: '2026-04-01',
    estado: 'Activo',
    drogas: [
      { id: 1002, drogaId: 102, nombreDroga: 'Metronidazol', dosis: '15mg/kg', frecuencia: 'Cada 8 horas', duracion: '5 días' },
    ],
  },
  {
    id: 202,
    mascotaId: 3,
    mascota: 'Milo',
    clienteId: 11,
    veterinarioId: 21,
    veterinario: 'Andrés Mora',
    diagnostico: 'Recuperación post-quirúrgica — castración',
    observaciones: 'Control de herida cada 48 horas. Collar isabelino.',
    fecha: '2026-03-28',
    estado: 'Activo',
    drogas: [
      { id: 1003, drogaId: 101, nombreDroga: 'Meloxicam', dosis: '0.2mg/kg', frecuencia: 'Una vez al día', duracion: '3 días' },
    ],
  },
  {
    id: 203,
    mascotaId: 4,
    mascota: 'Coco',
    clienteId: 12,
    veterinarioId: 22,
    veterinario: 'Valentina Castro',
    diagnostico: 'Dermatitis alérgica estacional',
    observaciones: 'Evitar contacto con pasto recién cortado.',
    fecha: '2026-04-03',
    estado: 'Pendiente',
    drogas: [
      { id: 1004, drogaId: 103, nombreDroga: 'Prednisona', dosis: '1mg/kg', frecuencia: 'Una vez al día', duracion: '10 días' },
    ],
  },
];
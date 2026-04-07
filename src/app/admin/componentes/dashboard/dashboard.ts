import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SesionActiva } from '../../../user/services/auth.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { MascotaService } from '../../../mascota/services/mascota.service';

interface CitaHoy {
  hora: string;
  mascota: string;
  duenio: string;
  tipo: string;
  estado: 'Confirmada' | 'Pendiente' | 'Emergencia';
}

interface ActividadReciente {
  svgPath: string;
  texto: string;
  hace: string;
}

interface AccesoRapido {
  svgPath: string;
  label: string;
  ruta: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  sesion: SesionActiva | null = null;

  totalClientes = 0;
  totalMascotas = 0;
  citasHoy = 18;
  emergencias = 2;

  accesos: AccesoRapido[] = [
    {
      svgPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      label: 'Clientes',
      ruta: '/clientes',
    },
    {
      svgPath: '<path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/>',
      label: 'Mascotas',
      ruta: '/mascotas',
    },
    {
      svgPath: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
      label: 'Tratamientos',
      ruta: '/tratamientos',
    },
    {
      svgPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      label: 'Emergencias',
      ruta: '/tratamientos',
    },
    {
      svgPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
      label: 'Nueva Mascota',
      ruta: '/mascotas/nueva',
    },
    {
      svgPath: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
      label: 'Nuevo Cliente',
      ruta: '/clientes/nuevo',
    },
  ];

  citasProximas: CitaHoy[] = [
    { hora: '09:00', mascota: 'Max',   duenio: 'María González',   tipo: 'Consulta General', estado: 'Confirmada' },
    { hora: '10:30', mascota: 'Luna',  duenio: 'Carlos Rodríguez', tipo: 'Vacunación',        estado: 'Confirmada' },
    { hora: '11:00', mascota: 'Rocky', duenio: 'Ana López',        tipo: 'Cirugía Menor',     estado: 'Pendiente'  },
    { hora: '14:00', mascota: 'Bella', duenio: 'Luis Fernández',   tipo: 'Emergencia',        estado: 'Emergencia' },
  ];

  actividad: ActividadReciente[] = [
    {
      svgPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
      texto: 'Nuevo cliente registrado: Carmen Sánchez',
      hace: 'Hace 15 min',
    },
    {
      svgPath: '<path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>',
      texto: 'Nueva mascota añadida: Simba (Gato)',
      hace: 'Hace 52 min',
    },
    {
      svgPath: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      texto: 'Cita completada: Max - Consulta General',
      hace: 'Hace 1 hora',
    },
    {
      svgPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      texto: 'Emergencia atendida: Luna - Intoxicación',
      hace: 'Hace 2 horas',
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly clienteService: ClienteService,
    private readonly mascotaService: MascotaService,
    private readonly router: Router,
  ) {
    this.sesion = this.authService.getSesion();
    this.totalClientes = this.clienteService.getAll().length;
    this.totalMascotas = this.mascotaService.getAll().length;
  }

  get inicialesAdmin(): string {
    if (!this.sesion) return 'A';
    return this.sesion.nombre
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }

  estadoClase(estado: string): string {
    const map: Record<string, string> = {
      Confirmada: 'estado-confirmada',
      Pendiente:  'estado-pendiente',
      Emergencia: 'estado-emergencia',
    };
    return map[estado] ?? '';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/inicio/login']);
  }

  irSitio(): void {
    this.router.navigate(['/inicio']);
  }
}
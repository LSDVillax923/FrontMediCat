import { Injectable } from '@angular/core';
import { Cliente } from '../../cliente/cliente';
import { ClienteService } from '../../cliente/services/cliente.service';
import { AdminService } from '../../admin/services/admin.service';

export type RolUsuario = 'admin' | 'cliente' | null;

export interface SesionActiva {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sesion: SesionActiva | null = null;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly adminService: AdminService,
  ) {}

  /** Intenta iniciar sesión. Devuelve la sesión o null si falla. */
  login(correo: string, contrasenia: string): SesionActiva | null {
    // 1. Verificar si es admin
    const admin = this.adminService.validarCredenciales(correo, contrasenia);
    if (admin) {
      this.sesion = { id: admin.id, nombre: admin.nombre, correo: admin.correo, rol: 'admin' };
      return this.sesion;
    }

    // 2. Verificar si es cliente
    const clientes = this.clienteService.getAll();
    const cliente = clientes.find(
      (c) => c.correo === correo.trim().toLowerCase() && c.contrasenia === contrasenia,
    );
    if (cliente) {
      this.sesion = {
        id: cliente.id,
        nombre: `${cliente.nombre} ${cliente.apellido}`,
        correo: cliente.correo,
        rol: 'cliente',
      };
      return this.sesion;
    }

    return null;
  }

  /** Registra un nuevo cliente y lo deja como sesión activa */
  registrar(datos: Omit<Cliente, 'id' | 'mascotas'>): SesionActiva {
    const nuevo = this.clienteService.add(datos);
    this.sesion = {
      id: nuevo.id,
      nombre: `${nuevo.nombre} ${nuevo.apellido}`,
      correo: nuevo.correo,
      rol: 'cliente',
    };
    return this.sesion;
  }

  logout(): void {
    this.sesion = null;
  }

  getSesion(): SesionActiva | null {
    return this.sesion;
  }

  estaAutenticado(): boolean {
    return this.sesion !== null;
  }

  esAdmin(): boolean {
    return this.sesion?.rol === 'admin';
  }
}
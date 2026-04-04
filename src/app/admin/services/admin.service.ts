import { Injectable } from '@angular/core';
import { Admin } from '../admin';
import { ADMINS_MOCK } from '../../shared/data/mock-data';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private admins: Admin[] = [...ADMINS_MOCK];

  getAll(): Admin[] {
    return this.admins;
  }

  getById(id: number): Admin | null {
    return this.admins.find((a) => a.id === id) ?? null;
  }

  /** Valida credenciales de admin (para uso en auth sin backend) */
  validarCredenciales(correo: string, contrasenia: string): Admin | null {
    return (
      this.admins.find(
        (a) => a.correo === correo.trim().toLowerCase() && a.contrasenia === contrasenia,
      ) ?? null
    );
  }
}
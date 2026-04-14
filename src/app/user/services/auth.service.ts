import { Injectable } from '@angular/core';

export interface SesionActiva {
  id: number;
  nombre: string;
  correo: string;
  rol: 'admin' | 'cliente' | 'veterinario';
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'sesion_medicat';

  getSesion(): SesionActiva | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SesionActiva;
    } catch {
      return null;
    }
  }

  setSesion(sesion: SesionActiva): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sesion));
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

   getToken(): string | null {
    return this.getSesion()?.token ?? null;
  }

  esAdmin(): boolean {
    return this.getSesion()?.rol === 'admin';
  }

  esCliente(): boolean {
    return this.getSesion()?.rol === 'cliente';
  }

  esVeterinario(): boolean {
    return this.getSesion()?.rol === 'veterinario';
  }

  estaAutenticado(): boolean {
    return this.getSesion() !== null;
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, SesionActiva } from '../../../user/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  collapsed = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  get sesion(): SesionActiva | null {
    return this.authService.getSesion();
  }

  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/inicio/login']);
  }
}
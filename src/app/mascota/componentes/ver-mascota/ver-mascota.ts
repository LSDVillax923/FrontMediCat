import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../mascota';

@Component({
  selector: 'app-ver-mascota',
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-mascota.html',
  styleUrl: './ver-mascota.css',
})
export class VerMascota {
  mascota: Mascota | null = null;
  clienteId: number | null = null;
  errorMascota = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mascotaService: MascotaService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mascota = this.mascotaService.getById(id);
    if (!this.mascota) {
      this.errorMascota = 'No se encontró la mascota solicitada.';
    }

    this.route.queryParamMap.subscribe((params) => {
      const qId = params.get('clienteId');
      this.clienteId = qId ? Number(qId) : null;
    });
  }

  get volverUrl(): string[] {
    if (this.clienteId) {
      return ['/clientes', this.clienteId.toString(), 'mismascotas'];
    }
    return ['/mascotas'];
  }

  get volverTexto(): string {
    return this.clienteId ? '← Mis Mascotas' : '← Volver al listado';
  }
}
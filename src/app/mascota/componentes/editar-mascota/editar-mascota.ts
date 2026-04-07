import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { VeterinarioService } from '../../../veterinario/services/veterinario.service';
import { Veterinario } from '../../../veterinario/veterinario';
import { Mascota } from '../../mascota';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-editar-mascota',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar],
  templateUrl: './editar-mascota.html',
  styleUrl: './editar-mascota.css',
})
export class EditarMascota {
  mascota: Mascota = {
    id: 0,
    nombre: '',
    especie: '',
    raza: '',
    sexo: '',
    fechaNacimiento: '',
    edad: 0,
    peso: 0,
    estado: 'Activa',
    enfermedad: '',
    observaciones: '',
    veterinarioAsignado: '',
    clienteId: 0,
  };

  veterinariosDisponibles: Veterinario[] = [];
  mensaje = '';
  error = '';
  noEncontrada = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly mascotaService: MascotaService,
    private readonly veterinarioService: VeterinarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const encontrada = this.mascotaService.getById(id);

    if (encontrada) {
      this.mascota = { ...encontrada };
    } else {
      this.noEncontrada = true;
      this.error = 'No se encontró la mascota solicitada.';
    }

    this.veterinariosDisponibles = this.veterinarioService.getActivos();
  }

  guardarCambios(): void {
    if (!this.mascota.nombre || !this.mascota.especie || !this.mascota.raza) {
      this.error = 'Los campos nombre, especie y raza son obligatorios.';
      return;
    }
    
    this.mascotaService.update(this.mascota.id, this.mascota);
    this.mensaje = `Se actualizaron los datos de ${this.mascota.nombre}.`;
    this.error = '';
  }

  cancelar(): void {
    this.router.navigate(['/mascotas']);
  }
}
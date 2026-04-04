import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';

interface VeterinarioForm {
  id: number;
  nombre: string;
  cedula: string;
  celular: string;
  correo: string;
  especialidad: string;
  contrasenia: string;
  estado: string;
  imageURL: string;
  num_Atenciones: number;
}

@Component({
  selector: 'app-editar-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-veterinario.html',
  styleUrl: './editar-veterinario.css',
})
export class EditarVeterinario {
  formData: VeterinarioForm = {
    id: 0, nombre: '', cedula: '', celular: '', correo: '',
    especialidad: '', contrasenia: '', estado: 'activo', imageURL: '', num_Atenciones: 0,
  };

  readonly especialidades = [
    'Medicina Interna', 'Cirugía', 'Dermatología', 'Odontología',
    'Oftalmología', 'Traumatología', 'Oncología', 'Urgencias',
  ];

  mensaje = '';
  error = '';
  noEncontrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly veterinarioService: VeterinarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const vet = this.veterinarioService.getById(id);

    if (vet) {
      this.formData = {
        id: vet.id, nombre: vet.nombre, cedula: vet.cedula,
        celular: vet.celular, correo: vet.correo, especialidad: vet.especialidad,
        contrasenia: vet.contrasenia, estado: vet.estado,
        imageURL: vet.imageURL, num_Atenciones: vet.num_Atenciones,
      };
    } else {
      this.noEncontrado = true;
    }
  }

  guardarCambios(): void {
    this.veterinarioService.update(this.formData.id, this.formData);
    this.mensaje = `Los datos de ${this.formData.nombre} fueron actualizados.`;
    this.error = '';
  }

  cancelar(): void {
    this.router.navigate(['/veterinarios']);
  }
}
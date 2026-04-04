import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
import { Tratamiento } from '../../tratamiento';

@Component({
  selector: 'app-ver-tratamiento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-tratamiento.html',
  styleUrl: './ver-tratamiento.css',
})
export class VerTratamiento {
  tratamiento: Tratamiento | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tratamientoService: TratamientoService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tratamiento = this.tratamientoService.getById(id);
  }
}
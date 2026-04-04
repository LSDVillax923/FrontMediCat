import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../veterinario';

@Component({
  selector: 'app-ver-veterinario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-veterinario.html',
  styleUrl: './ver-veterinario.css',
})
export class VerVeterinario {
  veterinario: Veterinario | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly veterinarioService: VeterinarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinario = this.veterinarioService.getById(id);
  }
}
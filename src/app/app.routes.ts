import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio/inicio';
import { ListarMascotas } from './mascota/listar-mascotas/listar-mascotas';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: Inicio },
  { path: 'mascotas', component: ListarMascotas },
  { path: '**', redirectTo: 'inicio' },
];

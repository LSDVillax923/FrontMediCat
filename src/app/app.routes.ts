import { Routes } from '@angular/router';
import { ListarCliente } from './cliente/listar-cliente/listar-cliente';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';
import { EditarCliente } from './cliente/editar-cliente/editar-cliente';
import { VerCliente } from './cliente/ver-cliente/ver-cliente';
import { Inicio } from './inicio/inicio/inicio';
import { ListarMascotas } from './mascota/listar-mascotas/listar-mascotas';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: Inicio },
  { path: 'mascotas', component: ListarMascotas },
    { path: 'clientes', component: ListarCliente },
  { path: 'clientes/nuevo', component: NuevoCliente },
  { path: 'clientes/:id', component: VerCliente },
  { path: 'clientes/:id/editar', component: EditarCliente },
  { path: '**', redirectTo: 'inicio' },
];

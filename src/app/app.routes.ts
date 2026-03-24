import { Routes } from '@angular/router';
import { ListarCliente } from './cliente/listar-cliente/listar-cliente';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';
import { EditarCliente } from './cliente/editar-cliente/editar-cliente';
import { VerCliente } from './cliente/ver-cliente/ver-cliente';
import { Inicio } from './inicio/inicio/inicio';
import { ListarMascotas } from './mascota/listar-mascotas/listar-mascotas';
import { EditarMascota } from './mascota/editar-mascota/editar-mascota';
import { NuevaMascota } from './mascota/nueva-mascota/nueva-mascota';
import { VerMascota } from './mascota/ver-mascota/ver-mascota';
import { Login } from './user/login/login';
import { ForgotPassword } from './user/forgot-password/forgot-password';
import { SignUp } from './user/sign-up/sign-up';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: Inicio },
  { path: 'inicio/login', component: Login },
  { path: 'inicio/registro', component: SignUp },
  { path: 'inicio/login', component: Login },
  { path: 'inicio/forgot-password', component: ForgotPassword },
  { path: 'mascotas', component: ListarMascotas },
  { path: 'mascotas/nueva', component: NuevaMascota },
  { path: 'mascotas/:id', component: VerMascota },
  { path: 'mascotas/:id/editar', component: EditarMascota },
  { path: 'clientes', component: ListarCliente },
  { path: 'clientes/nuevo', component: NuevoCliente },
  { path: 'clientes/:id', component: VerCliente },
  { path: 'clientes/:id/editar', component: EditarCliente },
  { path: 'clientes/:id/mismascotas', component: ListarMascotas },
  { path: 'inicio/login', component: Login },
  { path: 'inicio/forgot-password', component: ForgotPassword },
  { path: 'inicio/registro', component: SignUp },
  { path: '**', redirectTo: 'inicio' },
];

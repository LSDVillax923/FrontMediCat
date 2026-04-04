import { Routes } from '@angular/router';

// Guards
import { authGuard } from './shared/guards/auth-guard.guard';
//import { roleGuard } from './shared/guards/role-guard.guard';
import { adminGuard } from './shared/guards/role-guard.guard';
// Inicio
import { Inicio } from './inicio/inicio/inicio';
// User
import { Login } from './user/componentes/login/login';
import { ForgotPassword } from './user/componentes/forgot-password/forgot-password';
import { SignUp } from './user/componentes/sign-up/sign-up';

// Cliente
import { ListarCliente } from './cliente/componentes/listar-cliente/listar-cliente';
import { NuevoCliente } from './cliente/componentes/nuevo-cliente/nuevo-cliente';
import { EditarCliente } from './cliente/componentes/editar-cliente/editar-cliente';
import { VerCliente } from './cliente/componentes/ver-cliente/ver-cliente';

// Mascota
import { ListarMascotas } from './mascota/componentes/listar-mascotas/listar-mascotas';
import { NuevaMascota } from './mascota/componentes/nueva-mascota/nueva-mascota';
import { EditarMascota } from './mascota/componentes/editar-mascota/editar-mascota';
import { VerMascota } from './mascota/componentes/ver-mascota/ver-mascota';

// Veterinario
import { ListarVeterinarios } from './veterinario/componentes/listar-veterinarios/listar-veterinarios';
import { NuevoVeterinario } from './veterinario/componentes/nuevo-veterinario/nuevo-veterinario';
import { EditarVeterinario } from './veterinario/componentes/editar-veterinario/editar-veterinario';
import { VerVeterinario } from './veterinario/componentes/ver-veterinario/ver-veterinario';

// Droga
import { ListarDrogas } from './droga/componentes/listar-drogas/listar-drogas';
import { NuevaDroga } from './droga/componentes/nueva-droga/nueva-droga';
import { EditarDroga } from './droga/componentes/editar-droga/editar-droga';

// Tratamiento
import { ListarTratamientos } from './tratamiento/componentes/listar-tratamientos/listar-tratamientos';
import { NuevoTratamiento } from './tratamiento/componentes/nuevo-tratamiento/nuevo-tratamiento';
import { EditarTratamiento } from './tratamiento/componentes/editar-tratamiento/editar-tratamiento';
import { VerTratamiento } from './tratamiento/componentes/ver-tratamiento/ver-tratamiento';

export const routes: Routes = [
  // ── Redireccion raíz ──────────────────────────────────────────────────────
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  // ── Pública: landing + auth ───────────────────────────────────────────────
  { path: 'inicio', component: Inicio },
  { path: 'inicio/login', component: Login },
  { path: 'inicio/registro', component: SignUp },
  { path: 'inicio/forgot-password', component: ForgotPassword },

  // ── Clientes (requiere autenticación) ─────────────────────────────────────
  { path: 'clientes', component: ListarCliente, canActivate: [authGuard] },
  { path: 'clientes/nuevo', component: NuevoCliente, canActivate: [authGuard] },
  { path: 'clientes/:id', component: VerCliente, canActivate: [authGuard] },
  { path: 'clientes/:id/editar', component: EditarCliente, canActivate: [authGuard] },
  { path: 'clientes/:id/mismascotas', component: ListarMascotas, canActivate: [authGuard] },

  // ── Mascotas (requiere autenticación) ─────────────────────────────────────
  { path: 'mascotas', component: ListarMascotas, canActivate: [authGuard] },
  { path: 'mascotas/nueva', component: NuevaMascota, canActivate: [authGuard] },
  { path: 'mascotas/:id', component: VerMascota, canActivate: [authGuard] },
  { path: 'mascotas/:id/editar', component: EditarMascota, canActivate: [authGuard] },

  // ── Veterinarios (solo admin) ──────────────────────────────────────────────
  { path: 'veterinarios', component: ListarVeterinarios, canActivate: [authGuard, adminGuard] },
  { path: 'veterinarios/nuevo', component: NuevoVeterinario, canActivate: [authGuard, adminGuard] },
  { path: 'veterinarios/:id', component: VerVeterinario, canActivate: [authGuard, adminGuard] },
  { path: 'veterinarios/:id/editar', component: EditarVeterinario, canActivate: [authGuard, adminGuard] },

  // ── Drogas / Inventario (solo admin) ──────────────────────────────────────
  { path: 'drogas', component: ListarDrogas, canActivate: [authGuard, adminGuard] },
  { path: 'drogas/nueva', component: NuevaDroga, canActivate: [authGuard, adminGuard] },
  { path: 'drogas/:id/editar', component: EditarDroga, canActivate: [authGuard, adminGuard] },

  // ── Tratamientos (requiere autenticación) ─────────────────────────────────
  { path: 'tratamientos', component: ListarTratamientos, canActivate: [authGuard] },
  { path: 'tratamientos/nuevo', component: NuevoTratamiento, canActivate: [authGuard] },
  { path: 'tratamientos/:id', component: VerTratamiento, canActivate: [authGuard] },
  { path: 'tratamientos/:id/editar', component: EditarTratamiento, canActivate: [authGuard] },

  // ── Wildcard ───────────────────────────────────────────────────────────────
  { path: '**', redirectTo: 'inicio' },
];

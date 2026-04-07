import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../user/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.esAdmin()) {
    return true;
  }

  router.navigate(['/inicio']);
  return false;
};

export const veterinarioGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.esVeterinario() || auth.esAdmin()) {
    return true;
  }

  router.navigate(['/inicio']);
  return false;
};

export const clienteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.esCliente()) {
    return true;
  }

  router.navigate(['/inicio']);
  return false;
};
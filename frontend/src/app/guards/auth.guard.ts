import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    console.log("AuthGuard: échec car pas de token. Redirection...");
    router.navigate(['/']);
    return false;
  }
  console.log("AuthGuard: succès car token présent.");
  return true;
};

export const PublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log("PublicGuard: succès car token présent. Redirection...");
    setTimeout(() => {
      router.navigate(['/home']);
    }, 1000);
    return false;
  }
  console.log("PublicGuard: échec car non connecté.");
  return true;
};

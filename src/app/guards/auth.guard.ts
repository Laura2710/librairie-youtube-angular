import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageSsService } from '../services/storage-ss.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(StorageSsService);
  const router = inject(Router);

  if (!auth.isAuth()) {
    router.navigate(['']);
    return false;
  }
  return true;
};

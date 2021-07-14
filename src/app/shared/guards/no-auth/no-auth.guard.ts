import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { StorageService } from '@shared/services';
import { POKEMON_ROUTES } from '@app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  canLoad(): boolean {
    const isLogged = this.storageService.userIsLogged();
    if(isLogged) {
      this.router.navigateByUrl(`/${POKEMON_ROUTES.main}`);
      return false
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { ROOT } from '@shared/constants';
import { StorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  canLoad(): boolean {
    if(!this.storageService.userIsLogged()) {
      this.router.navigateByUrl(ROOT.main);
      return false
    }
    return true;
  }
}

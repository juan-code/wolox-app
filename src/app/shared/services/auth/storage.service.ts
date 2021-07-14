import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly nameKeyStorage = 'token';
  constructor() { }

  public userIsLogged(): boolean {
    const tokenAuth:string | null = localStorage.getItem(this.nameKeyStorage);
    return !!tokenAuth
  }

  public setTokenStorage(token:string): void {
    localStorage.setItem(this.nameKeyStorage, token)
  }

  public deleteTokenStorage(): void {
    localStorage.removeItem(this.nameKeyStorage)
  }
}

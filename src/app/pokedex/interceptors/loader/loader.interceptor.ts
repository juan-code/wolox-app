import { Injectable, SkipSelf } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

import {
  PokemonService
} from '@pokedex/services';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private readonly pokemonService: PokemonService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pokemonService.toggleLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.pokemonService.toggleLoading(false);
      })
    )
  }
}

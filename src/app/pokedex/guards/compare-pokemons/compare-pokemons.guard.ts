import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SelectionPokemonService } from '@pokedex/services';
import { POKEMON_ROUTES } from '@shared/constants';

@Injectable()
export class ComparePokemonsGuard implements CanActivate {

  constructor(
    private readonly selectionPokemonService:SelectionPokemonService,
    private readonly router:Router,
  ) {}

  canActivate(): boolean {
    const listPokemon = this.selectionPokemonService.geListPokemon();
    if(listPokemon.length > 0) {
      return true;
    }
    this.router.navigateByUrl(POKEMON_ROUTES.main);
    return false
  }
  
}

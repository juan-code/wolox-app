import { Injectable } from '@angular/core';

import { PokemonItem } from '@pokedex/services/pokemon/pokemon.entity';
import { Observable, Subject } from 'rxjs';
import { PaginationPokemonService } from '@pokedex/services/pagination-pokemon/pagination-pokemon.service';

@Injectable()
export class SelectionPokemonService {

  private readonly limit:number = 3;
  private comparePokemons:PokemonItem[] = [];
  private readonly listPokemones:Subject<PokemonItem[]> = new Subject<PokemonItem[]>();

  constructor(
    private readonly pagintationPokemonService:PaginationPokemonService
  ) { }

  private toggleSelectionPokemon(isSelected:boolean, id:number) {
    const pages = this.pagintationPokemonService.getAllPages();
    for(let numPage in pages) {
      const num = +numPage
      const page = pages[num];
      const indexPokemon = page.results.findIndex(pokemon => pokemon.id === id);
      if(indexPokemon > -1) {
        const pokemon = {
          ...pages[numPage].results[indexPokemon],
          selected: isSelected,
        };
        this.pagintationPokemonService.setPokemonInPage(num, indexPokemon, pokemon);
      }
    }
  }

  public resetSelection() {
    this.comparePokemons = [];
    this.listPokemones.next([]);
  }

  public geListPokemon():PokemonItem[] {
    return this.comparePokemons
  }

  public listPokemonsListener():Observable<PokemonItem[]> {
    return this.listPokemones.asObservable();
  }

  public add(pokemon:PokemonItem) {
    if(this.comparePokemons.length < this.limit) {
      this.comparePokemons.push(pokemon);
      this.listPokemones.next(this.comparePokemons);
      this.toggleSelectionPokemon(true, pokemon.id);
    }
  }

  public delete(id:number): void {
    const idPokemon = this.comparePokemons.findIndex(pokemon => pokemon.id === id);
    if(idPokemon !== -1) {
      this.comparePokemons.splice(idPokemon, 1);
      this.listPokemones.next(this.comparePokemons);
      this.toggleSelectionPokemon(false, id);
    }
  }

  public isCompletedSelection():boolean {
    return this.comparePokemons.length === this.limit;
  }
  
  public canContinue(): boolean {
    return this.comparePokemons.length < this.limit;
  }
}

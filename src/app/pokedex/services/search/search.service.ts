import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PaginationPokemonService } from '../pagination-pokemon/pagination-pokemon.service';
import { Pokemon, PokemonItem } from '../pokemon/pokemon.entity';
import { PokemonModel } from '../pokemon/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokemonNotFinded } from './search.entity';

@Injectable()
export class SearchPokemonService {

  private readonly $showPokemonSearcher:Subject<boolean> = new Subject<boolean>();
  public readonly $pokemonFinded:Subject<PokemonItem | PokemonNotFinded> = new Subject<PokemonItem | PokemonNotFinded>();
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly paginationService: PaginationPokemonService,
  ) { }

  public searchPokemon(value:string) {
    this.$showPokemonSearcher.next(true);
    const pokemonInPage = this.findPokemonByPages(value);
    if(pokemonInPage) {
      this.$pokemonFinded.next(pokemonInPage);
    } else {
      this.findPokemonByService(value);
    }
  }

  public clearSearch() {
    this.$showPokemonSearcher.next(false);
    this.$pokemonFinded.next();
  } 

  public listenShowSearch():Observable<boolean> {
    return this.$showPokemonSearcher.asObservable();
  }

  public listenSearch(): Observable<PokemonItem | PokemonNotFinded> {
    return this.$pokemonFinded.asObservable();
  }

  private findPokemonByPages(value:string):PokemonItem {
    const allPages = this.paginationService.getAllPages();
    let pokemonIsFinded!:PokemonItem;
    for(let page in allPages) {
      const pokemon:PokemonItem | undefined = allPages[page].results.find((pokemon:PokemonItem) => {
        return pokemon.name === value || `${pokemon.id}` === value;
      });
      if(pokemon) {
        pokemonIsFinded = pokemon;
        break
      }
    }
    return pokemonIsFinded
  }

  private findPokemonByService(value:string) {
    this.pokemonService.getPokemonByIdOrName(value)
    .subscribe((pokemon:Pokemon) => {
      const pokemonModel = new PokemonModel({
        name: pokemon.name,
        id: pokemon.id,
        url: '',
      });
      const pokemonNotification:PokemonItem = {
        name: pokemon.name,
        id: pokemon.id,
        url: '',
        sprite: pokemonModel.image(),
        spriteAnimated: pokemonModel.imageAnimated(),
        page: -1,
      };
      this.$pokemonFinded.next(pokemonNotification);
    }, (error) => {
      this.$pokemonFinded.next({ error });
    });
  }
}

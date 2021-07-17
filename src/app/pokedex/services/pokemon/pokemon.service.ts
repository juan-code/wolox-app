import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { DEAFULT_SIZE_PAGINATION, DEFAULT_PAGE } from '@pokedex/constants';
import { ListPokemons } from '@app/pokedex/services';
import { Pokemon, PokemonItem } from './pokemon.entity';
import { PokemonModel } from './pokemon.model';

@Injectable()
export class PokemonService implements Resolve<ListPokemons> {
  private readonly apiPokemon:string = environment.apiPokemon;
  private readonly VERSION:string = 'v2';
  private readonly $isGettingPokemons:Subject<boolean> = new Subject<boolean>();
  constructor(
    private readonly http:HttpClient,
  ) {}

  resolve(): Observable<ListPokemons> {
    return this.getListPokemon()
  }

  public toggleLoading(toggle:boolean): void {
    this.$isGettingPokemons.next(toggle);
  }

  public isLoadingPokemons(): Observable<boolean> {
    return this.$isGettingPokemons.asObservable();
  }

  public getListPokemon(page:number = DEFAULT_PAGE, limit:number = DEAFULT_SIZE_PAGINATION):Observable<ListPokemons> {
    const params:HttpParams = new HttpParams()
    .set('limit', `${limit}`)
    .set('offset', `${limit * page}`);
    return this.http.get<ListPokemons>(`${this.apiPokemon}/${this.VERSION}/pokemon`, {
      params: params,
      observe: 'body',
    }).pipe(
      map((listPokemon:ListPokemons) => {
        listPokemon.results = listPokemon.results.map((pokemon:PokemonItem, index:number) => {
          pokemon.id = index + (page * limit) + 1;
          const pokemonModel = new PokemonModel(pokemon);
          pokemon.sprite = pokemonModel.image();
          pokemon.spriteAnimated = pokemonModel.imageAnimated();
          pokemon.page = page;
          return pokemon;
        })
        return listPokemon;
      })
    )
  }

  public getPokemonByIdOrName(nameOrId:number | string):Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiPokemon}/${this.VERSION}/pokemon/${nameOrId}`);
  }
}

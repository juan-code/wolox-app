import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DEAFULT_SIZE_PAGINATION, DEFAULT_PAGE } from '@pokedex/constants';
import { ListPokemons, PaginationPokemon } from '@app/pokedex/services';
import { PokemonService } from '@pokedex/services/pokemon/pokemon.service';
import { PokemonItem } from '@pokedex/services/pokemon/pokemon.entity';

import { Pagination } from './pagination-pokemon.entity';

@Injectable()
export class PaginationPokemonService {

  private limit:number = DEAFULT_SIZE_PAGINATION;
  private currentPage:number = DEFAULT_PAGE;
  private pages:PaginationPokemon = {};
  private readonly $pages:Subject<PaginationPokemon> = new Subject<PaginationPokemon>()
  private readonly $pagination:Subject<Pagination> = new Subject<Pagination>();
  private readonly $currentPage:Subject<number> = new Subject<number>();

  constructor(
    private readonly pokemonService:PokemonService,
  ) { }
  
  public changeLimit(limit: number) {
    this.limit = limit;
    this.pages = {};
    this.$pages.next(this.pages);
    this.getPokemons(DEFAULT_PAGE).subscribe();
  }

  public start(list: ListPokemons) {
    this.pages = {};
    this.pages[DEFAULT_PAGE] = list;
    this.$pages.next(this.pages);
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getCurrentListPokemon():ListPokemons {
    return this.pages[this.currentPage];
  }

  public listenCurrentPage(): Observable<number> {
    return this.$currentPage.asObservable();
  }

  public listenPages(): Observable<PaginationPokemon> {
    return this.$pages.asObservable();
  }

  public getAllPages(): PaginationPokemon {
    return this.pages;
  }

  public getPagination(): Observable<Pagination> {
    return this.$pagination.asObservable()
  }

  public getPokemons(page:number):Observable<ListPokemons> {
    if(this.pages[page]) {
      this.updatePage(page);
      return of(this.pages[page]);
    }
    return this.pokemonService.getListPokemon(page, this.limit).pipe(
      tap((list:ListPokemons)=> {
        this.pages[page] = list;
        this.$pages.next(this.pages);
        this.$pagination.next({
          page: this.currentPage,
          limit: this.limit,
        });
        this.updatePage(page);
        return list
      })
    );
  }

  public setPokemonInPage(page:number, indexPokemon:number, pokemon:PokemonItem): void {
    this.pages[page].results[indexPokemon].selected = !!pokemon.selected;
    this.$pages.next(this.pages);
  }

  private updatePage(page:number) {
    this.$currentPage.next(page);
    this.currentPage = page;
  }
}

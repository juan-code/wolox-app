import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonItem, SelectionPokemonService } from '@app/pokedex/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],
})
export class ListPokemonComponent implements OnInit, OnDestroy {
  
  public isAtivated:boolean = false;
  public isCompletedSelection:boolean = false;
  @Input('pokemons') list:PokemonItem[] = [];
  @Output('selected') onSelected:EventEmitter<PokemonItem> = new EventEmitter<PokemonItem>();
  private readonly $subject:Subject<PokemonItem[]> = new Subject();
  constructor(
    private readonly selectionPokemonService:SelectionPokemonService,
  ) { }

  ngOnInit(): void {
    this.listenListSelection();
  }

  ngOnDestroy(): void {
    this.$subject.next();
    this.$subject.complete();
  }

  private listenListSelection(): void {
    this.selectionPokemonService.listPokemonsListener()
    .pipe(
      takeUntil(this.$subject)
    )
    .subscribe(() => {
      this.isCompletedSelection = this.selectionPokemonService.isCompletedSelection();
    })
  }

  public selected(pokemonIndex:number): void {
    const pokemon = this.list[pokemonIndex];
    if(pokemon.selected) {
      this.selectionPokemonService.delete(pokemon.id);
      return
    }
    if(this.selectionPokemonService.canContinue()) {
      this.selectionPokemonService.add(pokemon);
      this.onSelected.emit(pokemon);
    }
  }

  public id(id:number):string {
    let str = '0';
    if(id < 100) {
      str += '0';
    }
    return `#${str}${id}`;
  }

}

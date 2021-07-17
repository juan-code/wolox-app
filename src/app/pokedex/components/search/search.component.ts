import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonNotFinded } from '@app/pokedex/services/search/search.entity';
import { PokemonItem, SearchPokemonService } from '@pokedex/services';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public sarching: boolean = false;
  public hasError:boolean = false;
  public formSearch!:FormGroup;
  private subscriptos:Subscription = new Subscription();
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly searchService: SearchPokemonService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.listenSearchPokemon();
  }

  ngOnDestroy() {
    this.subscriptos.unsubscribe();
  }

  private buildForm() {
    this.formSearch = this.formBuilder.group({
      search: this.formBuilder.control('', Validators.compose([Validators.required]))
    });
  }

  public onSubmit(form:FormGroup) {
    if(form.valid) {
      this.sarching = true;
      this.searchService.searchPokemon(form.value.search);
    }
  }

  private listenSearchPokemon() {
    const listenSearchingSubscriptor:Subscription = this.searchService
    .listenSearch()
    .pipe(
      tap(() => {
        this.sarching = false;
      })
    )
    .subscribe((pokemonFinded:PokemonNotFinded | PokemonItem) => {
      if(pokemonFinded && 'error' in pokemonFinded) {
        this.hasError = true;
        const timerSusbcription = timer(2000).subscribe(() => {
          this.hasError = false;
          timerSusbcription.unsubscribe();
        });
      } else {
        this.formSearch.reset();
      }
    });
    this.subscriptos.add(listenSearchingSubscriptor)
  }

}

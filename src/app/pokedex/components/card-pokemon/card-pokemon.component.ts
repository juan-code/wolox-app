import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, Type, PokemonModel, Ability } from '@pokedex/services';
import { BASE_SPRITE_POKEMON } from '@pokedex/constants';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {

  @Input() pokemon!:Pokemon;
  constructor() { }

  ngOnInit(): void {
  }

  get name():string {
    return this.pokemon?.name || '';
  }

  get id():string | number {
    return this.pokemon?.id || 'no id';
  }

  get sprite():string {
    const id = PokemonModel.buildIdImage(this.pokemon?.id || -1);
    return `${BASE_SPRITE_POKEMON}/${id}.${PokemonModel.extentionSprite}`;
  }

  get height():number {
    return this.pokemon?.height || 0;
  }

  get weight(): number {
    return this.pokemon?.weight || 0;
  }

  get types(): string[] {
    return this.pokemon?.types?.map((type:Type) => type.type.name) || [];
  }

  get abilities(): string[] {
    return this.pokemon?.abilities?.map((ability:Ability) => ability?.ability?.name) || [];
  }
}

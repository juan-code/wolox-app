import { PokemonItem } from "./pokemon.entity";
import { BASE_SPRITE_ANIMATED_POKEMON, BASE_SPRITE_POKEMON, BASE_STANDARD_SPRITE_POKEMON } from '@pokedex/constants';

export class PokemonModel implements PokemonItem {
  public name!: string;
  public url!:  string;
  public id!: number;
  private readonly urlSprite:string = BASE_SPRITE_POKEMON;
  private readonly urlSpriteAnimated:string = BASE_SPRITE_ANIMATED_POKEMON;
  private readonly standarSpriteUrl:string = BASE_STANDARD_SPRITE_POKEMON;
  public static readonly extentionAnimated = 'gif';
  public static readonly extentionSprite: string = 'png';
  constructor(pokemon:PokemonItem) {
    this.name = pokemon.name;
    this.url = pokemon.url;
    this.id = pokemon.id;
  }

  public static buildIdImage(id:number):string {
    if(id < 10) {
      return `00${id}`;
    }
    if(id < 100) {
      return `0${id}`;
    }
    return `${id}`;
  }

  public image():string {
    return `${this.urlSprite}/${PokemonModel.buildIdImage(this.id)}.${PokemonModel.extentionSprite}`;
  }

  public standarImage():string {
    return `${this.standarSpriteUrl}/${this.id}.${PokemonModel.extentionSprite}`;
  }

  public imageAnimated(): string {
    return `${this.urlSpriteAnimated}/${this.name}.${PokemonModel.extentionAnimated}`;
  }
}
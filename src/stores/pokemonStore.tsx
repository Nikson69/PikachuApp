import { observable, action } from 'mobx';
import { pokeFetch } from '../common/fetch';
import { PokemonModel } from '../models/Pokemon';

export interface PokemonStoreModel {
  pokemon: PokemonModel
  loadPokemon(url: string): void;
}

class PokemonStore {

  @observable pokemon: PokemonModel


  @action
  loadPokemon = async (url: string) => {
      await pokeFetch.get(url)
          .then(action((n: PokemonModel) => {
            this.pokemon = n; 
          }));
  }
}

export const pokemonStoreName = "pokemonStore";
export default new PokemonStore();
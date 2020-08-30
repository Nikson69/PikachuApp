import { observable, action } from 'mobx';
import { PokemonType } from '../models/PokemonType';
import { pokeFetch } from '../common/fetch';
import { Type } from '../models/Type';
import { PokemonList } from '../models/PokemonList';

export interface ListsStoreModel {
  listTypes: Type[];
  isLoadingTypes: boolean;
  pokemonList: Type[];
  isLoadingPokemon: boolean;
  loadTypes(): void;
  loadPokemon(url: string, type?: string): void;
  selectedType: string;
  changeTypes(type: string): void;
}

class ListsStore {

  @observable listTypes: Type[] = new Array<Type>();
  @observable isLoadingTypes = true;
  @observable pokemonList: Type[] = new Array<Type>();
  @observable isLoadingPokemon = true;
  @observable selectedType = '';

  @action
  changeTypes = (type: string) => {
    this.selectedType = type;
  }

  @action
  loadTypes = async () => {
      this.isLoadingTypes = true;
      await pokeFetch.get(`https://pokeapi.co/api/v2/type`)
          .then(action((n: PokemonType) => {
              this.listTypes = n.results;
          }))
          .finally(action(() => {
              this.isLoadingTypes = false;
          }));
  }

  @action
  loadPokemon = async (url: string = null, type?: string) => {
      this.isLoadingPokemon = true;
      const currentUrl = url ? url : `https://pokeapi.co/api/v2/type/${type}`  
      await pokeFetch.get(currentUrl)
          .then(action((n: PokemonList) => {
            this.pokemonList = [];
            n.pokemon.length > 0 
              && n.pokemon.forEach(p => this.pokemonList.push(p.pokemon));
          }))
          .finally(action(() => {
              this.isLoadingPokemon = false;
          }));
  }
}

export const listStoreName = "listsStore";
export default new ListsStore();
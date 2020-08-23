import { observable, action } from 'mobx';
import PokemonType from '../models/PokemonType';

class PokemonTypesStore {

  @observable listTypes: PokemonType[] = undefined;
  @observable isLoadingTypes = false;
}

export default new PokemonTypesStore();
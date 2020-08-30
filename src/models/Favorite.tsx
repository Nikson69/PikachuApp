import { PokemonModel } from "./Pokemon";

export interface FavoriteModel { 
    name: string;
    pokemon: PokemonModel;
}
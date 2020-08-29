import { Type } from "./Type";

export interface PokemonList {
    "pokemon": Array<Pokemon>,
}

export interface Pokemon {
    "pokemon": Type,
    "slot": number
}
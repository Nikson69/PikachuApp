import { Type } from "./Type";

export interface PokemonType {
    "count": number,
    "next": string,
    "previous": string,
    "results": Array<Type>
}
import { observable, action } from 'mobx';
import { FavoriteModel } from '../models/Favorite';
import { localStorageGet, localStorageSet } from '../common/localStorageHelper';

export interface FavoritesStoreModel {
    favorite: FavoriteModel[];
    loadFavorites(): void;
    addFavorites(value: FavoriteModel): void;
    deleteFavorites(value: FavoriteModel): void;
    findFavorites(name: string): boolean;
}

class FavoritesStore {
    @observable favorite: FavoriteModel[];

    @action
    loadFavorites(): void {
        const data = localStorageGet<FavoriteModel[]>(POKEMONS);
        if (data && data.length > 0) {
            this.favorite = data;
        } else {
            this.favorite = [];
            localStorageSet(POKEMONS, [])
        }
    }
    @action
    addFavorites(value: FavoriteModel): void {        
            this.favorite.push(value);
            localStorageSet(POKEMONS, this.favorite)
    }

    @action
    deleteFavorites(value: FavoriteModel): void {
        const data = localStorageGet<FavoriteModel[]>(POKEMONS);
        data.splice(data.indexOf(value), 1); 
        this.favorite = data;
        localStorageSet(POKEMONS, data)
    }   

    @action
    findFavorites(name: string): boolean {
        return !!this.favorite.find(n => n.name === name)
    }     
}

const POKEMONS = 'Pokemons';
export const favoritesStoreName = "favoritesStore";
export default new FavoritesStore();
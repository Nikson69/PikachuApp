import { observable, action } from 'mobx';

export interface MenuStoreModel {
    selectedMenu: string[];
    selectMenu(value: string): void;
}

class MenuStore {
    @observable selectedMenu: string[] = [];

    @action
    selectMenu(value: string) {
        this.selectedMenu = [value];
    }    
}

export const LIST = 'list';
export const CARD = 'card';
export const FAVORITE = 'favorite';
export const menuStoreName = "menuStore";
export default new MenuStore();
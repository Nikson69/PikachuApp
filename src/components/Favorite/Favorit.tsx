import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Table } from 'antd';
import { MenuStoreModel, FAVORITE, menuStoreName } from '../../stores/menuStore';
import { favoritesStoreName, FavoritesStoreModel } from '../../stores/favoritesStore';
import { RestOutlined } from '@ant-design/icons';
import { PokemonStoreModel, pokemonStoreName } from '../../stores/pokemonStore';
import { FavoriteModel } from '../../models/Favorite';

interface FavoriteProps extends RouteComponentProps{
    favoritesStore?: FavoritesStoreModel,
    menuStore?: MenuStoreModel,
    pokemonStore?: PokemonStoreModel,
}

@inject(favoritesStoreName, menuStoreName, pokemonStoreName)
@observer
export class FavoriteComponent extends React.Component<FavoriteProps> { 
    get favoritesStore(): FavoritesStoreModel {        
        return this.props.favoritesStore;
    }
    get menuStore(): MenuStoreModel {        
        return this.props.menuStore;
    }   

    get pokemonStore(): PokemonStoreModel {
        return this.props.pokemonStore;
    }

    columns = [
        {
          title: 'Pokemon Name',
          dataIndex: 'name'
        },
        {
            title:"Delete Favorites",
            render:(text, record) => (
                <RestOutlined onClick={() => this.favoritesStore.deleteFavorites(record)} />
            )
        }   
    ];
    constructor(props) {
        super(props);
        this.menuStore.selectMenu(FAVORITE);
    }

    onChangeData(record: FavoriteModel) {
        this.pokemonStore.addPokemon(record.pokemon);
        this.props.history.push('/card');
    }

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.favoritesStore.favorite}
                onRow={(record) => ({
                    onClick: () => {
                        this.onChangeData(record)
                    },
                  })}                
            />
        );
     }
};

export default withRouter(FavoriteComponent);
import * as React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Avatar, Descriptions } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { menuStoreName, MenuStoreModel, CARD } from '../../stores/menuStore';
import { pokemonStoreName, PokemonStoreModel } from '../../stores/pokemonStore';
import { FavoritesStoreModel, favoritesStoreName } from '../../stores/favoritesStore';
import { PokemonModel } from '../../models/Pokemon';
import { toJS } from 'mobx';

interface CardProps {
    pokemonStore?: PokemonStoreModel,
    menuStore?: MenuStoreModel,
    favoritesStore?: FavoritesStoreModel
}

interface CardState {
    isFavorite: boolean
}

@inject(menuStoreName, pokemonStoreName, favoritesStoreName)
@observer
export class CardComponent extends React.Component<CardProps, CardState> {
    get pokemonStore(): PokemonStoreModel {
        return this.props.pokemonStore;
    }

    get favoritesStore(): FavoritesStoreModel {        
        return this.props.favoritesStore;
    }

    get menuStore(): MenuStoreModel {
        return this.props.menuStore;
    }

    constructor(props) {
        super(props);
        this.menuStore.selectMenu(CARD);
        this.state = {
            isFavorite: props.pokemonStore.pokemon && this.favoritesStore.findFavorites(props.pokemonStore.pokemon.name)
        }
    }

    iconText = (pokemon: PokemonModel) => {
        if(this.state.isFavorite) {
            return ( 
                <StarFilled 
                    style={{marginRight:'5%',fontSize:40}}
                    onClick={() => {
                        this.favoritesStore.deleteFavorites({name: pokemon.name, pokemon: pokemon})
                        this.setState({ isFavorite: !this.state.isFavorite })
                    }}
                />
            )
        } else {
            return (
                <StarOutlined 
                    style={{marginRight:'5%',fontSize:40}}
                    onClick={() => {
                        this.favoritesStore.addFavorites({name: pokemon.name, pokemon: pokemon})
                        this.setState({ isFavorite: !this.state.isFavorite })
                    }}
                />
            )
        }
    };
    
    render() {
        const pokemon = this.pokemonStore.pokemon;
        return (
            <React.Fragment>
                {pokemon ?
                <Descriptions 
                    title={
                        <React.Fragment>
                            <Avatar style={{width:80, height: 80, marginLeft:'5%'}} src={pokemon.sprites.other.dream_world.front_default} />
                            <span style={{marginLeft:'1%', fontSize: 30}}>{pokemon.name}</span>
                        </React.Fragment>   
                    } 
                    extra={this.iconText(pokemon)} 
                    bordered
                >
                    <Descriptions.Item label="Height" key={pokemon.height}>{pokemon.height}</Descriptions.Item>
                    <Descriptions.Item label="Weight" key={pokemon.weight}>{pokemon.weight}</Descriptions.Item>
                    <Descriptions.Item label="Species" key={pokemon.species.name}>{pokemon.species.name}</Descriptions.Item>
                    <Descriptions.Item label="Order" key={pokemon.order}>{pokemon.order}</Descriptions.Item>
                    {pokemon.abilities.length > 0 && pokemon.abilities
                        .map(n => <Descriptions.Item label="Ability" key={n.ability.name}>{n.ability.name}</Descriptions.Item>
                    )}
                    {pokemon.forms.length > 0 && pokemon.forms
                        .map(n => <Descriptions.Item label="Form" key={n.name}>{n.name}</Descriptions.Item>)}
                    {pokemon.moves.length > 0 && pokemon.moves
                        .map(n => <Descriptions.Item label="Move" key={n.move.name}>{n.move.name}</Descriptions.Item>)}
                    {pokemon.stats.length > 0 && pokemon.stats
                        .map(n => <Descriptions.Item label="Stat" key={n.stat.name}>{n.stat.name}</Descriptions.Item>)}
                    {pokemon.types.length > 0 && pokemon.types
                        .map(n => <Descriptions.Item label="Type" key={n.type.name}>{n.type.name}</Descriptions.Item>)}
                </Descriptions>
                    : <Redirect to="/list" />
                }
            </React.Fragment>
        );
    }
};

export default withRouter(CardComponent);
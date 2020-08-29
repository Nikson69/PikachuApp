import * as React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Avatar, Descriptions } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { menuStoreName, MenuStoreModel, CARD } from '../../stores/menuStore';
import { pokemonStoreName, PokemonStoreModel } from '../../stores/pokemonStore';

interface CardProps {
    pokemonStore?: PokemonStoreModel,
    menuStore?: MenuStoreModel
}

@inject(menuStoreName, pokemonStoreName)
@observer
export class CardComponent extends React.Component<CardProps> {
    get pokemonStore(): PokemonStoreModel {
        return this.props.pokemonStore;
    }

    get menuStore(): MenuStoreModel {
        return this.props.menuStore;
    }

    constructor(props) {
        super(props);
        this.menuStore.selectMenu(CARD);
    }

    iconText = (name: string) => (
        <span style={{marginRight:'5%'}} onClick={() => console.log('ssssssss')}>
            <StarOutlined style={{fontSize:40}}/>
            <StarFilled style={{fontSize:40}}/>
        </span>
    );
    
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
                    extra={this.iconText(pokemon.name)} 
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
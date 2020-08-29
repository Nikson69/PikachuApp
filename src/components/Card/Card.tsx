import * as React from 'react';
import { withRouter, Switch, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { List, Avatar, Skeleton } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { menuStoreName, MenuStoreModel, CARD } from '../../stores/menuStore';
import { pokemonStoreName, PokemonStoreModel } from '../../stores/pokemonStore';

interface CardProps {
    pokemonStore?: PokemonStoreModel,
    menuStore?: MenuStoreModel
}

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

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

    render() {
        const pokemon = this.pokemonStore.pokemon;
        return (
            <React.Fragment>
                {pokemon ?
                <List
                itemLayout="vertical"
                size="large"
                dataSource={[pokemon]}
                renderItem={pokemon => (
                    <List.Item
                        key={pokemon.id}
                        actions={
                            [
                                <IconText icon={StarOutlined} text="In Favorite" key="list-vertical-star-o" />,
                            ]
                        }
                        extra={
                            (
                                <img
                                    width={272}
                                    alt="logo"
                                    src={pokemon.sprites.front_default}
                                />
                            )
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={pokemon.sprites.other.dream_world.front_default} />}
                            title={<div>{pokemon.name}</div>}
                        />
                        {pokemon.height}
                    </List.Item> )}/>
                    : <Redirect to="/list" />
                }
            </React.Fragment>
        );
    }
};

export default withRouter(CardComponent);
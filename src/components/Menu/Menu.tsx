import './menu.css'
import React from 'react';
import { withRouter, RouteComponentProps  } from "react-router-dom";
import { Menu } from 'antd';
import { UnorderedListOutlined, IdcardOutlined as IdCardOutlined, StarOutlined } from '@ant-design/icons';
import { SelectInfo } from 'rc-menu/lib/interface';
import { inject, observer } from 'mobx-react';
import { menuStoreName, MenuStoreModel } from '../../stores/menuStore';
import { FavoritesStoreModel, favoritesStoreName } from '../../stores/favoritesStore';


interface MenuProps extends RouteComponentProps {
    menuStore?: MenuStoreModel
    favoritesStore?: FavoritesStoreModel
}

@inject(menuStoreName, favoritesStoreName)
@observer
export class MenuComponent extends React.Component<MenuProps> {
    get menuStore(): MenuStoreModel {        
        return this.props.menuStore;
    }

    get favoritesStore(): FavoritesStoreModel {        
        return this.props.favoritesStore;
    }
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.favoritesStore.loadFavorites();
    }

    onSelectHandler(value: SelectInfo) {
        this.props.history.push(`/${value.key}`);
    }

    render() {
        return (
            <div className='navigate-menu'>
                <Menu 
                    mode="horizontal" 
                    selectable
                    onSelect={(value: SelectInfo) => this.onSelectHandler(value)}
                    selectedKeys={this.menuStore.selectedMenu}
                >
                    <Menu.Item key="list" icon={<UnorderedListOutlined />}>
                        List Pokemons
                    </Menu.Item>
                    <Menu.Item key="card" icon={<IdCardOutlined />}>
                        Pokemon Card
                    </Menu.Item>
                    <Menu.Item key="favorite" icon={<StarOutlined />}>
                        Favorite Pokemons
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
};

export default withRouter(MenuComponent);
import './menu.css'
import React from 'react';
import { withRouter, RouteComponentProps  } from "react-router-dom";
import { Menu } from 'antd';
import { UnorderedListOutlined, IdcardOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { SelectInfo } from 'rc-menu/lib/interface';
import { inject, observer } from 'mobx-react';
import { menuStoreName, MenuStoreModel } from '../../stores/menuStore';


interface MenuProps extends RouteComponentProps {
    menuStore?: MenuStoreModel
}

@inject(menuStoreName)
@observer
export class MenuComponent extends React.Component<MenuProps> {
    get menuStore(): MenuStoreModel {        
        return this.props.menuStore;
    }
    
    constructor(props) {
        super(props);
    }

    onSelectHandler(value: SelectInfo) {
        this.props.history.push(`/${value.key}`);
        console.log(value);
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
                    <Menu.Item key="card" icon={<IdcardOutlined />}>
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
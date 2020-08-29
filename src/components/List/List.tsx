import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Spin } from 'antd';
import { MenuStoreModel, LIST, menuStoreName } from '../../stores/menuStore';
import { listStoreName, ListsStoreModel } from '../../stores/listsStore';
import { TableTypeComponent } from './TableType/TableType';
import { TableModel } from '../../models/TableModel';
import { Type } from '../../models/Type';
import { TablePokemonComponent } from './TablePokemon/TablePokemon';
import './style.css';

interface ListProps extends RouteComponentProps {
    menuStore?: MenuStoreModel,
    listsStore?: ListsStoreModel
}

interface ListState {
    type: string
}

@inject(listStoreName, menuStoreName)
@observer
export class ListComponent extends React.Component<ListProps, ListState> {
    get listsStore(): ListsStoreModel {
        return this.props.listsStore;
    }

    get menuStore(): MenuStoreModel {
        return this.props.menuStore;
    }

    constructor(props) {
        super(props);
        this.menuStore.selectMenu(LIST);
        const param = new URLSearchParams(window.location.search);
        const type = param.get('type');   
        this.state = {
            type: type || ''
        }
    }

    async componentDidMount() {
        this.listsStore.listTypes.length === 0 && await this.listsStore.loadTypes()       
        this.state.type && await this.listsStore.loadPokemon(null, this.state.type);
    }

    onChangeTypes = async (record: TableModel) => {
        this.props.history.push({ search: `?type=${record.key}` })
        this.listsStore.loadPokemon(null, record.key);
        this.setState({ type: record.key })
    }

    onChangePokemon = (record: TableModel) => {
        console.log(record)
    }

    getTableData = (value: Type[]): TableModel[] => {
        let result: TableModel[] = new Array<TableModel>();
        value && value.forEach(data => result.push({ key: data.name, name: data.name, url: data.url }))
        return result;
    }

    render() {
        return (
            <Spin
                tip="Loading..."
                spinning={this.listsStore.isLoadingTypes}
                wrapperClassName='spin-list-style'
                className='spin-list-style'
            >
                <TableTypeComponent
                    data={this.getTableData(this.listsStore.listTypes)}
                    onChangeData={this.onChangeTypes}
                    type={this.state.type}
                />
                <TablePokemonComponent
                    data={this.getTableData(this.listsStore.pokemonList)}
                    onChangeData={this.onChangePokemon}
                    type={this.state.type}
                />
            </Spin>
        );
    }
};

export default withRouter(ListComponent);
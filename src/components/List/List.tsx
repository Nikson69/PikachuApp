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
import { pokemonStoreName, PokemonStoreModel } from '../../stores/pokemonStore';

interface ListProps extends RouteComponentProps {
    menuStore?: MenuStoreModel,
    listsStore?: ListsStoreModel,
    pokemonStore?: PokemonStoreModel,
}

@inject(listStoreName, menuStoreName, pokemonStoreName)
@observer
export class ListComponent extends React.Component<ListProps> {
    get listsStore(): ListsStoreModel {
        return this.props.listsStore;
    }

    get pokemonStore(): PokemonStoreModel {
        return this.props.pokemonStore;
    }

    get menuStore(): MenuStoreModel {
        return this.props.menuStore;
    }

    constructor(props) {
        super(props);
        this.menuStore.selectMenu(LIST);
        const param = new URLSearchParams(window.location.search);
        const type = param.get('type'); 
        type && props.listsStore.changeTypes(type);
    }

    async componentDidMount() {
        this.listsStore.listTypes.length === 0 && await this.listsStore.loadTypes()       
        this.listsStore.selectedType && await this.listsStore.loadPokemon(null, this.listsStore.selectedType);
    }

    onChangeTypes = async (record: TableModel) => {
        this.props.history.push({ search: `?type=${record.key}` })
        this.listsStore.loadPokemon(null, record.key);
        this.listsStore.changeTypes(record.key);
    }

    onChangePokemon = async (record: TableModel) => {
        await this.pokemonStore.loadPokemon(record.url);
        this.props.history.push('/card');
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
                spinning={this.listsStore.isLoadingTypes
                    && this.listsStore.isLoadingPokemon}
                wrapperClassName='spin-list-style'
                className='spin-list-style'
            >
                <TableTypeComponent
                    data={this.getTableData(this.listsStore.listTypes)}
                    onChangeData={this.onChangeTypes}
                    type={this.listsStore.selectedType}
                />
                <TablePokemonComponent
                    data={this.getTableData(this.listsStore.pokemonList)}
                    onChangeData={this.onChangePokemon}
                    type={this.listsStore.selectedType}
                />
            </Spin>
        );
    }
};

export default withRouter(ListComponent);
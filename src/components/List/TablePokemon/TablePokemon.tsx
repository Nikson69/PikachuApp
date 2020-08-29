import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Table } from 'antd';
import { TableModel } from '../../../models/TableModel';

interface TableProps {
    data: TableModel[];
    onChangeData(record: TableModel): void;
    type: string;
}

export class TablePokemonComponent extends React.Component<TableProps> {
    columns = [
        {
          title: 'Pokemon Name',
          dataIndex: 'name'
        }
      ];

    constructor(props) {
        super(props);
        console.log('sssssssssssssssss', props.type)
    }

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.props.data}
                onRow={(record) => ({
                    onClick: () => {
                        this.props.onChangeData(record)
                    },
                  })}
            />
        );
     }
};

export default withRouter(TablePokemonComponent);
import * as React from 'react';
import { withRouter } from "react-router-dom";
import { Table } from 'antd';
import { TableModel } from '../../../models/TableModel';
import { useHistory } from "react-router-dom";

interface TableProps {
    data: TableModel[];
    onChangeData(record: TableModel): void;
    type: string;
}

export class TableTypeComponent extends React.Component<TableProps> {
    columns = [
        {
            title: 'Type Name',
            dataIndex: 'name'
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: props.data.length > 0 ? [props.data[0].key] : []
        }
    }
    onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        this.props.onChangeData(selectedRows)
    }

    shouldComponentUpdate(nextProps: TableProps, nextState) {
        if (this.props.data.length === 0 && nextProps.data.length > 0 && !nextProps.type) {
            const value = nextProps.data[0];
            this.props.onChangeData(value);
        }
        return true;
    }

    render() {
        return (
            <Table
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [this.props.type],
                    onChange: this.onSelectedRowKeysChange,
                }}
                columns={this.columns}
                dataSource={this.props.data}
                onRow={(record) => ({
                    onClick: () => {
                        this.props.onChangeData(record);
                    },
                })}
            />
        );
    }
};

export default withRouter(TableTypeComponent);
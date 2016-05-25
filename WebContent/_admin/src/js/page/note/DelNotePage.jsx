/**
 * Created by a1 on 2016/5/5.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import SelectComponent from '../../components/select/js/SelectComponent';
import TableComponent from '../../components/table/js/TableComponent';

export default class DelNotePage extends React.Component {
    constructor(props) {
        super(props);

        const selectData = [
            {"id":"jack", "name":"杰克1"},
            {"id":"lucy", "name":"露西2"},
            {"id":"tom" , "name":"汤姆3"}
        ];

        const tableColumns = [{
            title: '姓名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>
        }, {
            title: '年龄',
            dataIndex: 'age'
        }, {
            title: '住址',
            dataIndex: 'address'
        }];
        const tableData = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园2号'
        }, {
            key: '3',
            name: '李大嘴',
            age: 32,
            address: '西湖区湖底公园3号'
        }];

        this.state = {
            selectData: selectData,
            tableColumns: tableColumns,
            tableData: tableData
        };

        this.selected = this.selected.bind(this);
    }

    selected(v){
        console.info(v);

        this.setState({
            tableData : [{
                key: '11',
                name: '胡彦斌'+v,
                age: 321,
                address: '西湖区湖底公园11号'
            }]
        });
    }


    render() {
        return (
            <div>
                <SelectComponent data={this.state.selectData} selected={this.selected} />
                <TableComponent tableColumns={this.state.tableColumns} tableData={this.state.tableData} />
            </div>
        );
    }
};






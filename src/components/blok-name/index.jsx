import React, { Component } from 'react';
import blokServices from '../../services/blokServices';
import { Table, Button, Modal, message } from 'antd';
import rxEvent from 'pubsub-js';
import EventKeys from '../../common/event-keys';
import UpdataComponent from './updata/index';
import './index.less';


export default class BlokNameComponent extends Component {
    render() {
        return (
            <div>
                <Table bordered dataSource={this.state.typeList} columns={this.state.columns}
                    pagination={false}
                    rowKey="id"
                    loading={this.state.loading} />
                <UpdataComponent
                    typeInfo={this.state.typeInfo}
                    dialogStauts={this.state.dialogStauts}
                    closeDailogEmit={() => { this.setState({ dialogStauts: false }) }}
                    updataDailogEmit={this.handleType}
                />
            </div>
        )
    }
    async componentDidMount() {
        await this.getInit();
        rxEvent.subscribe(EventKeys.REFRESH_TYPENAME, async () => {
            await this.getInit();
        });
    }
    async getInit() {
        const data = await blokServices.getListType();
        if (data) {
            this.setState({
                typeList: [...data]
            })
        }
    }
    handleType = async e => {
        this.setState({dialogStauts: false});
        await this.getInit();
    }
    getColun = (index, item) => {
        return <span>
            <Button type="danger" onClick={this.deleteIndex.bind(index, item)}>删除</Button>
            <Button type="primary" className="right_button" onClick={this.handleUpdate.bind(index, item)}>编辑</Button>
        </span>
    }
    deleteIndex = (e) => {
        Modal.confirm({
            title: '确认删除',
            onOk: async () => {
                const data = await blokServices.deleteTypeNameById(e.id);
                if (data) {
                    message.success('删除成功')
                    await this.getInit();
                }
            },
            onCancel() {
                // todo
            },
        });
    }
    handleUpdate = (e) => {
        this.setState({ typeInfo: e, dialogStauts: true });
    }
    constructor(props) {
        super(props)
        this.state = {
            size: 'large',
            categoryNameList: [],
            bookInfoList: [],
            currentPage: 1,
            currentSize: 4,
            visible: false,
            dialogStauts: false,
            total: 0,
            typeInfo: {},
            columns: [
                { title: '类型', dataIndex: 'titleType' },
                { title: '名称', dataIndex: 'titleName' },
                { title: '添加人', dataIndex: 'createdPerson' },
                { title: '角色', dataIndex: 'roleName' },
                { title: '操作', dataIndex: 'operate', width: 200, render: (item, index) => this.getColun(item, index) },
            ]
        }
    }
}

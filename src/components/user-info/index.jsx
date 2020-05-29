import React, { Component } from 'react'
import { Table, Button, Modal, Pagination, message, Input } from 'antd'
import './index.less'
import loginServices from '../../services/loginServices'
import AddUserComponent from './add-user/index'
import StringName from '../../common/string-name'

const { Search } = Input

export default class UserInfoComponent extends Component {
    render() {
        return (
            <div>
                <div>
                    {/* 操作用户 */}
                    <Button className="button" size="large" type="primary" onClick={() => { this.setState({ dialogStauts: true }) }}>添加</Button>
                    <div className="searchInput">
                        <Search
                            placeholder="input search username"
                            enterButton="模糊查询"
                            size="large"
                            onSearch={this.searchUserInfo}
                        />
                    </div>
                    <AddUserComponent
                        dialogStauts={this.state.dialogStauts}
                        sendEmit={() => { this.setState({ dialogStauts: false }) }}
                        refreshEmit={this.handleRefreshData}
                    />
                    {/* 用户数据 */}
                    <Table bordered row-key="id" dataSource={this.state.typeList} columns={this.state.columns}
                        pagination={false}
                        loading={this.state.loading} />
                    <div className="page_size">
                        <Pagination
                            total={this.state.total}
                            showTotal={total => `总数 ${total} 条`}
                            pageSize={this.state.currentSize}
                            defaultCurrent={1}
                            showSizeChanger
                            onChange={this.onShowPageChange}
                            onShowSizeChange={this.onShowSizeChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            currentPage: 1,
            currentSize: 10,
            typeList: [],
            columns: [
                { title: '姓名', dataIndex: 'username' },
                { title: '角色', dataIndex: 'roleId' },
                { title: '邮箱', dataIndex: 'email' },
                { title: '电话', dataIndex: 'phone' },
                { title: '手机类型', dataIndex: 'phoneModel' },
                { title: '操作', dataIndex: 'operate', width: 200, render: (item, index) => this.getColoum(item, index) },
            ],
            dialogStauts: false
        }
    }
    async componentDidMount() {
        await this.getInit(this.state.currentPage, this.state.currentSize);
    }
    async getInit(page, size) {
        let data = await loginServices.getUserInfoListByPageAndSize(page, size);
        if (data) {
            this.setState({
                typeList: [...data.list],
                total: data.total
            })
        }
    }
    getColoum = (item, index) => {
        return <span>
            <Button type="primary" onClick={this.openModal.bind(item, index)}>编辑</Button>
            <Button type="danger" className="button_delete" onClick={this.deleteUserInfo.bind(item, index)}>删除</Button>
        </span>
    }
    deleteUserInfo = (item, index) => {
        // 自己不能删除自己
        let userInfo = JSON.parse(localStorage.getItem(StringName.USERINFO))
        if (userInfo._id === item._id) {
            return message.warning('删除失败')
        }
        Modal.confirm({
            title: '确认删除',
            onOk: async () => {
                const result = await loginServices.deleteUserInfoById(item._id);
                if (result) {
                    message.success('删除成功');
                    await this.getInit(this.state.currentPage, this.state.currentSize);
                }
            },
            onCancel() {
                // todo
            },
        });
    }
    openModal = (item, index) => {
        console.log(item);
    }
    onShowSizeChange = async (current, pageSize) => {
        this.setState({ currentSize: pageSize })
        await this.getInit(current, pageSize);
    }
    onShowPageChange = async (current, pageSize) => {
        await this.getInit(current, pageSize);
    }
    handleRefreshData = async () => {
        this.setState({ dialogStauts: false });
        await this.getInit(this.state.currentPage, this.state.currentSize);
    }
    /**
     * 模糊查询
     */
    searchUserInfo = async (value) => {
        if (!value.trim()) {
            message.warning('参数不能为空')
            await this.getInit(this.state.currentPage, this.state.currentSize)
        } else {
            let data = await loginServices.findUserInfoByUsername(value)
            this.setState({ typeList: [...data] });
        }
    }
}

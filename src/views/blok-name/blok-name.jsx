import React, { Component } from 'react';
import BlokNameComponent from '../../components/blok-name';
import { Button, Modal, Input, Select, Form, message } from 'antd';
import blokServices from '../../services/blokServices';
import { connect } from 'react-redux';
import { TitleInfo } from '../../models/title-info';
import rxevent from 'pubsub-js';
import EventKeys from '../../common/event-keys';
import './index.less';

const { Option } = Select;
const typeName = ['前端开发', '后端开发'];


class BlokName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }
    OpenDialog = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = async () => {
        this.handleSubmit();
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        })
    }

    renderOption = () => {
        return typeName.map((e) => {
            return <Option key={e} value={e}>{e}</Option>
        })
    }
    handleSubmit = e => {
        // e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 组装数据
                const titleInfo = new TitleInfo();
                titleInfo.createdPerId = this.props.userInfo.id;
                titleInfo.createdPerson = this.props.userInfo.userName;
                titleInfo.createdRoleId = this.props.userInfo.roleId;
                titleInfo.titleName = values.titleName;
                titleInfo.titleType = values.titleType;
                const data = await blokServices.addTypeTitleName(titleInfo);
                if (data) {
                    this.setState({
                        visible: false,
                    });
                    message.success('添加成功')
                    this.props.form.resetFields();
                    rxevent.publish(EventKeys.REFRESH_TYPENAME, true);
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.OpenDialog}>添加</Button>
                </div>
                <div className="table">
                    <BlokNameComponent  refreshData={this.state.refresh}/>
                </div>
                {/* 弹窗添加名称 */}
                <Modal
                    title="添加类型"
                    closable={false}
                    cancelText={'取消'}
                    okText={'确认'}
                    maskClosable={false}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="类型">
                            {getFieldDecorator('titleType', {
                                rules: [{ required: true, message: '请选择类型' }],
                            })(
                                <Select
                                    placeholder="请选择类型"
                                    onChange={this.handleSelectChange}
                                >
                                    {this.renderOption(typeName)}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="名称">
                            {getFieldDecorator('titleName', {
                                rules: [{ required: true, message: '请输入名称' }],
                            })(<Input placeholder="请输入名称" />)}
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }

}

export default connect(state => ({

    userInfo: state.saveUserInfo
}), {})(Form.create()(BlokName))

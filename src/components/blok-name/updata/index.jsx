import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal,Input, message } from 'antd'
import blokServices from '../../../services/blokServices';

class UpdataComponent extends Component {
  static propTypes = {
    typeInfo: PropTypes.object.isRequired,
    updataDailogEmit: PropTypes.func.isRequired,
    closeDailogEmit: PropTypes.func.isRequired,
  }

  render() {
    const { typeInfo, dialogStauts } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        {/* {typeInfo.id} */}
        <Modal
          title="修改类型名称"
          cancelText={'取消'}
          okText={'确认'}
          visible={dialogStauts}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="类型">
              {getFieldDecorator('titleType', {
                initialValue: typeInfo.titleType
              })(
                <Input disabled />
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('titleName', {
                rules: [{ required: true, message: '不能为空' }],
                initialValue: typeInfo.titleName
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  handleOk = (e) => {
    const { typeInfo } = this.props
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let obj = {...typeInfo, ...values};
        console.log(obj);
        let data = await blokServices.updateTypeInfo(typeInfo.id, obj);
        console.log(data);
        if(data) {
          message.success('更新成功');
          // 通知父组件刷新
          this.props.updataDailogEmit(true);
        }
      }
    });
  }
  handleCancel = e=>{
    this.props.closeDailogEmit(true);
  }
}
export default Form.create()(UpdataComponent)
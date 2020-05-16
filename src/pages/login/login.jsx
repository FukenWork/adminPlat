import React, { Component } from 'react';
import './login.less'
import { Form, Icon, Input, Button, Checkbox, message} from 'antd';
import { handleSaveUserInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import loginServices from '../../services/loginServices';


class login extends Component {
    render() {
        // 校验函数对象 ---- 组件是一个函数类型
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login_container">
                <div className="loginForm">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字，下划线组成' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                           </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    // 函数逻辑处理方式
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // 取出提交数据
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let data = await loginServices.loginByUserNameAndPassword(values.username, values.password);
                // console.log(data);
                if (data || data !== undefined) {
                    localStorage.setItem('userInfo', JSON.stringify(data.userEntity));
                    // 路由跳转
                    this.props.handleSaveUserInfo(data.userEntity);
                    this.props.history.replace('/userInfo');
                    message.success(data.message);
                } else {
                    message.error('用户不存在');
                    return
                }
            }
        });
    }
}

// 高阶函数的返回体(包装Form组件为新的实例组件)

export default connect(state => ({}),
    { handleSaveUserInfo }

)(Form.create()(login))

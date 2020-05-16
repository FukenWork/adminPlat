import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SideMenu from '../../components/sider-component/index';
import './admin.less';
import { Layout, Icon, message } from 'antd';
import HeaderComponent from '../../components/header-component/header-component';
import HomeComponent from '../../components/home-content/home-content';
import { handleSaveUserInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import rxevent from 'pubsub-js';
import EventKeys from '../../common/event-keys';


const { Header, Sider, Content } = Layout;

class admin extends Component {
    render() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.props.handleSaveUserInfo(userInfo)
        if (!userInfo || userInfo === 'undefined') {
            return <Redirect to="/login" />
        } else {
        }
        return (
            <div>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <SideMenu path={this.props} />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <div className="header-top">
                                <div>
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <div className="header_component">
                                    <HeaderComponent />
                                </div>
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: '85vh'
                            }}
                        >
                            <HomeComponent />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
    // 逻辑处理地方
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    componentDidMount() {
        rxevent.subscribe(EventKeys.SERVICES_PARAMS, () => {
            message.error('参数错误')
        });
        rxevent.subscribe(EventKeys.SERVICES_ERROR, () => {
            message.error('服务器错误')
        })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
}
export default connect(state => ({}), { handleSaveUserInfo })(admin)
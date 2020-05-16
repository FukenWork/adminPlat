import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import SubMenu from 'antd/lib/menu/SubMenu';
import { headTitleHandle } from '../../redux/actions';
import { connect } from 'react-redux';
import './index.less';

class SideMenu extends Component {
    render() {
        return (
            <div>
                <div className="logo" >
                    BlokAdmin
                </div>
                {this.rendeMenu(menuList)}
            </div>
        )
    }

    // 逻辑处理地-shichaoxin
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    rendeMenu = (menuList) => {
        const pathName = this.props.path.location.pathname;
        return <Menu theme="dark" mode="inline" selectedKeys={[pathName]}>
            {this.createdMenu(menuList)}
        </Menu>
    }
    createdMenu = (menuList) => {
        const pathName = this.props.path.location.pathname;
        return menuList.map((item, index) => {
            // 判断是否存在子路由，并且进行渲染
            if (item.children) {
                return <SubMenu key={item.path}
                    title={
                        <span>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </span>
                    }>
                    {this.createdMenu(item.children)}
                </SubMenu>
            } else {
                if (item.path === pathName || pathName.indexOf(item.path) === 0) {
                    this.props.headTitleHandle(item.title)
                }
                return <MenuItem key={item.path}>
                    <Link to={item.path} onClick={() => {
                        this.props.headTitleHandle(item.title)
                    }}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </MenuItem>
            }

        });
    }
}

export default connect(
    state => ({}), // 控制的总状态 headerTitle,userInfo
    { headTitleHandle }
)(withRouter(SideMenu));
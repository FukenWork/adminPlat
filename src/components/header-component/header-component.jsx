import React from 'react';
import timeFormat from '../../utils/time-format';
import './index.less';
import { connect } from 'react-redux';

class HeaderComponent extends React.Component {
    render() {
        const title = this.props.headerTitle;
        return (
            <div>
                <div className="header-context">
                    <div className="title_name">{title}</div>
                    <div className="header_time">
                        {this.state.currentTime}
                    </div>
                </div>
            </div>
        )
    }
    // 逻辑交互-shichaoxin
    constructor(props) {
        super(props)
        this.state = {
            currentTime: timeFormat.getCurrentTime()
        }
    }
    // 生命周期
    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: timeFormat.getCurrentTime()
            })
        }, 1000)
    }
}
// 获取属性
export default connect(state => ({
    headerTitle: state.saveTitleName
}))(HeaderComponent)
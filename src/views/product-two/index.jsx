import React, { Component } from 'react';
import blokServices from '../../services/blokServices';
import { connect } from 'react-redux'


class ProductTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            currentSize: 5,
            list: []
        }
    }
    componentDidMount() {
        this.getInit(this.state.currentPage, this.state.currentSize);
    }
    async getInit(page, size) {
        let data = await blokServices.getArticleByTypeId(this.props.headerTitle, page, size);
        console.log(data);
        this.setState({list: [...data.list]});
        console.log(this.state.list)
    }
    render() {
        return (
            <div>
                <div>
                    aaa
                </div>
            </div>
        )
    }

}
const mapToStateProp = state => ({
    headerTitle: state.saveTitleName
});

export default connect(mapToStateProp, {})(ProductTwo)

import React, { Component } from 'react'
import blokServices from '../../services/blokServices';
import { connect } from 'react-redux';

class BlokContant extends Component {
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
    this.setState({ list: [...data.list] });
    console.log(this.state.list)
  }
  handleList = (list) => {
    return list.map((ele, index) => {
      return <div key={index}>
        名称{ele.articleName}
        描述{ele.desc}
        时间{ele.cTime}
        子类型{ele.subTypeId}
        星星数{ele.stars}
        
      </div>
    })
  }
  render() {
    return (
      <div>
        <div>
          {this.handleList(this.state.list)}
        </div>
      </div>
    )
  }
}


const mapToStateProp = state => ({
  headerTitle: state.saveTitleName
});

export default connect(mapToStateProp, {})(BlokContant)

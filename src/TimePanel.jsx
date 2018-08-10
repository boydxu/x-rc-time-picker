import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeSelect from './TimeSelect'
import classnames from 'classnames'
import moment from 'moment'


export class TimePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: moment(),
      endTime: moment()
    }
  }
  static propTypes = {

  }
  onOk = () => {
    console.log(this.state.startTime.format('HH:mm:ss'), this.state.endTime.format('HH:mm:ss'));
    // this.props.onOk()
  }
  onChangeStartTime = (startTime) => {
    this.setState({ startTime })
  }
  onChangeEndTime = (endTime) => {
    this.setState({ endTime })
  }
  render() {
    let { multiple, destroyPopupOnHide, style, popupStyle, getPopupContainer, placement, prefixCls } = this.props
    const { startTime, endTime } = this.state
    return (
      <div className={`${prefixCls}-dropdown`}>
        <TimeSelect
          autoFocus
          prefixCls={prefixCls}
          onOk={this.onOk}
          onChange={this.onChangeStartTime}
          value={startTime}
        />
        <div className={classnames(`${prefixCls}-select-col`, 'ware')}>~</div>
        <TimeSelect
          prefixCls={prefixCls}
          onOk={this.onOk}
          onChange={this.onChangeEndTime}
          value={endTime}
        />
        <button className={`${prefixCls}-ok-btn`} onClick={this.onOk}>确定</button>
      </div>
    )
  }
}

export default TimePanel

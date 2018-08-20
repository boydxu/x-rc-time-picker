import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeSelect from './TimeSelect';
import classnames from 'classnames';
import moment from 'moment';


export class TimePanel extends Component {
  static propTypes = {
    range: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    multiple: PropTypes.bool,

  }
  constructor(props) {
    super(props);
    if (props.initValue) {
      if (props.range) {
        this.state = props.initValue;
      } else {
        this.state = {
          startTime: props.initValue,
          endTime: null
        };
      }
    } else {
      this.state = {
        startTime: moment(),
        endTime: props.range ? moment() : null
      };
    }
  }
  onOk = () => {
    const { range } = this.props;
    if (range) {
      this.props.onOk(this.state.startTime, this.state.endTime);
    } else {
      this.props.onOk(this.state.startTime);
    }
  }
  onChangeStartTime = (startTime) => {
    this.setState({ startTime });
  }
  onChangeEndTime = (endTime) => {
    this.setState({ endTime });
  }
  render() {
    const { multiple, destroyPopupOnHide, style, popupStyle, getPopupContainer, placement, prefixCls, range } = this.props;
    const { startTime, endTime } = this.state;    
    return (
      <div className={`${prefixCls}-dropdown`}>
        <TimeSelect
          autoFocus
          prefixCls={prefixCls}
          onOk={this.onOk}
          onCancel={this.props.onCancel}
          onChange={this.onChangeStartTime}
          value={startTime}
        />
        {
          range &&
          <div className={classnames(`${prefixCls}-select-col`, 'ware')}>~</div>
        }
        {
          range &&
          <TimeSelect
            prefixCls={prefixCls}
            onOk={this.onOk}
            onCancel={this.props.onCancel}
            onChange={this.onChangeEndTime}
            value={endTime}
          />}
        <button className={`${prefixCls}-ok-btn`} onClick={this.onOk}>确定</button>
      </div>
    );
  }
}

export default TimePanel;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import placements from './placements';
import Input from './Input';
import TimePanel from './TimePanel';

const noop = () => { };


export default class Picker extends Component {
  static propTypes = {
    destroyPopupOnHide: PropTypes.bool,
    range: PropTypes.bool
  }
  static defaultProps = {
    destroyPopupOnHide: true,
    onOpen: noop,
    onClose: noop,
    placement: 'bottomLeft',
    prefixCls: 'x-rc-time-picker',
    multiple: true,
    range: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      value: null
    };
  }
  // onVisibleChange = (popupVisible) => {
  //   this.setPopupVisible(popupVisible);
  // }
  componentPropsWillReceive(nextProps, nextState) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }
  setPopupVisible = (popupVisible) => {
    const { onOpen, onClose } = this.props;
    if (this.state.popupVisible !== popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({ popupVisible });
      }
      if (popupVisible) {
        onOpen(popupVisible);
      } else {
        onClose(popupVisible);
      }
    }
  }
  onCancel = () => {
    this.setPopupVisible(false);
  }
  onOk = (startTime, endTime) => {
    if ('onOk' in this.props) {
      if (this.props.range) {
        this.props.onChange({ startTime, endTime });
        // TODO: multiple
      } else {
        // TODO: multiple
        this.props.onChange(startTime);
      }
    } else {
      if (this.props.range) {
        // TODO: multiple
        this.setState({ value: { startTime, endTime } });
      } else {
        // TODO: multiple
        this.setState({ value: startTime });
      }
    }
  }
  render() {
    const { popupVisible, value } = this.state;
    let { multiple, destroyPopupOnHide, style, popupStyle, getPopupContainer, placement, prefixCls, range } = this.props;

    return (
      <Trigger
        popupVisible={popupVisible}
        ref={ref => { this.trigger = ref; }}
        action={['click']}
        popup={<TimePanel prefixCls={prefixCls} onCancel={this.onCancel} range={range} onOk={this.onOk} />}
        builtinPlacements={placements}
        popupPlacement={placement}
        destroyPopupOnHide={destroyPopupOnHide}
        onPopupVisibleChange={this.setPopupVisible}
        getPopupContainer={getPopupContainer}
      >
        <span className={prefixCls} style={style}>
          <Input prefixCls={prefixCls} multiple={multiple} value={value} formatStr='HH:mm:ss' />
        </span>
      </Trigger>
    );
  }
}

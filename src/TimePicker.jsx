import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import placements from './placements';
import Input from './Input';
import TimePanel from './TimePanel';
import moment from 'moment';
const noop = () => { };
const PropTypesTimeRange = PropTypes.shape({
  startTime: PropTypes.instanceOf(moment),
  endTime: PropTypes.instanceOf(moment),
});

export default class Picker extends Component {
  static propTypes = {
    destroyPopupOnHide: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    placement: PropTypes.string,
    prefixCls: PropTypes.string,
    multiple: PropTypes.bool,
    range: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType(
      [
        PropTypes.instanceOf(moment), // range: false, multiple: false
        PropTypes.arrayOf(PropTypes.instanceOf(moment)), // range: false, multiple: true
        PropTypesTimeRange, // range: true, multiple: false
        PropTypes.arrayOf(PropTypesTimeRange), // range: true, multiple: true
      ]
    )
  }
  static defaultProps = {
    destroyPopupOnHide: true,
    onOpen: noop,
    onClose: noop,
    onChange: noop,
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
        onOpen();
      } else {
        onClose();
      }
    }
  }
  onCancel = () => {
    this.setPopupVisible(false);
  }
  onOk = (startTime, endTime) => {
    if ('value' in this.props) {
      if (this.props.range) {
        if (this.porps.multiple) {
          let value = this.props.value || [];
          value.push({ startTime, endTime });
          this.props.onChange(value);
        } else {
          this.props.onChange({ startTime, endTime });
        }
      } else {
        if (this.porps.multiple) {
          let value = this.props.value || [];
          value.push(startTime);
          this.props.onChange(value);
        } else {
          this.props.onChange(startTime);
        }
      }
    } else {
      if (this.props.range) {
        if (this.props.multiple) {
          let value = this.state.value || [];
          value.push({ startTime, endTime });
          this.setState({ value });
        } else {
          this.setState({ value: { startTime, endTime } });
        }
      } else {
        if (this.props.multiple) {
          let value = this.state.value || [];
          value.push(startTime);
          this.setState({ value });
        } else {
          this.setState({ value: startTime });
        }
      }
    }
    this.setPopupVisible(false);
  }
  render() {
    const { popupVisible, value } = this.state;
    const { multiple, destroyPopupOnHide, style, popupStyle, getPopupContainer, placement, prefixCls, range } = this.props;
    let initValue;
    
    if (!multiple && value) {      
      initValue = range ? { startTime: moment(value.startTime), endTime: moment(value.endTime) } : moment(value);
    }
    return (
      <Trigger
        popupVisible={popupVisible}
        ref={ref => { this.trigger = ref; }}
        action={['click']}
        popup={<TimePanel prefixCls={prefixCls} onCancel={this.onCancel} range={range} initValue={initValue} onOk={this.onOk} />}
        builtinPlacements={placements}
        popupPlacement={placement}
        destroyPopupOnHide={destroyPopupOnHide}
        onPopupVisibleChange={this.setPopupVisible}
        getPopupContainer={getPopupContainer}
      >
        <span className={prefixCls} style={style}>
          <Input prefixCls={prefixCls} multiple={multiple} range={range} value={value} formatStr='HH:mm:ss' />
        </span>
      </Trigger>
    );
  }
}

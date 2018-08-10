import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import placements from './placements';
import moment from 'moment';
import Input from './Input'
import TimePanel from './TimePanel'

const noop = () => {}


export default class Picker extends Component {
  static propTypes = {
    destroyPopupOnHide: PropTypes.bool,
  }
  static defaultProps = {
    destroyPopupOnHide: true,
    onOpen: noop,
    onClose: noop,
    placement: 'bottomLeft',
    prefixCls: 'x-rc-time-picker',
    multiple: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      popupVisible: false
    }
  }
  onVisibleChange = (popupVisible) => {
    this.setPopupVisible(popupVisible);
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

  render() {
    const { popupVisible, value } = this.state
    let { multiple, destroyPopupOnHide, style, popupStyle, getPopupContainer, placement, prefixCls } = this.props
    // console.log(placements);

    return (
      <Trigger
        popupVisible={popupVisible}
        ref={ref => { this.trigger = ref }}
        // prefixCls='time-select'
        // popupTransitionName='slide-up'
        action={['click']}
        popup={<TimePanel prefixCls={prefixCls}/>}
        builtinPlacements={placements}
        popupPlacement={placement}
        destroyPopupOnHide={destroyPopupOnHide}
        onPopupVisibleChange={this.onVisibleChange}
        getPopupContainer={getPopupContainer}
      >
        <span className={prefixCls} style={style}>
          <Input prefixCls={prefixCls} multiple={multiple} />
        </span>
      </Trigger>
    )
  }
}
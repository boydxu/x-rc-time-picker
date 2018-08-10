import React, { Component } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import moment from 'moment'

const noop = () => { }
export class TimeSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object.isRequired,
    onOk: PropTypes.func,
  }
  static defaultProps = {
    onChange: noop,
    onOk: noop
  }
  constructor(props) {
    super(props)
    this.throttledMouseMove = utils.throttle(this.throttledMouseMove, 50, 50)
  }
  calcModNum = (num, span, max) => {
    if (typeof max === 'string') {
      switch (max) {
        case 'hour':
          max = 24
          break
        case 'minute':
          max = 60
          break
        case 'second':
          max = 60
          break
        default:
          return
      }
    }
    let res = num + span
    if (res < 0) {
      res += max
    }
    return res % max
  }
  throttledMouseMove = (e, key) => {
    let time = moment(this.props.value)
    let num = time[key]()
    if (e.deltaY < 0) {
      time[key](this.calcModNum(num, -1, key))
    }
    if (e.deltaY > 0) {
      time[key](this.calcModNum(num, 1, key))
    }
    this.onValueChange(time)
  }
  onMouseWheel = (e, key) => {
    e.persist()
    e.preventDefault()
    this.throttledMouseMove(e, key)
  }
  onClickNum = (value, key) => {
    let time = moment(this.props.value)
    time[key](value)
    this.onValueChange(time)
  }
  onChangeNum = (e, key) => {
    let reg = /^[0-9]\d*$/
    if (reg.test(e.target.value) || e.target.value === '') {
      if (key === 'hour' && e.target.value > 23) {
        return
      }
      if ((key === 'minute' || key === 'second') && e.target.value > 60) {
        return
      }
      let time = moment(this.props.value)
      time[key](e.target.value)
      this.onValueChange(time)
    }
  }
  decrement = (key) => {
    let time = moment(this.props.value)
    time[key](this.calcModNum(time[key](), -1, key))
    this.onValueChange(time)
  }
  increment = (key) => {
    let time = moment(this.props.value)
    time[key](this.calcModNum(time[key](), 1, key))
    this.onValueChange(time)
  }
  onValueChange = (time) => {
    this.props.onChange(time)
  }
  onKeyDown = (e, key) => {
    if (e.key === 'Enter') {
      this.props.onOk()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.decrement(key)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.increment(key)
    }
  }
  render() {
    let { multiple, autoFocus } = this.props
    const time = this.props.value
    const hour = time.hour()
    const minute = time.minute()
    const second = time.second()
    return (
      <div className='x-rc-time-picker-select-col'>
        <ul onWheel={(e) => { this.onMouseWheel(e, 'hour') }}>
          <li onClick={() => this.decrement('hour')} >
            <span className='up-arrow'></span>
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(hour, -2, 24), 'hour')}>
            {this.calcModNum(hour, -2, 24)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(hour, -1, 24), 'hour')}>
            {this.calcModNum(hour, -1, 24)}
          </li>
          <li>
            <input
              maxLength='2'
              autoFocus={autoFocus}
              value={hour}
              onChange={(e) => { this.onChangeNum(e, 'hour') }}
              onKeyDown={(e) => this.onKeyDown(e, 'hour')}
            />
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(hour, 1, 24), 'hour')}>
            {this.calcModNum(hour, 1, 24)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(hour, 2, 24), 'hour')}>
            {this.calcModNum(hour, 2, 24)}
          </li>
          <li onClick={() => this.increment('hour')}>
            <span className='down-arrow'></span>
          </li>
        </ul>
        <ul className='colon'>
          :
        </ul>
        <ul onWheel={(e) => { this.onMouseWheel(e, 'minute') }}>
          <li onClick={() => this.decrement('minute')}>
            <span className='up-arrow'></span>
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(minute, -2, 60), 'minute')}>
            {this.calcModNum(minute, -2, 60)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(minute, -1, 60), 'minute')}>
            {this.calcModNum(minute, -1, 60)}
          </li>
          <li>
            <input
              maxLength='2'
              value={minute}
              onChange={(e) => { this.onChangeNum(e, 'minute') }}
              onKeyDown={(e) => this.onKeyDown(e, 'minute')}
            />
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(minute, 1, 60), 'minute')}>
            {this.calcModNum(minute, 1, 60)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(minute, 2, 60), 'minute')}>
            {this.calcModNum(minute, 2, 60)}
          </li>
          <li onClick={() => this.increment('minute')}>
            <span className='down-arrow'></span>
          </li>
        </ul>
        <ul className='colon'>
          :
        </ul>
        <ul onWheel={(e) => { this.onMouseWheel(e, 'second') }}>
          <li onClick={() => this.decrement('second')}>
            <span className='up-arrow'></span>
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(second, -2, 60), 'second')}>
            {this.calcModNum(second, -2, 60)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(second, -1, 60), 'second')}>
            {this.calcModNum(second, -1, 60)}
          </li>
          <li>
            <input
              maxLength='2'
              value={second}
              onChange={(e) => { this.onChangeNum(e, 'second') }}
              onKeyDown={(e) => this.onKeyDown(e, 'second')}
            />
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(second, 1, 60), 'second')}>
            {this.calcModNum(second, 1, 60)}
          </li>
          <li onClick={() => this.onClickNum(this.calcModNum(second, 2, 60), 'second')}>
            {this.calcModNum(second, 2, 60)}
          </li>
          <li onClick={() => this.increment('second')}>
            <span className='down-arrow'></span>
          </li>
        </ul>
      </div>
    )
  }
}

export default TimeSelect

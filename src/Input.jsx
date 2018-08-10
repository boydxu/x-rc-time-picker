import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export class Input extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    multiple: PropTypes.bool
  }
  static defaultProps = {
    value: [1,2,3],
  }
  render() {
    const { multiple, value, prefixCls } = this.props
    // if (multiple) {
    //   return (
    //     <div className='input'>
    //       {
    //         value && value.map &&
    //         value.map(t => {
    //           return <span>{t.format('HH:mm:ss')}</span>
    //         })
    //       }
    //     </div>
    //   )
    // }
    return (
      <div className={classnames(`${prefixCls}-selection`, multiple ? `${prefixCls}-selection-multiple` : `${prefixCls}-selection-single`)}
      >
        <div className={`${prefixCls}-selection__rendered`}>
          {
            multiple && value && value.map && value.map(t=>{
              return <span>value</span>
            })
          }
          {
            !multiple && value && value.format && value.format('HH:mm:ss')
          }
        </div>
      </div>
    )
  }
}

export default Input

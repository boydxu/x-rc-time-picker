import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Input extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    multiple: PropTypes.bool,
    prefixCls: PropTypes.string,
    formatStr: PropTypes.string,
  }
  static defaultProps = {
    value: [1, 2, 3],
  }
  render() {
    const { multiple, value, prefixCls, formatStr } = this.props;

    return (
      <div className={classnames(
        `${prefixCls}-selection`,
        multiple ? `${prefixCls}-selection-multiple` : `${prefixCls}-selection-single`
      )}
      >
        <div className={`${prefixCls}-selection__rendered`}>
          {
            multiple && value &&
            (
              <span>
                {
                  value.hasOwnProperty('startTime') ?
                    `${value.startTime.format(formatStr)}~${value.endTime.format(formatStr)}` :
                    value.format(formatStr)
                }
              </span>
            )
          }
          {
            multiple && value && value.map && value.map(time => {
              return (
                <span>
                  {
                    time.hasOwnProperty('startTime') ?
                      `${time.startTime.fromat(formatStr)}~${time.endTime.format(formatStr)}` :
                      time.format(formatStr)
                  }
                </span>
              );
            })
          }
          {
            !multiple && value && value.format && value.format(formatStr)
          }
        </div>
      </div>
    );
  }
}

export default Input;

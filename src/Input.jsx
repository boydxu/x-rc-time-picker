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
  // static defaultProps = {
  //   value: [1, 2, 3],
  // }
  renderTimeTag = (value) => {
    const { formatStr, range } = this.props;
    if (range) {
      return value.map(v =>
        <span key={v}>
          {`${v.startTime.format(formatStr)}~${v.endTime.format(formatStr)}`}
        </span>
      );
    } else {
      return value.map(v =>
        <span key={v}>
          {`${v.format(formatStr)}`}
        </span>
      );
    }
  }
  renderTimeStr = (value) => {
    const { formatStr, range } = this.props;
    if (range) {
      return (
        <span>
          {`${value.startTime.format(formatStr)}~${value.endTime.format(formatStr)}`}
        </span>
      );
    } else {
      return (
        <span>
          {`${value.format(formatStr)}`}
        </span>
      );
    }
  }
  render() {
    const { multiple, value, prefixCls, formatStr, range } = this.props;
    return (
      <div className={classnames(
        `${prefixCls}-selection`, multiple ? `${prefixCls}-selection-multiple` : `${prefixCls}-selection-single`
      )}>
        <div className={`${prefixCls}-selection__rendered`}>
          {
            multiple && value && this.renderTimeTag(value)
          }
          {
            !multiple && value && this.renderTimeStr(value)
          }
        </div>
      </div>
    );
  }
}

export default Input;

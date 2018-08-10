import TimePicker from 'rc-time-picker';
import React from 'react';
import ReactDom from 'react-dom';
import 'rc-time-picker/assets/index.less';

const TimePickerRange = TimePicker.TimePickerRange

ReactDom.render(
  <TimePicker style={{ margin: 100}}/>,
  document.getElementById('__react-content')
);

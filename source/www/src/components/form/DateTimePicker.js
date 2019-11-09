// @flow

import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

type Props = { onChange: (value: date) => void };
type State = {
  date: ?Date,
};

class Picker extends Component<Props, State> {
  state = {
    date: new Date(),
  };

  onChange = date => {
    this.setState({ date }, () => {
      this.props.onChange(date);
    });
  };

  render() {
    return (
      <DateTimePicker
        onChange={this.onChange}
        value={this.state.date}
      />
    );
  }
}

export default Picker;

// @flow
import React, { Component } from 'react';
import RadioForm from 'equivalen-simple-radio-button';
import Colors from '../../utils/colors';

type Value = string | number;
export type Radio = {
  label: string,
  value: Value,
};
type Props = {
  options: Array<Radio>,
  initialValue: Value,
  onChange?: (value: Value) => void,
};
type State = { selectedValue: ?Value };

export class RadioGroup extends Component<Props, State> {
  state = {
    selectedValue: null,
  };

  _onChangeRadio = (value: Value) => {
    this.setState({ selectedValue: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    return (
      <RadioForm
        radio_props={this.props.options}
        initial={this.props.initialValue}
        animation
        formHorizontal
        buttonColor={Colors.primary}
        selectedButtonColor={Colors.primary}
        onPress={this._onChangeRadio}
      />
    );
  }
}

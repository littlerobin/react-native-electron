//@flow

import React, { Component } from 'react';
import { Checkbox } from '../form';
import Colors from '../../utils/colors';

type Props = { onClick?: (checked: boolean) => void };
type State = { state: boolean };

const styles = {
  checkbox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
};

class CheckAllStudent extends Component<Props, State> {
  state = {
    checked: false,
  };

  onChecked = () => {
    const currentCheck = !this.state.checked;
    this.setState({ checked: currentCheck });

    this.props.onClick && this.props.onClick(currentCheck);
  };

  render() {
    return (
      <Checkbox
        rightText="PILIH SEMUA"
        isChecked={this.state.checked}
        checkBoxColor={Colors.red}
        uncheckedCheckBoxColor={Colors.red}
        rightTextStyle={{ color: Colors.red, fontStyle: 'italic', fontWeight: 'bold' }}
        onClick={this.onChecked}
        style={styles.checkbox}
      />
    );
  }
}

export default CheckAllStudent;

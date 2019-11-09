// @flow

import React, { Component } from 'react';
import { Checkbox } from '../form';
import Colors from '../../utils/colors';

type Props = {
  fullName: string,
  checked?: boolean,
  onClick: Function,
};
const styles = {
  checkbox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  text: { color: Colors.primary },
};

class ShareArchiveView extends Component<Props> {
  render() {
    const { fullName, checked, onClick } = this.props;

    return (
      <Checkbox
        rightText={fullName}
        isChecked={checked}
        checkBoxColor={Colors.primary}
        uncheckedCheckBoxColor={Colors.primary}
        rightTextStyle={styles.text}
        onClick={onClick}
        style={styles.checkbox}
      />
    );
  }
}

export default ShareArchiveView;

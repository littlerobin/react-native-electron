// @flow

import React, { PureComponent } from 'react';
import { Text as RNWText, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import { MYRIA } from '../fonts';

type Props = {
  style: StyleSheet.Styles,
};

const styles = {
  fontFamily: MYRIA,
  color: Colors.primary,
};

class Text extends PureComponent<Props> {
  render() {
    const { style, ...props } = this.props;

    return (
      <RNWText style={[styles, style]} {...props} />
    );
  }
}

export default Text;

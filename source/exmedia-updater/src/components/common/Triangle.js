// @flow

import React from 'react';
import { View } from 'react-native';
import Colors from '../../utils/colors';

type Props = {
  children: React$Node,
};

const styles = {
  wrapper: {
    width: '100%',
  },
  component: {
    width: '100%',
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 1400,
    borderRightColor: Colors.grey,
    borderTopWidth: 40,
    borderTopColor: Colors.primary,
  },
};

const Triangle = ({ children }: Props) => (
  <View style={styles.wrapper}>
    {children}
    <View style={styles.component}></View>
  </View>
);

export default Triangle;

// @flow

import React from 'react';
import { View } from 'react-native';
import { SocketConsumer } from '../context/socket.context';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
};

const ConnectionIndicator = (props: Props) => (
  <SocketConsumer>
    {({ onLine }: { onLine: boolean }) => {
      const backgroundStyle = onLine ?
      { backgroundColor: Colors.green } :
      { backgroundColor: Colors.red };

      return (
        <View style={[styles.indicator, backgroundStyle]} />
      );
    }}
  </SocketConsumer>
);

export default ConnectionIndicator;

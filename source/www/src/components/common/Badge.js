// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '../common';
import Colors from '../../utils/colors';

type Props = {
  children: React$Node,
  counter: number,
};

const styles = {
  container: { position: 'relative' },
  badgeWrapper: { position: 'absolute', right: 0 },
  badge: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    minWidth: 24,
    backgroundColor: Colors.red,
  },
  badgeText: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold',
  },
};

class Badge extends Component<Props> {
  render() {
    const { children, counter } = this.props;

    return (
      <View style={styles.container}>
        {children}
        {counter > 0 && (
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{counter}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Badge;

// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { RouterContextConsumer } from '../context/router.context';
import type { History } from '../types.shared';

type Props = {
  children: React$Node,
  onPress?: (history: History) => void,
};

class ButtonRouter extends Component<Props> {
  render() {
    return (
      <RouterContextConsumer>
        {({ history }: { history: History }) => (
          <TouchableOpacity
            {...this.props}
            onPress={() => this.props.onPress && this.props.onPress(history)}>
            {this.props.children}
          </TouchableOpacity>
        )}
      </RouterContextConsumer>
    );
  }
}

export default ButtonRouter;

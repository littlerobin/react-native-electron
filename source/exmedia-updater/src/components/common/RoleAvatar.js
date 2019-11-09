// @flow

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RouterContextConsumer } from '../context/router.context';
import type { History } from '../types.shared';

type Props = {
  source: any,
  position: 'left' | 'right',
  onClick?: (history: History) => void,
  isEmpty?: boolean,
  type?: 'square' | 'landscape',
  size?: number,
};

const styles = {
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
};

class RoleAvatar extends Component<Props>{
  static defaultProps = {
    type: 'landscape',
  }

  render() {
    const { isEmpty, type, size, source, position, onClick } = this.props;
    let style = styles.button;
    let sizeImage = {
      width: 320,
      height: 180,
    };
    const styleLeft = { left: 70 };
    const styleRight = { right: 70 };

    if (position === 'left') {
      style = {
        ...style,
        ...styleRight,
      };
    } else if (position === 'right') {
      style = {
        ...style,
        ...styleLeft,
      };
    }

    if (type === 'square') {
      sizeImage = {
        width: size || 150,
        height: size || 150,
      };
    }

    return (
      <RouterContextConsumer>
        {({ history }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={style}
            onPress={() => onClick && onClick(history)}>
            <Image source={isEmpty || source} style={sizeImage} />
          </TouchableOpacity>
        )}
      </RouterContextConsumer>
    );
  }
}

export default RoleAvatar;

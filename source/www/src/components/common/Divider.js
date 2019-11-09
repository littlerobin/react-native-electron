// @flow

import React from 'react';
import {View} from 'react-native';
import Colors from '../../utils/colors';

type Props = {
  vertical?: boolean,
};

const styles = {
  vertical: {
    borderRightWidth: 3,
    borderRightColor: Colors.white,
    height: '100%',
  },
  horizontal: {
    position: 'absolute',
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: Colors.black,
  },
  container: { position: 'relative', width: '100%' },
};

const Divider = (props: Props) => {
  const style = props.vertical ? styles.vertical : styles.horizontal;
  const containerStyle = props.vertical ? { paddingHorizontal: 8 } : styles.container;

  return (
    <View style={containerStyle}>
      <View style={style} />
    </View>
  );
}

export default Divider;

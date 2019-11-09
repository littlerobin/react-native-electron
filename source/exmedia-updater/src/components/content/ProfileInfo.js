// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
// import { ConnectionIndicator } from '../common';
import { HamburgerMenu } from '../menu';
import Colors from '../../utils/colors';
import { getStore } from '../../utils/store';

type Props = {};
type State = {
  username: ?string,
};

const styles = {
  wrapperUsername: {
    justifyContent: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: { color: Colors.white, fontSize: 24 },
};

class ProfileInfo extends PureComponent<Props, State> {
  state = {
    username: null,
  };

  async componentDidMount() {
    const username = await getStore('username');

    this.setState({ username });
  }

  render() {
    return (
      <View style={styles.wrapperUsername}>
        {/* <ConnectionIndicator /> */}
        <Text style={styles.username}>{this.state.username || ''}</Text>
        <HamburgerMenu />
      </View>
    );
  }
}

export default ProfileInfo;

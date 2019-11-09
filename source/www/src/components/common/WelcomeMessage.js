// @flow

import React from 'react';
import { View } from 'react-native';
import { Text } from '../common';

// const logo = require('../../images/logo/logo-welcome.png');
const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: { width: '100%', height: 50 },
};

const WelcomeMessage = () => (
  <View style={styles.container}>
    <Text>Selamat datang</Text>
    {/* <Image source={logo} style={styles.image} /> */}
    <Text>
      Kami senang kami tidak sendiri mewujudkan mimpi.
    </Text>
  </View>
);

export default WelcomeMessage;

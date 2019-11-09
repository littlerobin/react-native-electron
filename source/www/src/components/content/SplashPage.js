// @flow

import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { AppVersionConsumer } from '../context/appversion.context';
import { Page, Image } from '../common';
import Colors from '../../utils/colors';
import { getStore } from '../../utils/store';

type Props = {
  redirectAfterLogin: string,
  history: Object,
};

const logoSplash = require('../../images/assets/logo_splash.png');
const styles = {
  appVersion: {
    paddingVertical: 16,
    color: Colors.white,
    fontSize: 16,
  },
};

class SplashPage extends PureComponent<Props> {
  async componentDidMount() {
    const token = await getStore('token');
    // const username = await getStore('username');

    // Delay
    // await new Promise(resolve => setTimeout(resolve, 3000));

    if (token) {
      this.props.history.replace(
        this.props.redirectAfterLogin
      );
    } else {
      this.props.history.replace('/login');
    }
  }

  render = () => (
    <Page backgroundColor={Colors.primary}>
      <Image source={logoSplash} size={50} />
      <AppVersionConsumer>
        {({appVersion}) => (
          <Text style={styles.appVersion}>{`Version: ${appVersion}`}</Text>
        )}
      </AppVersionConsumer>
    </Page>
  );
}

export default SplashPage;

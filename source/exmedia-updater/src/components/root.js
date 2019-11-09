// @flow

import React, { Component } from 'react';
import { RouterContextProvider } from './context/router.context';
import { AppVersionProvider } from './context/appversion.context';
import { ConnectionProvider } from './context/connection.context';
import { NotificationContainer } from 'react-notifications';
import type { History } from './types.shared';
import moment from 'moment';
import 'moment/min/locales.min';
import 'react-notifications/lib/notifications.css';

type Props = {
  children: React$Node,
  history: History,
};

moment.locale('id');

class Root extends Component<Props> {
  render() {
    return (
      <RouterContextProvider history={this.props.history}>
        <ConnectionProvider>
          <AppVersionProvider>
            {this.props.children}
            <NotificationContainer />
          </AppVersionProvider>
        </ConnectionProvider>
      </RouterContextProvider>
    );
  }
}

export default Root;

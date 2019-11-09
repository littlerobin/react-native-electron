// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';
import { PathProvider } from './path.context';

type Props = {children: React$Node};
type State = {appVersion: string};

const AppVersionContext: Object = React.createContext();

export class AppVersionProvider extends Component<Props, State> {
  state = {
    appVersion: '',
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('app-version', (event, args) =>
        this.setState({appVersion: args})
      );
    }
  }

  render() {
    return (
      <AppVersionContext.Provider value={{appVersion: this.state.appVersion}}>
        <PathProvider>
          {this.props.children}
        </PathProvider>
      </AppVersionContext.Provider>
    );
  }
}

export const AppVersionConsumer = AppVersionContext.Consumer;

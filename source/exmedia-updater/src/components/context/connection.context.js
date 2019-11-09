// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';

type Props = { children: React$Node };
type State = { onLine: boolean };

const ConnectionContext: Object = React.createContext();

export class ConnectionProvider extends Component<Props, State> {
  state = {
    onLine: false,
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('status-connection', (event, args) => {
        if (args === 'ONLINE') {
          this.setState({ onLine: true });
        } else {
          this.setState({ onLine: false });
        }
      });
    } else {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
      this.updateOnlineStatus();
    }
  }

  updateOnlineStatus = () => {
    this.setState({ onLine: navigator.onLine });
  };

  render() {
    return (
      <ConnectionContext.Provider value={{ onLine: this.state.onLine }}>
        {this.props.children}
      </ConnectionContext.Provider>
    );
  }
}

export const ConnectionConsumer = ConnectionContext.Consumer;

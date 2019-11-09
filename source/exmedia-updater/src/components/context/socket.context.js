// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';

type Props = { children: React$Node };
type State = { onLine: boolean };

const SocketContext: Object = React.createContext();

export class SocketProvider extends Component<Props, State> {
  state = {
    onLine: false,
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('socket-connected', (event, args) => {
        const onLine = args.onLine;
        this.setState({ onLine });
      });
    }
  }

  render() {
    return (
      <SocketContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export const SocketConsumer = SocketContext.Consumer;

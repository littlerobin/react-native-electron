// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';

type Props = { children: React$Node };
type State = { paths: Object };

const PathContext: Object = React.createContext();

export class PathProvider extends Component<Props, State> {
  state = {
    paths: {},
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('paths', (event, args) => {
        const paths = JSON.parse(args);
        this.setState({ paths });
      });
    } else {
      const image = `${process.env.ASSETS_DIR || ''}/images`;
      const video = `${process.env.ASSETS_DIR || ''}/video`;

      this.setState({ paths: { image, video } });
    }
  }

  render() {
    return (
      <PathContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </PathContext.Provider>
    );
  }
}

export const PathConsumer = PathContext.Consumer;

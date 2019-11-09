// @flow

import React, { Component } from 'react';
import type { Persistor } from '../types.shared';

const PersistorContext: Object = React.createContext();

type Props = {
  children: React$Node,
  persistor: Persistor,
};

export class PersistorProvider extends Component<Props> {
  render() {
    return (
      <PersistorContext.Provider
        value={{
          persistor: this.props.persistor,
        }}>
        {this.props.children}
      </PersistorContext.Provider>
    );
  }
}

export const PersistorConsumer = PersistorContext.Consumer;

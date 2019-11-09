// @flow

import React, { Component } from 'react';
import qs from 'querystring';
import type { History } from '../types.shared';

type Props = {
  children: React$Node,
  history: History,
};

const RouterContext: Object = React.createContext();

export class RouterContextProvider extends Component<Props> {
  transitionTo = (path: string, state?: Object) => {
    const currentQuery = this.getCurrentState();
    const queriesCombine = {
      ...currentQuery,
      ...(state || {}),
    };

    this.props.history.push({
      pathname: path,
      search: qs.stringify(queriesCombine),
    }, queriesCombine);
  };

  getCurrentState = () => this.props.history.location.state || {};

  queriesUrl = qs.parse(this.props.history.location.search.split('?')[1]) || {};

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: {
            ...this.props.history,
            queriesUrl: this.queriesUrl,
            transitionTo: this.transitionTo,
            getCurrentState: this.getCurrentState,
          },
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export const RouterContextConsumer = RouterContext.Consumer;


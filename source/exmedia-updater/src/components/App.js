// @flow

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './root';
import { Info, PageNotFound } from './common';
import { SplashPage, FAQ, MainPage } from './content';
import { PersistorProvider } from './context/persistor.context';
import { MenuPage_, TempMenuPage } from './menu';
import { LoginPage, TempLogin, AccountKitPage } from './auth';
import { RegistrationPage, IntroPage } from './registration';
import configureStore from '../store';
import createApolloClient from '../apolloClient';
import type { History } from './types.shared';

type Props = {
  history: History,
};

type State = {
  token: ?string,
};

class App extends Component<Props, State> {
  state = {
    token: null,
  };

  setToken = (token, callback) => {
    this.setState({ token }, callback);
  };

  render() {
    const { history } = this.props;
    const { store, persistor } = configureStore();
    const apolloClient = createApolloClient(this.state.token);

    return (
      <ApolloProvider client={apolloClient}>
        <PersistorProvider persistor={persistor}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Root path="/" history={history}>
                <Switch>
                  <Route path="/splash" component={SplashPage} />
                  <Route path="/login" component={LoginPage} />
                  {/* Temporary Login Page for Demo */}
                  <Route path="/temp-login" component={TempLogin} />
                  {/* ============================= */}
                  <Route
                    path="/account-kit"
                    render={(props) => <AccountKitPage {...props} setToken={this.setToken} />}
                  />
                  <Route path="/registration" component={RegistrationPage} />
                  <Route path="/info" component={Info} />
                  <Route path="/intro" component={IntroPage} />
                  <Route path="/menu" component={MenuPage_} />
                  {/* Temporary Menu Page for Demo */}
                  <Route path="/temp-main-menu" component={TempMenuPage} />
                  {/* ============================= */}
                  <Route path="/main" component={MainPage} />
                  <Route path="/faq" component={FAQ} />
                  <Redirect from="/" to="/splash" />
                  <Route path="*" component={PageNotFound} />
                </Switch>
              </Root>
            </PersistGate>
          </Provider>
        </PersistorProvider>
      </ApolloProvider>
    );
  }
}

export default App;

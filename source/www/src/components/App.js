// @flow

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './root';
import {
  TeacherMyArchivePage,
  StudentMyArchivePage,
  InputArchivePage,
  SummaryArchivePage,
} from './archive';
import {
  CurriculumPage,
  ChapterPage,
  QuestionPage,
  StudentStudyPage,
  TeacherTutorialPage,
  StudentTutorialPage,
} from './bankSoal';
import { Info, PageNotFound } from './common';
import { SplashPage, FAQ } from './content';
import { MenuPage } from './menu';
import { MainPage } from './main';
import { LoginPage, AccountKitPage } from './auth';
import { RegistrationPage, IntroPage } from './registration';
import { ProfilePage, EditProfilePage } from './profile';
import { FollowerPage, RequestFollowerPage } from './relationship';
import { PersistorProvider } from './context/persistor.context';
import configureStore from '../store';
import createApolloClient from '../apolloClient';
import type { History } from './types.shared';

type Props = {
  history: History,
};

type State = {
  token: ?string,
};
const redirectAfterLogin = 'main-menu';

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
                  <Route
                    path="/splash"
                    render={(props) => (
                      <SplashPage {...props} redirectAfterLogin={redirectAfterLogin} />
                    )}
                  />
                  <Route
                    path="/login"
                    render={(props) => (
                      <LoginPage {...props} redirectAfterLogin={redirectAfterLogin} />
                    )}
                  />
                  <Route
                    path="/account-kit"
                    render={(props) => <AccountKitPage {...props} setToken={this.setToken} />}
                  />
                  <Route
                    path="/registration"
                    render={(props) => (
                      <RegistrationPage {...props} redirectAfterLogin={redirectAfterLogin} />
                    )}
                  />
                  <Route path="/info" component={Info} />
                  <Route path="/intro" component={IntroPage} />
                  <Route path="/main-menu" component={MenuPage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/edit-profile" component={EditProfilePage} />
                  <Route path="/student-study" component={StudentStudyPage} />
                  <Route path="/student-archive" component={StudentMyArchivePage} />
                  <Route path="/teacher-archive" component={TeacherMyArchivePage} />
                  <Route path="/archive-input" component={InputArchivePage} />
                  <Route path="/archive-summary" component={SummaryArchivePage} />
                  <Route path="/curriculum" component={CurriculumPage} />
                  <Route path="/chapter" component={ChapterPage} />
                  <Route path="/question" component={QuestionPage} />
                  <Route path="/teacher-tutorial" component={TeacherTutorialPage} />
                  <Route path="/student-tutorial" component={StudentTutorialPage} />
                  <Route path="/follower" component={FollowerPage} />
                  <Route path="/teacher-request-follower" component={RequestFollowerPage} />
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

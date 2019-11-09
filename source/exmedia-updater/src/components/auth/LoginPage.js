// @flow

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { NotificationManager } from 'react-notifications';
import get from 'lodash/get';
import { Page, WelcomeMessage } from '../common';
import { FormEngine } from '../form';
import { RouterContextConsumer } from '../context/router.context';
import Colors from '../../utils/colors';
import { getMachineId } from '../../utils/machineSpecs';
import type { History } from '../types.shared';
import { setStore } from '../../utils/store';

type Props = {
  history: History,
};

type State = {
  deviceId: ?String,
};

const backroundIntro = require('../../images/assets/backround_intro.png');
const MUTATION_LOGIN = gql`
  mutation Login($auth: LoginInput) {
    login(auth: $auth) {
      user {
        id
        username
        isStudent
        isTeacher
        __typename
      }
      token
      __typename
    }
  }
`;
class LoginPage extends Component<Props, State> {
  state = {
    deviceId: null,
  };

  async componentDidMount() {
    const deviceId = await getMachineId();

    this.setState({ deviceId });
  }

  _fieldMap = [
    {key: 'username', type: 'text', placeholder: 'Username'},
    {key: 'password', type: 'password', placeholder: 'Kata sandi'},
    {
      key: 'forgotPassword',
      type: 'link',
      text: 'LUPA KATA SANDI',
      to: '/info/?page=forgot-password',
      align: 'left',
      style: {
        textDecorationLine: 'none',
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    {
      key: 'login',
      type: 'submit',
      text: 'LANJUTKAN MISI',
      style: {
        backgroundColor: Colors.primary,
        padding: 16,
      },
      textStyle: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
      },
    },
    {
      key: 'registration',
      type: 'link',
      text: 'SAYA INGIN BERGABUNG',
      to: '/account-kit',
      style: {
        textDecorationLine: 'none',
        fontSize: 12,
        textAlign: 'center',
      },
    },
  ];

  onSubmit = async (data: Object, mutation: any, history: History) => {
    const loginInput = {
      username: data.username,
      password: data.password,
      deviceId: this.state.deviceId,
    };

    const { data: resultData } = await mutation({
      variables: { auth: loginInput },
      fetchPolicy: 'no-cache',
    });
    const token = get(resultData, 'login.token', null);
    const username = get(resultData, 'login.user.username', '');
    const isStudent = get(resultData, 'login.user.isStudent', '');
    const isTeacher = get(resultData, 'login.user.isTeacher', '');

    if (token) {
      setStore('username', username);
      setStore('token', token).then(() => {
        NotificationManager.success('Login Sukses', 'Berhasil');
        history.transitionTo('/temp-login', { isStudent, isTeacher });
        // history.transitionTo('/main-menu', { isStudent, isTeacher });
      });
    }
  };

  render() {
    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Mutation mutation={MUTATION_LOGIN}>
          {(mutate, { loading, error }) => (
            <RouterContextConsumer>
              {({ history }) => (
                <FormEngine
                  key="login-form"
                  fields={this._fieldMap}
                  loading={loading}
                  error={error}
                  onSubmit={(data) => this.onSubmit(data, mutate, history)}
                />
              )}
            </RouterContextConsumer>
          )}
        </Mutation>
      </Page>
    );
  }
}

export default LoginPage;

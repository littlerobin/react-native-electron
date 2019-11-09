// @flow

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NotificationManager } from 'react-notifications';
import { RouterContextConsumer } from '../context/router.context';
import { Page } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import type { History } from '../types.shared';
import { MUTATION_VERIFICATION_EMAIL } from '../gql.shared';

type Props = {
  location: any,
};

class Info extends Component<Props> {
  _fieldMapForgotPassword = [
    {
      key: 'info',
      type: 'caption',
      text: `Silakan masukkan email Anda yang sudah terdaftar di equivalen. Kami akan mengirimkan panduan untuk mengganti kata sandi Anda`,
      style: {
        color: Colors.primary,
        textAlign: 'center',
      },
    },
    {key: 'email', type: 'email', placeholder: 'Email'},
    {
      key: 'forgotPassword',
      type: 'submit',
      text: 'KIRIM',
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
  ];

  _fieldMapSuccessForgotPassword = [
    {
      key: 'info',
      type: 'caption',
      text: `Panduan mengganti kata sandi sudah kami kirimkan ke email Anda. Silakan klik di sini untuk mengirim ulang panduan.`,
      style: {
        color: Colors.primary,
        textAlign: 'center',
      },
    },
    {
      key: 'login',
      type: 'button',
      text: 'KEMBALI',
      to: '/login',
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
  ];

  onSubmit = async (data: Object, history: History, mutate: any) => {
    const { email } = data;

    await mutate({
      variables: { email },
      fetchPolicy: 'no-cache',
    });

    NotificationManager.success('Email Terkirim', 'Berhasil');
    history.transitionTo('/info', { page: 'success-forgot-password' });
  };

  render() {
    const {page} = getQueries(this.props);
    let fields = [];

    if (page === 'forgot-password') {
      fields = this._fieldMapForgotPassword;
    } else if (page === 'success-forgot-password') {
      fields = this._fieldMapSuccessForgotPassword;
    }

    return (
      <Page>
        <Mutation mutation={MUTATION_VERIFICATION_EMAIL}>
          {(mutate, { loading, error }) => (
            <RouterContextConsumer>
              {({ history }) => (
                <FormEngine
                  fields={fields}
                  onSubmit={(data) => this.onSubmit(data, history, mutate)}
                />
              )}
            </RouterContextConsumer>
          )}
        </Mutation>
      </Page>
    );
  }
}

export default Info;

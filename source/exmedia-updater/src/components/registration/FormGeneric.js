// @flow

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';
import type { History } from '../types.shared';

type Props = {
  phoneNumber: string,
  history: History,
};
type State = {};

const MUTATION_ACCOUNT_KIT = gql`
  mutation RegisterViaAccountKit($user: RegisterUserInput!) {
    registerViaAccountKit(user: $user) {
      user {
        id
        username
      }
      token
    }
  }
`;

class FormGeneric extends Component<Props, State> {

  getFieldMapGenericForm = (fields: { phoneNumber: string }) => [
    { key: 'username', type: 'text', placeholder: 'Username', rules: ['required'] },
    { key: 'fullname', type: 'text', placeholder: 'Nama lengkap', rules: ['required'] },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'gender', type: 'radio-group', options: [{ label: 'Pria', value: 'Male' }, { label: 'Wanita', value: 'Female' }], initial: 'Male' },
    { key: 'phone', type: 'text', placeholder: 'Nomor handphone', defaultValue: fields.phoneNumber, disabled: true },
    { key: 'password', type: 'password', placeholder: 'Kata sandi', rules: ['required'] },
    { key: 'pob', type: 'text', placeholder: 'Tempat Lahir', rules: ['required'] },
    { key: 'dob', type: 'datepicker', placeholder: 'Tanggal Lahir', rules: ['required'] },
  ];

  fieldSubmitButton = [
    {
      key: 'registration',
      type: 'submit',
      text: 'JALANKAN MISI',
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
      key: 'login',
      type: 'link',
      text: 'SAYA SUDAH BERGABUNG',
      to: '/login',
      style: {
        textDecorationLine: 'none',
        fontSize: 12,
        textAlign: 'center',
      },
    },
  ];

  onSubmit = (data: Object, mutation: any) => {
    const variables = {
      user: {
        username: data.username,
        fullName: data.fullname,
        email: data.email,
        gender: data.gender,
        phoneNumber: data.phone,
        password: data.password,
        placeBod: data.pob,
        dateBod: data.dob,
      },
    };

    mutation({ variables });
  };

  render() {
    const { phoneNumber } = this.props;
    const fields = [
      ...this.getFieldMapGenericForm({ phoneNumber }),
      ...this.fieldSubmitButton,
    ];

    return (
      <Mutation
        mutation={MUTATION_ACCOUNT_KIT}
        update={(cache, { data }) => {
          const result = data.registerViaAccountKit;
          const username = get(result, 'registerViaAccountKit.username', '');

          setStore('username', username).then(() => {
            this.props.history.transitionTo('/intro');
          });
        }}>
        {(mutate, { loading, error }) => (
          <FormEngine
            fields={fields}
            loading={loading}
            error={error}
            onSubmit={(data) => this.onSubmit(data, mutate)}
          />
        )}
      </Mutation>
    );
  }
}

export default FormGeneric;

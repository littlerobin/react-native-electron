// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import isElectronRenderer from 'is-electron-renderer';
import { RouterContextConsumer } from '../context/router.context';
import AccountKitWeb from './AccountKitWeb';
import AccountKitElectron from './AccountKitElectron';
import type { QueriesAccountKit } from '../types.shared';
// import { setStore } from '../../utils/store';

const MUTATION_ACCOUNT_KIT = gql`
  mutation GetPrefillViaAccountKit($code: String!) {
    getPrefillViaAccountKit(code: $code) {
      user {
        phoneNumber
      }
      token
    }
  }
`;

type Props = { setToken: (token, callback) => void };
type State = {};

class AccountKitPage extends Component<Props, State> {
  onMutateAccountKit = (params: ?QueriesAccountKit, getPrefillViaAccountKit: Function) => {
    if (!params) {
      return;
    }

    if (params.status === 'PARTIALLY_AUTHENTICATED') {
      getPrefillViaAccountKit({ variables: { code: params.code } });
    }
  }

  render() {
    return (
      <RouterContextConsumer>
        {({ history }) => (
          <Mutation
            update={(cache, { data: { getPrefillViaAccountKit } }) => {
              const phoneNumber = get(getPrefillViaAccountKit, 'user.phoneNumber', '');
              const token = get(getPrefillViaAccountKit, 'token', '');

              /* Temporary
              setStore('token', token).then(() => {
                history.transitionTo('/registration', { phoneNumber });
              });
              */
              this.props.setToken && this.props.setToken(token, () => {
                history.transitionTo('/registration', { phoneNumber });
              });
            }}
            mutation={MUTATION_ACCOUNT_KIT}>
            {(getPrefillViaAccountKit) => (
              <View>
                {isElectronRenderer ? (
                  <AccountKitElectron
                    debug={false}
                    onCallback={
                      (params) => this.onMutateAccountKit(params, getPrefillViaAccountKit)
                    }
                  />
                ) : (
                  <AccountKitWeb
                    onCallback={
                      (params) => this.onMutateAccountKit(params, getPrefillViaAccountKit)
                    }
                  />
                )}
              </View>
            )}
          </Mutation>
        )}
      </RouterContextConsumer>
    );
  }
}

export default AccountKitPage;

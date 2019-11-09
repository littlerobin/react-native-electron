// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import { NotificationManager } from 'react-notifications';
import gql from 'graphql-tag';
import get from 'lodash/get';
import FormGeneric from './FormGeneric';
import FormStudent from './FormStudent';
import FormTeacher from './FormTeacher';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage, Loading } from '../common';
import { setStore, removeStore } from '../../utils/store';
import Colors from '../../utils/colors';
import { getMachineId } from '../../utils/machineSpecs';
import { getQueries } from '../../utils/router';
import type { History } from '../types.shared';
import config from '../../config';

type Props = {
  redirectAfterLogin: string,
  history: Object,
};
type State = {
  deviceId: ?String,
};

const styles = {
  title: {
    color: Colors.primary,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

const QUERY_GET_USER = gql`
  query getUser($phoneNumber: String, $deviceId: String) {
    user(phoneNumber: $phoneNumber) {
      token
      phoneNumber
      userProfile {
        id
      }
      userDevice(deviceId: $deviceId) {
        isMatchDeviceId
      }
    }
  }
`;

const backroundIntro = require('../../images/assets/backround_intro.png');
class RegistrationPage extends Component<Props, State> {
  state = {
    deviceId: null,
  };

  async componentDidMount() {
    const deviceId = await getMachineId();

    this.setState({ deviceId });
  }

  render() {
    let { phoneNumber, isStudent, isTeacher } = getQueries(this.props);
    const { deviceId } = this.state;

    if (config.isTest) {
      phoneNumber = '+6200000000000';
    }

    return (
      <Page testID="registration-page" backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <Query query={QUERY_GET_USER} variables={{ phoneNumber, deviceId }} fetchPolicy="network-only">
          {({ loading, data }) => {
            if (loading) return <Loading />;

            return (
              <RouterContextConsumer>
                {({ history }: { history: History }) => {
                  const registeredPhoneNumber = get(data, 'user.phoneNumber');

                  if (registeredPhoneNumber) {
                    const username = get(data, 'user.username');
                    const userProfile = get(data, 'user.userProfile');
                    setStore('username', username);

                    if (isStudent) {
                      return <FormStudent {...this.props} />;
                    }

                    if (isTeacher) {
                      return <FormTeacher {...this.props} />;
                    }

                    if (userProfile) {
                      // MEMBER ALREADY REGISTERED
                      const userDevices = get(data, 'user.userDevice');
                      const userDeviceMatch = userDevices.find(userDevice => userDevice.isMatchDeviceId);

                      if (userDeviceMatch && userDeviceMatch.isMatchDeviceId) {
                        NotificationManager.success('Anda sudah terdaftar', 'Berhasil');
                        history.transitionTo(this.props.redirectAfterLogin);
                      } else {
                        removeStore('token');

                        NotificationManager.error('Anda sudah pernah mendaftar, tapi device anda tidak cocok', 'Gagal');
                        history.transitionTo('/login');
                      }
                    } else {
                      // MEMBER ALREADY FILL FORM 1
                      history.transitionTo('/intro', { phoneNumber: registeredPhoneNumber });
                    }
                  }

                  return <FormGeneric history={history} phoneNumber={phoneNumber} />;
                }}
              </RouterContextConsumer>
            );
          }}
        </Query>
      </Page>
    );
  }
}

export default RegistrationPage;

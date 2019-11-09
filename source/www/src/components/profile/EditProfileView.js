// @flow

import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import get from 'lodash/get';
import { HeaderBackButton, Text } from '../common';
import EditProfileForm from './EditProfileForm';
import type { History } from '../types.shared';

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  user: Object,
  loadingUser: boolean,
  mutation: any,
};

type State = {
  fullName?: string,
  isStudent?: boolean,
  placeBod?: string,
  dateBod?: string,
  phoneNumber?: string,
  biography?: string,
  email?: string,
  genderName?: string,
  ttl?: string,
  schoolName?: string,
};

class EditProfileView extends Component<Props, State> {
  state = {
    fullName: null,
    isStudent: null,
    placeBod: null,
    dateBod: null,
    phoneNumber: null,
    biography: null,
    email: null,
    userSchools: null,
    genderName: null,
    ttl: null,
    schoolName: null,
  };

  componentDidMount() {
    this.setUserData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingUser !== this.props.loadingUser) {
      this.setUserData();
    }
  }

  setUserData = () => {
    const {
      fullName,
      isStudent,
      placeBod,
      dateBod,
      biography,
      phoneNumber,
      email,
      userSchools,
    } = this.props.user;
    const genderName = get(this.props, 'user.gender.name');
    const ttl = `${placeBod}, ${moment(dateBod).format('D MMMM YYYY')}`;
    const schoolName = get(userSchools, '[0].school.name', '');
    const user = {
      fullName,
      isStudent,
      placeBod,
      dateBod,
      phoneNumber,
      biography,
      email,
      userSchools,
      genderName,
      ttl,
      schoolName,
    };

    this.setState({ ...user });
  }

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  onSubmit = async (data: Object, history: History) => {
    const { biography } = data;
    const variables = { userData: { biography } };

    const { id } = await this.props.mutation({ variables, fetchPolicy: 'no-cache' });

    if (id) {
      NotificationManager.success('Update Sukses', 'Berhasil');
      history.transitionTo('/profile');
    }
  };

  render() {
    return (
      <React.Fragment>
        <HeaderBackButton
          ComponentRightButton={
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              SIMPAN & PERBAHARUI
            </Text>
          }
          onRightMenuClick={(history: History) => this.onSubmit(this.state, history)}
        />
        {!this.props.loadingUser && (
          <EditProfileForm
            {...this.state}
            onChangeState={this.onChangeState}
            onSubmit={(_, history: History) => this.onSubmit(this.state, history)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EditProfileView;

// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from '../common';
import { FormEngine, TextInputProfile } from '../form';
import { withModal, ModalEditProfile } from '../modal';
import withProfileFormGroup from './withProfileFormGroup';
import Colors from '../../utils/colors';

type Props = {
  fullName?: string,
  isStudent?: boolean,
  placeBod?: string,
  dateBod?: string,
  phoneNumber?: string,
  email?: string,
  biography?: string,
  genderName?: string,
  ttl?: string,
  schoolName?: string,
  onSubmit: (data: Object) => void,
  loading: boolean,
  error: any,
  onChangeState: (key: string, value: string) => void,
  renderModal?: (Props: *) => void,
};

const studentButton = require('../../images/assets/student-avatar.png');
const teacherButton = require('../../images/assets/teacher-avatar.png');

type PropsAvatarInputFile = { onPress?: () => void, value?: string, source?: any };
const AvatarInputFile = ({ onPress, value, source }: PropsAvatarInputFile) => (
  <Avatar
    type="square"
    size={150}
    source={source}
    onClick={() => onPress && onPress()}
  />
);

type State = { showModal: boolean };

@withModal(ModalEditProfile)
class EditProfileForm extends Component<Props, State> {
  state = {
    showModal: false,
    keyModalActive: '',
  };

  onCloseModal = (key: string, value: string) => {
    this.setState({ showModal: false });
    this.props.onChangeState(key, value);
  };

  getFieldMap = () => {
    const {
      fullName,
      isStudent,
      phoneNumber,
      email,
      biography,
      genderName,
      ttl,
      schoolName,
    } = this.props;

    return [
      {
        key: 'profilePic',
        type: 'file',
        label: 'Foto Profile',
        ComponentTrigger: <AvatarInputFile source={isStudent ? studentButton : teacherButton} />,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'name',
        type: 'caption',
        label: 'Nama',
        defaultValue: fullName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'ttl',
        type: 'caption',
        label: 'TTL',
        defaultValue: ttl,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'gender',
        type: 'caption',
        label: 'Jenis kelamin',
        defaultValue: genderName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'school',
        type: 'text',
        label: isStudent ? 'Nama sekolah' : 'Tempat mengajar',
        defaultValue: schoolName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'bio',
        type: 'text',
        label: 'Bio',
        placeholder: 'cerita singkat tentang dirimu',
        disabled: true,
        defaultValue: biography,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(
            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => this.setState({ showModal: true, keyModalActive: 'biography' })}>
              <TextInputProfile {...field} />
            </TouchableOpacity>, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'divider',
        type: 'caption',
        text: '',
        style: {
          marginTop: 36,
          marginBottom: 5,
          width: '10%',
          borderTopWidth: 5,
          borderTopColor: isStudent ? Colors.yellowBackground : Colors.redS,
          borderTopStyle: 'solid',
        },
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'headline',
        type: 'caption',
        text: 'PENGATURAN PRIVASI',
        style: {
          paddingBottom: 10,
          color: isStudent ? Colors.yellowBackground : Colors.redS,
        },
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'notification',
        type: 'text',
        label: 'Notification',
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'phoneNumber',
        type: 'text',
        label: 'Nomor handphone',
        defaultValue: phoneNumber,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'email',
        type: 'text',
        label: 'Alamat email',
        defaultValue: email,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'changePassword',
        type: 'text',
        label: 'Ubah kata sandi',
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
    ];
  };

  render() {
    return (
      <React.Fragment>
        <FormEngine
          key="edit-profile-form"
          fields={this.getFieldMap()}
          loading={this.props.loading}
          error={this.props.error}
          onSubmit={this.props.onSubmit}
        />
        {this.props.renderModal &&
          this.props.renderModal({
            isOpen: this.state.showModal,
            keyModalActive: this.state.keyModalActive,
            close: this.onCloseModal,
          })
        }
      </React.Fragment>
    );
  }
}

export default EditProfileForm;

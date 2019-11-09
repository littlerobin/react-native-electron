// @flow

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';
import { getMachineId, getSystemInformation } from '../../utils/machineSpecs';
import {
  QUERY_GET_PROVINCE,
  QUERY_GET_CITY,
  QUERY_GET_DISTRICT,
  QUERY_GET_COURSE,
  QUERY_GET_SCHOOL,
} from '../gql.shared';
import type { History, Option } from '../types.shared';

type Props = {
  redirectAfterLogin: string,
  history: History,
};
type State = {
  addOthersOption: boolean,
  machineSpec: ?{
    deviceId: string,
    hostname: string,
    platform: string,
  },
  selectedProvince: ?number,
  selectedCity: ?number,
};

const MUTATION_REGISTRATION_USER_TEACHER = gql`
  mutation RegisterUserTeacher(
    $userProfile: UserProfileInput,
    $userSchool: UserSchoolInput,
    $userTeacher: UserTeacherInput,
    $userDevice: UserDeviceInput
  ) {
    registerUserTeacher(userProfile: $userProfile, userSchool: $userSchool, userTeacher: $userTeacher, userDevice: $userDevice) {
      username
      token
    }
  }
`;

class FormTeacher extends Component<Props, State> {
  state = {
    addOthersOption: true,
    machineSpec: null,
    selectedProvince: 0,
    selectedCity: 0,
  };

  async componentDidMount() {
    const deviceId = await getMachineId();
    const { hostname, platform } = getSystemInformation();
    const machineSpec = { deviceId, hostname, platform };

    this.setState({ machineSpec });
  }

  getFieldMapSchoolInput = () => [
    { key: 'schoolName', type: 'text', placeholder: 'Nama Sekolah', rules: ['required'] },
    {
      key: 'provinces',
      type: 'select',
      placeholder: 'Provinsi',
      query: QUERY_GET_PROVINCE,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 4,
      rules: ['required'],
      onChange: (selected: Option) => {
        const value = parseInt(selected.value, 10);
        this.setState({ selectedProvince: value });
      },
    },
    {
      key: 'cities',
      type: 'select',
      placeholder: 'Kota',
      query: QUERY_GET_CITY,
      params: { provinceId: this.state.selectedProvince },
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 3,
      rules: ['required'],
      onChange: (selected: Option) => {
        const value = parseInt(selected.value, 10);
        this.setState({ selectedCity: value });
      },
    },
    {
      key: 'districts',
      type: 'select',
      placeholder: 'Kecamatan',
      query: QUERY_GET_DISTRICT,
      params: { cityId: this.state.selectedCity },
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 2,
      rules: ['required'],
    },
  ];

  fieldMapLicenseCode = [
    { key: 'licenseCode', type: 'text', placeholder: 'Serial Number', rules: ['required'] },
  ];

  fieldMapTeacherForm = [
    { key: 'nuptkNumber', type: 'number', placeholder: 'Nomor NUPTK', rules: ['required'] },
    { key: 'nikNumber', type: 'number', placeholder: 'Nomor NIK' },
    {
      key: 'schools',
      type: 'select',
      placeholder: 'Pilih sekolah tempat mengajar',
      query: QUERY_GET_SCHOOL,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 5,
      options: (options: Array<Option>) => {
        let opts = [];

        if (this.state.addOthersOption) {
          opts = [
            ...options,
            { label: 'Others', value: 'others' },
          ];
        } else {
          opts = options;
        }

        return opts;
      },
      onChange: (selected: Option) => {
        if (selected.value === 'others') {
          this.setState({ addOthersOption: false });
        } else {
          this.setState({ addOthersOption: true });
        }
      },
    },
  ];

  fieldCourse = [
    {
      key: 'courses',
      type: 'select',
      placeholder: 'Matapelajaran yang diajar',
      query: QUERY_GET_COURSE,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 1,
      rules: ['required'],
    },
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
    const province = data.schools.province
      ? { name: data.schools.province.name }
      : { name: data.provinces.name };
    const city = data.schools.city
      ? { name: data.schools.city.name }
      : { name: data.cities.name };
    const district = data.schools.district
      ? { name: data.schools.district.name }
      : { name: data.districts.name };
    const userProfile = {
      nikNumber: data.nikNumber,
    };
    const userTeacher = {
      nuptkNumber: data.nuptkNumber,
      courses: [{
        id: data.courses.id,
        name: data.courses.name,
      }],
    };
    const userSchool = {
      school: {
        name: data.schools.name || data.schoolName,
        province,
        city,
        district,
      },
    };
    const userDevice = {
      ...(this.state.machineSpec || {}),
      licenseCode: data.licenseCode,
    };
    const variables = {
      userProfile,
      userTeacher,
      userSchool,
      userDevice,
    };

    mutation({ variables });
  };

  render() {
    const fields = [
      ...this.fieldMapTeacherForm,
      ...(!this.state.addOthersOption ? this.getFieldMapSchoolInput() : []),
      ...this.fieldCourse,
      ...this.fieldMapLicenseCode,
      ...this.fieldSubmitButton,
    ];

    return (
      <Mutation
        mutation={MUTATION_REGISTRATION_USER_TEACHER}
        update={(cache, { data }) => {
          const result = data.registerUserStudent;
          const token = get(result, 'token');
          const username = get(result, 'username', '');

          setStore('username', username);
          setStore('token', token).then(() => {
            this.props.history.transitionTo(
              this.props.redirectAfterLogin
            );
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

export default FormTeacher;

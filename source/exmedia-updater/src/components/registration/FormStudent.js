// @flow

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';
import { getMachineId, getSystemInformation } from '../../utils/machineSpecs';
import { QUERY_GET_PROVINCE, QUERY_GET_CITY, QUERY_GET_DISTRICT, QUERY_GET_SCHOOL } from '../gql.shared';
import type { History, Option } from '../types.shared';

type Props = {
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

const MUTATION_REGISTRATION_USER_STUDENT = gql`
  mutation RegisterUserStudent(
    $userProfile: UserProfileInput,
    $userSchool: UserSchoolInput,
    $userStudent: UserStudentInput,
    $userDevice: UserDeviceInput
  ) {
    registerUserStudent(userProfile: $userProfile, userSchool: $userSchool, userStudent: $userStudent, userDevice: $userDevice) {
      username
      token
    }
  }
`;

class FormStudent extends Component<Props, State> {
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
      zIndex: 3,
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
      zIndex: 2,
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
      zIndex: 1,
      rules: ['required'],
    },
  ];

  fieldMapLicenseCode = [
    { key: 'licenseCode', type: 'text', placeholder: 'Serial Number', rules: ['required'] },
  ];

  fieldMapStudentForm = [
    // { key: 'nisnNumber', type: 'number', placeholder: 'Nomor NISN', rules: ['required'] },
    // { key: 'nikNumber', type: 'number', placeholder: 'Nomor NIK' },
    { key: 'grade', type: 'number', placeholder: 'Kelas', rules: ['required'] },
    {
      key: 'schools',
      type: 'select',
      placeholder: 'Pilih sekolah',
      query: QUERY_GET_SCHOOL,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 4,
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
          this.setState({ addOthersOption: false, selectedProvince: 0, selectedCity: 0 });
        } else {
          this.setState({ addOthersOption: true });
        }
      },
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
    const userStudent = {
      nisnNumber: data.nisnNumber,
      grade: data.grade,
    };
    const userSchool = {
      startYear: data.startYear,
      endYear: data.endYear,
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
      userStudent,
      userSchool,
      userDevice,
    };

    mutation({ variables });
  };

  render() {
    const fields = [
      ...this.fieldMapStudentForm,
      ...(!this.state.addOthersOption ? this.getFieldMapSchoolInput() : []),
      ...this.fieldMapLicenseCode,
      ...this.fieldSubmitButton,
    ];

    return (
      <Mutation
        mutation={MUTATION_REGISTRATION_USER_STUDENT}
        update={(cache, { data }) => {
          const result = data.registerUserStudent;
          const token = get(result, 'token');
          const username = get(result, 'username', '');

          setStore('username', username);
          setStore('token', token).then(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // this.props.history.transitionTo('/main-menu');
            this.props.history.transitionTo('/temp-login');
          });
        }}>
        {(mutate, { loading, error }) => {
          const errorMessage = error;
          return (
            <FormEngine
              fields={fields}
              loading={loading}
              error={errorMessage}
              onSubmit={(data) => this.onSubmit(data, mutate)}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default FormStudent;

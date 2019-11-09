// @flow

import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Page } from '../common';
import { COMIC_SANS } from '../fonts';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';
import type { History } from '../types.shared';
import ExMediaLogo from '../../images/assets/img_logo_ex.png';

type Props = {
  history: History,
};
type State = {
  name: string,
  nisn: string,
  classId: string,
  school: string,
  error: string,
};

const styles = {
  container: {
    borderWidth: 4,
    borderColor: Colors.white,
    padding: 24,
    width: '100%',
  },
  textInput: {
    fontSize: 16,
    padding: 8,
    marginVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    outline: 'none',
    fontFamily: COMIC_SANS,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  logo: {
    width: 300,
    height: '20%',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.red,
    padding: 4,
    marginVertical: 8,
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: COMIC_SANS,
    textTransform: 'uppercase',
  },
  errorText: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
    color: Colors.red,
  },
};

class TempLogin extends Component<Props, State> {
  state = {
    name: '',
    nisn: '',
    classId: '',
    school: '',
    error: '',
  };

  onTextChange = (key: string, text: string) => {
    this.setState({ [key]: text, error: '' });
  };

  onSubmit = () => {
    const { name, nisn, classId, school } = this.state;

    if (name === '') {
      this.setState({ error: 'Tolong nama lengkap diisi!' });
      return;
    } else if (nisn === '') {
      this.setState({ error: 'Tolong nomor induk diisi!' });
      return;
    } else if (classId === '') {
      this.setState({ error: 'Tolong kelas diisi!' });
      return;
    } else if (school === '') {
      this.setState({ error: 'Tolong sekolah diisi!' });
      return;
    } else {
      setStore('username', name);
      setStore('class', classId);
      this.props.history.replace('/menu');
    }
  };

  render() {
    return (
      <Page backgroundColor={Colors.mainBackground} minWidth={600}>
        <Image source={ExMediaLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.container}>
          <TextInput
            placeholder="Nama Lengkap"
            placeholderTextColor="#7BBBAE"
            style={styles.textInput}
            value={this.state.name}
            onSubmitEditing={this.onSubmit}
            onChangeText={(text) => this.onTextChange('name', text)}
          />
          <TextInput
            onSubmitEditing={this.onSubmit}
            placeholder="No. Induk"
            placeholderTextColor="#7BBBAE"
            style={styles.textInput}
            keyboardType="numeric"
            value={this.state.nisn}
            onChangeText={(text) => this.onTextChange('nisn', text)}
          />
          <TextInput
            onSubmitEditing={this.onSubmit}
            placeholder="Kelas"
            placeholderTextColor="#7BBBAE"
            style={styles.textInput}
            value={this.state.classId}
            onChangeText={(text) => this.onTextChange('classId', text)}
          />
          <TextInput
            onSubmitEditing={this.onSubmit}
            placeholder="Sekolah"
            placeholderTextColor="#7BBBAE"
            style={styles.textInput}
            value={this.state.school}
            onChangeText={(text) => this.onTextChange('school', text)}
          />
        </View>
        <Text style={styles.errorText}>{this.state.error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}>
          <Text style={styles.buttonLabel}>Masuk</Text>
        </TouchableOpacity>
      </Page>
    );
  }
}

export default TempLogin;

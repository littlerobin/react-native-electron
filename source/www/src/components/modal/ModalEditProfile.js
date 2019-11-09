// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal, Text } from '../common';
import { TextInput } from '../form';
import Colors from '../../utils/colors';

const styles = {
  content: {
    width: '40%',
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: 3,
    transform: 'translate(-50%, -50%)',
  },
  textInput: {
    width: '100%',
    margin: 16,
    padding: 8,
    outline: 'none',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  buttonSubmit: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellowBackground,
  },
};

type Props = {
  isOpen: boolean,
  keyModalActive: string,
  close: (key: string, value: string) => void,
};
type State = {
  value: string
};

class ModalEditProfile extends Component<Props, State> {
  state = { value: '' };

  onChangeValue = (text: string) => {
    this.setState({ value: text });
  };

  onSubmit = () => {
    this.props.close && this.props.close(
      this.props.keyModalActive,
      this.state.value
    );
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        style={styles}
        ariaHideApp={false}>
        <TextInput
          style={styles.textInput}
          value={this.state.value}
          onChangeText={this.onChangeValue}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonSubmit}
          onPress={this.onSubmit}>
          <Text>Selesai</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default ModalEditProfile;

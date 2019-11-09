// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

const styles = {
  containerIcon: {
    paddingLeft: 8,
    paddingRight: 8,
  },
};

type Props = {
  ...ElementProps<typeof TextInput>,
  containerStyle: Object,
  backgroundColor?: string,
};

type State = {
  isShowPassword: boolean,
};

class TextInputWrapper extends Component<Props, State> {
  state = {
    isShowPassword: false,
  };

  render() {
    const { onChange, value, isPasswordType, backgroundColor, containerStyle, ...rest } = this.props;
    const style = [containerStyle, {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      ...(backgroundColor ? { backgroundColor } : {}),
    }];

    return (
      <View style={style}>
        <TextInput
          onChangeText={text => onChange && onChange(text)}
          value={value}
          secureTextEntry={isPasswordType && !this.state.isShowPassword}
          {...rest}
        />
        {isPasswordType && (
          <TouchableOpacity
            style={styles.containerIcon}
            onPressIn={() => this.setState({isShowPassword: true})}
            onPressOut={() => this.setState({isShowPassword: false})}>
            <FontAwesomeIcon icon={faEye} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default TextInputWrapper;

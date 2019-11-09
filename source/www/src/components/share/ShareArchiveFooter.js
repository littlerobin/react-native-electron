// @flow
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../common';
import Colors from '../../utils/colors';

type Props = { onClick: Function, title: string };

const styles = {
  footerButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 16,
  },
  footerButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
};

class ShareArchiveFooter extends Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={styles.footerButton}
        activeOpacity={.8}
        onPress={this.props.onClick}>
        <Text style={styles.footerButtonText}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

export default ShareArchiveFooter;

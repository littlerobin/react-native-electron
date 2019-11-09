// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faSquare } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

type Props = {
  onNextNumber: () => void,
  onPrevNumber: () => void,
  onSetDoubtAnswer: () => void,
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  wrapperIcon: {
    marginHorizontal: 24,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
  },
  icon: { width: 30, height: 30 },
};

class FooterBoard extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.props.onPrevNumber}>
          <FontAwesomeIcon icon={faAngleLeft} color={Colors.white} size="2x" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.wrapperIcon, { borderColor: "#c7a724" } ]}
          onPress={this.props.onSetDoubtAnswer}>
          <FontAwesomeIcon icon={faSquare} color="#c7a724" size="1x" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.props.onNextNumber}>
          <FontAwesomeIcon icon={faAngleRight} color={Colors.white} size="2x" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterBoard;

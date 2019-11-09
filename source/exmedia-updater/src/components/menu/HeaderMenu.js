// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, RoleAvatar, Badge } from '../common';
import Colors from '../../utils/colors';

type Props = { isStudent?: boolean, isTeacher?: boolean };
type State = {};

const studentButton = require('../../images/assets/student-menu.png');
const teacherButton = require('../../images/assets/teacher-menu.png');
const styles = {
  headerView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    width: '100%',
  },
  headerText: {
    fontSize: 32,
    letterSpacing: 4,
    flex: 1,
    alignSelf: 'center',
  },
};

class HeaderMenu extends Component<Props, State> {
  onAvatarClick = (history: History) => {
    const { isStudent, isTeacher } = this.props;
    history.transitionTo('/profile', { isStudent, isTeacher });
  };

  render() {
    const { isStudent, isTeacher } = this.props;
    let color = null;
    let source = null;

    if (isStudent) {
      color = Colors.primary;
      source = studentButton;
    } else if (isTeacher) {
      color = Colors.redS;
      source = teacherButton;
    }

    return (
      <View style={styles.headerView}>
        <Text style={[styles.headerText, { color }]}>EQUIVALEN</Text>
        <Badge counter={1}>
          <RoleAvatar
            type="square"
            size={80}
            source={source}
            onClick={this.onAvatarClick}
          />
        </Badge>
      </View>
    );
  }
}

export default HeaderMenu;

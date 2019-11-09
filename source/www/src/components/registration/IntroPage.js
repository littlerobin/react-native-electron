// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Page, Avatar } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

const teacherButton = require('../../images/assets/teacher_button.png');
const studentButton = require('../../images/assets/student_button.png');
const parentButton = require('../../images/assets/parent_button.png');

type Props = {};

const styles = {
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: { fontSize: 12 },
};

class Intro extends Component<Props> {
  onTeacherAvatarClick = (history: History) => {
    history.transitionTo('/registration', { isTeacher: true });
  };

  onStudentAvatarClick = (history: History) => {
    history.transitionTo('/registration', { isStudent: true });
  };

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Text style={[styles.text, styles.header]}>SAYA ADALAH SEORANG</Text>
        <Avatar source={teacherButton} position="left" onClick={this.onTeacherAvatarClick} />
        <Avatar testID="student-rule" source={studentButton} position="right" onClick={this.onStudentAvatarClick} />
        <Avatar isEmpty source={parentButton} position="left" />
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

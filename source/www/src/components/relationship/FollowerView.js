// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import { Text, Avatar, ButtonRouter } from '../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

type Props = {
  user: Object,
  target: Object,
  currentUser: Object,
};

const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
  },
  labelFullname: {
    fontSize: 16,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  wrapperIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  containerHeader: {
    paddingHorizontal: 32,
    flexDirection: 'row',
  },
  titleHeader: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  requestLabelHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerTotalFollower: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const studentButton = require('../../images/assets/student-avatar.png');
const teacherButton = require('../../images/assets/teacher-avatar.png');

class FollowerView extends Component<Props> {
  render() {
    let user = {};
    let source = null;
    const {
      user: userRelated,
      target: userTarget,
      currentUser,
    } = this.props;
    const isStudent = currentUser.isStudent;
    const isTeacher = currentUser.isTeacher;
    const color = isStudent ? Colors.yellowBackground : Colors.primary;

    if (isStudent) {
      user = get(userTarget || {}, 'user', {});
      source = teacherButton;
    } else if (isTeacher) {
      user = userRelated || {};
      source = studentButton;
    }

    return (
      <View style={styles.container}>
        <Avatar type="square" size={50} source={source} />
        <Text style={[styles.labelFullname, { color }]}>{get(user, 'fullName', '')}</Text>
        <TouchableOpacity activeOpacity={.8} style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faEllipsisH} color={color} />
        </TouchableOpacity>
      </View>
    );
  }
}

type PropsFollowerHeader = { isStudent: boolean, totalRequest: number }
export const FollowerHeader = ({ isStudent, totalRequest }: PropsFollowerHeader) => {
  const color = isStudent ? Colors.yellowBackground : Colors.primary;
  const styleHeader = [styles.titleHeader, { color }];

  return totalRequest > 0 ? (
    <ButtonRouter
      style={styles.containerHeader}
      onPress={(history) => {
        history.transitionTo('teacher-request-follower');
      }}>
      <Text style={styleHeader}>PERMINTAAN MENGIKUTI</Text>
      <View style={styles.requestLabelHeader}>
        <Text style={styleHeader}>{totalRequest}</Text>
        <FontAwesomeIcon
          icon={faAngleRight}
          color={isStudent ? Colors.yellowBackground : Colors.oldGrey}
          size="2x"
        />
      </View>
    </ButtonRouter>
  ) : null;
};

type PropsCountTotalFollower = { isStudent: boolean, totalFollower: number }
export const CountTotalFollower = ({ isStudent, totalFollower }: PropsCountTotalFollower) => {
  const color = isStudent ? Colors.yellowBackground : Colors.primary;
  const styleCount = { fontSize: 32, fontWeight: 'bold', color };
  const description = { paddingHorizontal: 8, fontSize: 18, fontWeight: 'bold', color };

  return (
    <View style={styles.containerTotalFollower}>
      <Text style={styleCount}>{totalFollower}</Text>
      <Text style={description}>PENGIKUT</Text>
    </View>
  );
};

export default FollowerView;

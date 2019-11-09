// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';
import { Text, Avatar, Image, Badge, ButtonRouter } from '../common';
import { PathConsumer } from '../context/path.context';
import { getStore } from '../../utils/store';
import Colors from '../../utils/colors';

type Props = { user: Object };
type State = { username: ?string };

const teacherButton = require('../../images/assets/teacher-avatar.png');
const styles = {
  container: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 32,
  },
  subHeaderText: {
    color: Colors.red,
    fontStyle: 'italic',
  },
  menuButton: {
    width: '50%',
    padding: 2,
    alignItems: 'center',
    borderStyle: 'dotted',
    borderColor: Colors.primary,
  },
  menuText: {
    fontSize: 24,
    color: Colors.black,
  },
};
const listMenuTeacher = [
  { menuLabel: 'muridku', disabled: false, url: '/follower' },
  { menuLabel: 'pengingat', disabled: true },
  { menuLabel: 'favorit', disabled: true },
  { menuLabel: 'lencana', disabled: true },
];

class ProfileTeacher extends Component<Props, State> {
  state = {
    username: null,
  };

  async componentDidMount() {
    const username = await getStore('username');

    this.setState({ username });
  }

  render() {
    const { user } = this.props;
    const joinAt = moment(get(user, 'createdAt')).format('MMM YYYY');

    return (
      <View style={styles.container}>
        <Avatar
          type="square"
          size={150}
          source={teacherButton}
          onClick={() => {}}
        />
        <Text style={styles.headerText}>{this.state.username || 'Username'}</Text>
        <Text style={styles.subHeaderText}>{`bergabung sejak: ${joinAt}`}</Text>
        <FlatList
          keyExtractor={(item, index) => item}
          data={listMenuTeacher}
          numColumns={2}
          style={{ paddingVertical: 16 }}
          renderItem={({ item, index }) => {
            const isEven = index % 2 === 0;
            const style = isEven ? {
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
            } : {
              borderTopWidth: 1,
              borderBottomWidth: 1,
            };
            const menuDisableStyle = item.disabled ? {
              ...styles.menuText,
              color: Colors.disabled,
            } : styles.menuText;

            return (
              <ButtonRouter
                disabled={item.disabled}
                activeOpacity={0.8}
                style={[styles.menuButton, style]}
                onPress={(history) => history.transitionTo(item.url)}>
                <Badge counter={0}>
                  <View style={{ padding: 20 }}>
                    <Text style={menuDisableStyle}>{item.menuLabel}</Text>
                  </View>
                </Badge>
              </ButtonRouter>
            );
          }}
        />
        <View style={{ paddingVertical: 30 }}>
          <PathConsumer>
            {({ paths }) => (
              <Image
                source={`${paths.imageFilePath}/quotes-profile-guru.png`}
                size={50}
              />
            )}
          </PathConsumer>
        </View>
      </View>
    );
  }
}

export default ProfileTeacher;

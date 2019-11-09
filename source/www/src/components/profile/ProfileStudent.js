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

const studentButton = require('../../images/assets/student-avatar.png');
const kunciIcon = require('../../images/assets/icon-kunci.png');
const styles = {
  container: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 32,
    color: Colors.white,
  },
  subHeaderText: {
    color: Colors.yellowBackground,
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
    color: Colors.white,
  },
};

const listMenuStudent = [
  { menuLabel: 'guruku', disabled: false, url: '/follower' },
  { menuLabel: 'catatanku', disabled: true },
];

class ProfileStudent extends Component<Props, State> {
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
    const pointLeft = 0;

    return (
      <View style={styles.container}>
        <Avatar
          type="square"
          size={150}
          source={studentButton}
          onClick={() => {}}
        />
        <Text style={styles.headerText}>{this.state.username || 'Username'}</Text>
        <Text style={styles.subHeaderText}>{`bergabung sejak: ${joinAt}`}</Text>
        <FlatList
          keyExtractor={(item, index) => item}
          data={listMenuStudent}
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
        {pointLeft > 0 && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={kunciIcon} size={50} />
            <Text
              style={{
                color: Colors.yellowBackground,
                paddingHorizontal: 4,
                fontSize: 40,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {pointLeft}
            </Text>
            <Text
              style={{
                color: Colors.yellowBackground,
                paddingHorizontal: 4,
                fontSize: 16,
                fontWeight: 'bold',
                width: '50%',
                alignSelf: 'center',
              }}>
              Kunci tersisa
            </Text>
          </View>
        )}
        <View style={{ paddingVertical: 30 }}>
          <PathConsumer>
            {({ paths }) => (
              <Image
                source={`${paths.imageFilePath}/quotes-profile-murid.png`}
                size={50}
              />
            )}
          </PathConsumer>
        </View>
      </View>
    );
  }
}

export default ProfileStudent;

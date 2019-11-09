// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { RouterContextConsumer } from '../context/router.context';
import MenuView from './MenuView';

type Props = {
  HeaderComponent?: React$Node,
  FooterComponent?: React$Node,
};
type State = {};
const menus = [
  { type: 'video-tutorial', url: '/teacher-tutorial' },
  { type: 'bank-soal', url: '/curriculum' },
  // { type: 'jadwal-pintar', url: '' },
  // { type: 'artikel', url: '' },
  // { type: 'ide-baru', url: '' },
];

class TeacherMenu extends Component<Props, State> {
  render() {
    return (
      <FlatList
        data={menus}
        keyExtractor={(item, index) => item.type}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingVertical: 2 }}
        ListHeaderComponent={this.props.HeaderComponent}
        ListFooterComponent={this.props.FooterComponent}
        renderItem={({ item }) => (
          <RouterContextConsumer>
            {({ history }) => (
              <MenuView
                source={require(`../../images/assets/teacher-${item.type}.png`)}
                widthContainer="100%"
                onClick={() => history.transitionTo(item.url, { type: item.type })}
              />
            )}
          </RouterContextConsumer>
        )}
      />
    );
  }
}

export default TeacherMenu;

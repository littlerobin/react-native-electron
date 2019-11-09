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
  { type: 'belajar', url: '/student-study' },
  { type: 'tugas', url: '/student-archive', params: { evaluationId: '1' } },
  { type: 'ulangan', url: '/student-archive', params: { evaluationId: '3' } },
  { type: 'tryout', url: '/student-archive', params: { evaluationId: '2' } },
  // { type: 'artikel', url: '' },
  // { type: 'lainnya', url: '' },
];

class StudentMenu extends Component<Props, State> {
  render() {
    return (
      <FlatList
        data={menus}
        numColumns={2}
        keyExtractor={(item, index) => item}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        ListHeaderComponent={this.props.HeaderComponent}
        ListFooterComponent={this.props.FooterComponent}
        renderItem={({ item }) => (
          <RouterContextConsumer>
            {({ history }) => (
              <MenuView
                source={require(`../../images/assets/student-${item.type}.png`)}
                widthContainer="50%"
                onClick={() => history.transitionTo(item.url, item.params)}
              />
            )}
          </RouterContextConsumer>
        )}
      />
    );
  }
}

export default StudentMenu;

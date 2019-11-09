// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import { Page } from '../common';
import ProfileInfo from '../content/ProfileInfo';
import MenuView from './MenuView_';
import Colors from '../../utils/colors';
import { createRandomTryout } from '../../utils/dataQuestion';
import type { History } from '../types.shared';
import data from '../../data';

const menus = ['tryout'];
type Props = {
  renderModal?: (props: *) => void,
  history: History,
  mainActionCreator?: Object,
};

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(null, mapDispatchToProps)
class MenuPage extends Component<Props> {
  _onClickMenu = (matpel) => {
    const lessonData = data[matpel] || {};
    const dataQuestion = createRandomTryout(lessonData.tryouts.length, lessonData.totalQuestion);

    this.props.mainActionCreator &&
      this.props.mainActionCreator.setLessonData({
        matpel,
        to: 0,
        dataQuestion,
      });

    this.props.mainActionCreator &&
      this.props.mainActionCreator.resetTimeAction();

    this.props.history.push({ pathname: '/main' }, { page: 1 });
  };

  render() {
    return (
      <Page
        studentBackgroundColor={Colors.mainBackground}
        teacherBackgroundColor={Colors.mainBackground}
        maxWidth={1200}>
        <ProfileInfo />
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', zIndex: -1 }}>
          {menus.map(menu => (
            <MenuView
              key={menu}
              title={menu}
              onClick={() => this._onClickMenu(menu)}
            />
          ))}
        </View>
      </Page>
    );
  }
}

export default MenuPage;

// @flow

import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import mainAction from '../../actions/main';
import type { History, MatPel, MappingAnswer } from '../types.shared';

type Props = {
  history: History,
  totalPages: number,
  userPickLesson?: {
    matpel: MatPel,
    to: number,
    answers: MappingAnswer,
  },
  mainActionCreator?: Object,
};

const styles = {
  container: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 },
  wrapperIcon: { paddingHorizontal: 8 },
  icon: { width: 30, height: 30 },
};
const leftNav = require('../../images/assets/img_btn_navleft.png');
const doubtButton = require('../../images/assets/img_btn_navmid.png');
const rightNav = require('../../images/assets/img_btn_navright.png');

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;

  return {
    userPickLesson: userLessonData[currentMatpel],
  };
};

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class FooterMain extends Component<Props> {
  goToPage = (page: number) => {
    this.props.history.transitionTo('/main', {
      page,
    });
  };

  onLeftNavigation = () => {
    const currentPage = parseInt(this.props.history.getCurrentState().page || 1, 10);
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  };

  onRightNavigation = () => {
    const currentPage = parseInt(this.props.history.getCurrentState().page || 1, 10);
    if (currentPage < this.props.totalPages) {
      this.goToPage(currentPage + 1);
    }
  };

  onDoubtClick = () => {
    const currentPage = parseInt(this.props.history.getCurrentState().page || 1, 10);
    const currentAns = get(this.props, `userPickLesson.answers[${currentPage}]`, {});
    const isDoubt = !currentAns.isDoubt;

    this.props.mainActionCreator &&
      this.props.mainActionCreator.setAnswerAction({
        no: currentPage,
        answer: currentAns.answer,
        isDoubt,
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.onLeftNavigation}>
          <Image source={leftNav} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.onDoubtClick}>
          <Image source={doubtButton} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.onRightNavigation}>
          <Image source={rightNav} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterMain;

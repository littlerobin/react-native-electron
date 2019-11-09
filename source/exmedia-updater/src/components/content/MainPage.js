// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import HeaderMain from './HeaderMain';
import MainBoard from './MainBoard';
import TutorialBoard from './TutorialBoard';
import FooterMain from './FooterMain';
import PageNumberList from './PageNumberList';
import { RouterContextConsumer } from '../context/router.context';
import { setPageList, setPageListWithCorrection } from '../../utils/pageNumber';
import Colors from '../../utils/colors';
import { getSolutionAnswer } from '../../utils/correction';
import type { History, MatPel, UserPickLesson } from '../types.shared';
import data from '../../data';

type Props = {
  currentMatpel: MatPel,
  userPickLesson: UserPickLesson,
  mainActionCreator?: Object,
};
type State = {};

const styles = {
  mainBackground: {
    backgroundColor: Colors.mainBackground,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
    flex: 1,
    zIndex: -1,
    flexDirection: 'row',
    overflowX: 'hidden',
  },
  bullet: {
    color: Colors.white,
    fontSize: 24,
  },
};

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;

  return {
    currentMatpel,
    userPickLesson: userLessonData[currentMatpel],
  };
};

@connect(mapStateToProps)
class MainPage extends Component<Props, State> {
  render() {
    let dataPageList;
    const matpel = this.props.currentMatpel;
    const { to = 0, answers, dataQuestion } = this.props.userPickLesson;
    const lessonData = data[matpel];

    return (
      <RouterContextConsumer>
        {({ history }: { history: History }) => {
          const { page = 1, mode } = history.getCurrentState();
          const isMainMode = mode !== 'tutorial';

          if (isMainMode) {
            dataPageList = setPageList(lessonData.totalQuestion, answers);
          } else {
            const solutions = getSolutionAnswer(lessonData.answers, dataQuestion);
            dataPageList = setPageListWithCorrection(lessonData.totalQuestion, answers, solutions);
          }

          const Content = isMainMode ?
          (
            <MainBoard
              page={page}
              matpel={matpel}
              to={to}
              answers={answers}
            />
          ) :
          (
            <TutorialBoard
              page={page}
              matpel={matpel}
              to={to}
            />
          );

          return (
            <View style={styles.mainBackground}>
              <HeaderMain
                matpel={matpel}
                isMainMode={isMainMode}
              />
              <View style={styles.content}>
                <Text style={styles.bullet}>{`${page}.`}</Text>
                {Content}
                <PageNumberList
                  data={dataPageList}
                  isMainMode={isMainMode}
                />
              </View>
              {isMainMode && <FooterMain history={history} totalPages={lessonData.totalQuestion} />}
            </View>
          );
        }}
      </RouterContextConsumer>
    );
  }
}

export default MainPage;

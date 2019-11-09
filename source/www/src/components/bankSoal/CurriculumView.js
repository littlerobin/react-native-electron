// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bankSoalAction from '../../actions/bankSoal';
import { RouterContextConsumer } from '../context/router.context';
import { HeaderBackButton, Image, Text } from '../common';
import type { History, Curriculum } from '../types.shared';

type Props = {
  urlTitle: string,
  isArchive?: any,
  bankSoalActionCreator?: {
    setCurriculumAction: (curriculum: string) => void,
  },
};

const styles = {
  information: {
    paddingVertical: 24,
    fontSize: 16,
    textAlign: 'center',
  },
  wrapperContent: {
    width: '60%',
  },
};

const mapDispatchToProps = dispatch => ({
  bankSoalActionCreator: bindActionCreators(bankSoalAction, dispatch),
});

@connect(null, mapDispatchToProps)
class CurriculumView extends Component<Props> {
  onClickCurriculum = (curriculumType: Curriculum, history: History) => {
    const { isArchive } = this.props;
    this.props.bankSoalActionCreator &&
      this.props.bankSoalActionCreator.setCurriculumAction(curriculumType);

    history.transitionTo('/chapter', { curriculumType, isArchive });
  };

  render() {
    const { urlTitle } = this.props;

    return (
      <React.Fragment>
        <HeaderBackButton
          ComponentMid={
            <Image
              source={require(`../../images/assets/${urlTitle}.png`)}
              size={40}
            />
          }
        />
        <View style={styles.wrapperContent}>
          <Text style={styles.information}>
            Di sini ada ribuan soal keren yang dapat melatih, membantu, dan menginspirasi Bapak/ Ibu dalam membuat soal berkualitas.
          </Text>
          <RouterContextConsumer>
            {({ history }: { history: History }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.onClickCurriculum('K-13', history)}>
                <Image
                  source={require('../../images/assets/K-13.png')}
                  size={50}
                />
              </TouchableOpacity>
            )}
          </RouterContextConsumer>
          <RouterContextConsumer>
            {({ history }: { history: History }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.onClickCurriculum('KTSP', history)}>
                <Image
                  source={require('../../images/assets/KTSP.png')}
                  size={50}
                  style={{ alignSelf: 'flex-end' }}
                />
              </TouchableOpacity>
            )}
          </RouterContextConsumer>
        </View>
      </React.Fragment>
    );
  }
}

export default CurriculumView;

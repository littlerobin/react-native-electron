// @flow

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';
import { Text, Image, ButtonRouter } from '../common';
import { withModal, ModalShare } from '../modal';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  isTeacher: boolean,
  name: string,
  id: string,
  evaluation: {
    type: string,
  },
  curriculum: {
    name: string,
  },
  questionType: {
    name: string,
  },
  packages: Array<{
    name: string,
    totalQuestion: number,
  }>,
  createdAt: string,
  renderModal: Function,
};
type State = {
  openModal: boolean,
};

const styles = {
  container: {
    padding: 8,
    width: '90%',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
  },
  subtitleText: {
    flex: 1,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  wrapperIcon: {
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginHorizontal: 16,
  },
};

const printIcon = require('../../images/assets/icon-print.png');
const shareIcon = require('../../images/assets/icon-share.png');
const viewIcon = require('../../images/assets/icon-view.png');

@withModal(ModalShare)
class TeacherMyArchiveView extends Component<Props, State> {
  state = {
    openModal: false,
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  onRedirectToQuestion = (history: History, id: string, name: string) => {
    history.transitionTo('/question', { packageId: id, packageName: name });
  };

  render() {
    const { id, name, createdAt, curriculum, questionType, packages } = this.props;
    const totalQuestion = get(packages, '[0].totalQuestion', 0);
    const questionTypeName = get(questionType, 'name', '');
    const subTitle = `${totalQuestion}-SOAL-${questionTypeName}`;

    return (
      <View style={styles.container}>
        <ButtonRouter onPress={(history: History) => this.onRedirectToQuestion(history, id, name)}>
          <Text style={styles.titleText}>{name}</Text>
        </ButtonRouter>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitleText}>{`DIBUAT: ${moment(createdAt).format('DD-MMM-YY')}`}</Text>
          <Text style={styles.subtitleText}>{curriculum.name}</Text>
          <Text style={styles.subtitleText}>{subTitle}</Text>
        </View>
        <View style={styles.wrapperIcon}>
          <TouchableOpacity>
            <Image source={printIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} onPress={this.openModal}>
            <Image source={shareIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={viewIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
        {this.props.renderModal &&
          this.props.renderModal({
            open: this.state.openModal,
            close: this.closeModal,
            archiveId: id,
          })}
      </View>
    );
  }
}

export default TeacherMyArchiveView;

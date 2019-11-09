// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import archiveAction from '../../actions/archive';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import { Text, ContentGroup } from '../common';
import Colors from '../../utils/colors';
import type { Answer, Question } from '../types.shared';

type Props = Question & {
  index: number,
  isArchive?: any,
  createArchiveRule: Object,
  currentPackage: number,
  currentChapter: string,
  archiveActionCreator?: {
    clickToSelectQuestion: ({ id: string, question: Question }) => void,
  },
};

const styles = {
  buttonQuestion: {
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  wrapperOption: {
    paddingHorizontal: 16,
  },
  wrapperContentInfo: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: Colors.black,
    borderTopStyle: 'solid',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: -8,
  },
  contentInfo: {
    flex: 1,
  },
};

type PropsContentInfo = {
  answer?: Answer,
  used?: number,
  creator?: string,
};
export const ContentInfo = (props: PropsContentInfo) => (
  <View style={styles.wrapperContentInfo}>
    <Text style={styles.contentInfo}>
      {`JAWABAN: ${props.answer || '-'}`}
    </Text>
    <Text style={[styles.contentInfo, { textAlign: 'center' }]}>
      {`digunakan: ${props.used || props.used === 0 ? props.used : 0}`}
    </Text>
    <Text style={[styles.contentInfo, { textAlign: 'right' }]}>
      {`penulis: ${props.creator || '-'}`}
    </Text>
  </View>
);

const mapStateToProps = ({ archive }) => ({
  ...archive,
});

const mapDispatchToProps = dispatch => ({
  archiveActionCreator: bindActionCreators(archiveAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class QuestionView extends Component<Props> {

  onQuestionClick = (id: string, question: Question) => {
    const { archiveActionCreator } = this.props;

    archiveActionCreator &&
      archiveActionCreator.clickToSelectQuestion({ id, question });
  };

  render() {
    const {
      index,
      id,
      content,
      options,
      used,
      answer,
      createArchiveRule,
      currentPackage,
      currentChapter,
      createdBy,
      isArchive,
    } = this.props;
    const selectedQuestions = get(
      createArchiveRule,
      `packages[${currentPackage}][${currentChapter}]`,
      {}
    );
    const isArchiveSelected = isArchive === 'true';
    const style = get(selectedQuestions, `${id}.selected`) ? {
      ...styles.buttonQuestion,
      backgroundColor: Colors.yellow,
    } : styles.buttonQuestion;
    const creator = get(createdBy, 'fullName');

    return (
      <ButtonHoverContextProvider
        style={style}
        onPress={
          isArchiveSelected ?
          () =>  this.onQuestionClick(id, { id, index, content, options, used, answer, createdBy }) :
          () => {}
        }>
        <ContentGroup index={index} content={content} />
        <View style={styles.wrapperOption}>
          {options.map(({ option, content }) => (
            <ContentGroup key={option.name} index={option.name} content={content} />
          ))}
        </View>
        <ContentInfo answer={answer} used={used} creator={creator} />
      </ButtonHoverContextProvider>
    );
  }
}

export default QuestionView;

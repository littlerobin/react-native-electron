// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { RouterContextConsumer } from '../context/router.context';
import QuestionView from './QuestionView';
import { Text, HeaderBackButton, Loading } from '../common';
import { convertObjToArr } from '../../utils/convertArray';
import Colors from '../../utils/colors';
import type { History, Curriculum } from '../types.shared';

type Props = {
  curriculum?: Curriculum,
  isArchive?: any,
  chapter: string,
  packageName: string,
  data: Object,
  loading: boolean,
  createArchiveRule?: Object,
  currentPackage?: number,
  onLoadMore?: () => void,
};

const styles = {
  headerContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: Colors.red,
  },
  titleChapter: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
};

const mapStateToProps = ({ archive, bankSoal }) => ({
  ...archive,
  ...bankSoal,
});

@connect(mapStateToProps)
class QuestionListView extends Component<Props> {
  getHeaderComponent = () => this.props.chapter
    ? (
      <View style={styles.headerContainer}>
        <Text style={styles.titleChapter}>
          {this.props.chapter}
        </Text>
      </View>
    ) : null;

  redirectToSummary = () => {
    const { createArchiveRule, isArchive, loading, currentPackage = 0 } = this.props;

    return (
      <RouterContextConsumer>
        {({ history }: { history: History }) => {
          if (!loading) {
            const totalQuestions = get(createArchiveRule, 'totalQuestions');
            const selectedQuestions = get(
              createArchiveRule,
              `packages[${currentPackage}]`,
              {}
            );
            const selectedQuestionsData = convertObjToArr(
              selectedQuestions,
              'array',
              (returnValue) => convertObjToArr(returnValue, 'array'),
            ).reduce((prev: Array<Object>, curr: Array<Object>) => {
              if (curr.length) {
                prev = prev.concat(curr);
              }

              return prev;
            }, []);
            const questionOnlySelected = selectedQuestionsData.filter(question => !!question.selected);
            const isNeedRedirect = questionOnlySelected.length >= totalQuestions && isArchive;
            if (isNeedRedirect) {
              history.transitionTo('/archive-summary');
            }
          }
        }}
      </RouterContextConsumer>
    );
  }

  render() {
    const { curriculum = '', packageName, data, isArchive } = this.props;
    const questionsData = get(data, 'questions');
    const title = packageName || `KURIKULUM ${curriculum}`;

    return (
      <React.Fragment>
        <HeaderBackButton
          title={title}
          ComponentRightButton={
            <FontAwesomeIcon
              icon={faTimes}
              color={Colors.primary}
              size="2x"
            />
          }
          onRightMenuClick={(history: History) => {
            history.replace('/main-menu');
          }}
        />
        <View style={{ flex: 1, width: '100%' }}>
          {this.props.loading ? <Loading type="equivalen" /> : (
            <FlatList
              data={questionsData}
              keyExtractor={(item, index) => item.id}
              ListHeaderComponent={this.getHeaderComponent()}
              contentContainerStyle={{ paddingVertical: 4 }}
              refreshing={data.networkStatus === 4}
              onRefresh={() => data.refetch()}
              onEndReachedThreshold={1}
              onEndReached={({ distanceFromEnd }) => {
                if (distanceFromEnd > -10) {
                  this.props.onLoadMore && this.props.onLoadMore();
                }
              }}
              renderItem={({ item, index }) => (
                <QuestionView {...item} index={index + 1} isArchive={isArchive} />
              )}
            />
          )}
        </View>
        {this.redirectToSummary()}
      </React.Fragment>
    );
  }
}

export default QuestionListView;

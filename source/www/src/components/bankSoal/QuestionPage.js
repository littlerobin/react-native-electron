// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { connect } from 'react-redux';
import QuestionListView from './QuestionListView';
import { Loading } from '../common';
import { Page, PageConsumer } from '../common/Page';
import { getQueries } from '../../utils/router';
import { PAGE_SIZE } from '../../constants';
import type { Curriculum } from '../types.shared';

type Props = {
  curriculum?: Curriculum,
};

const QUERY_GET_QUESTIONS = gql`
  query getQuestions($package: PackageInput, $questionInfo: QuestionInfoInput, $limit: Int, $offset: Int) {
    questions(package: $package, questionInfo: $questionInfo, limit: $limit, offset: $offset) {
      id
      content
      options {
        content
        option {
          name
        }
      }
      used
      createdBy {
        id
        fullName
      }
      answer
    }
  }
`;

const mapStateToProps = ({ archive, bankSoal }) => ({
  ...bankSoal,
});

@connect(mapStateToProps)
class QuestionPage extends Component<Props> {
  render() {
    const { curriculum = null } = this.props;
    const { chapter, packageId, packageName, isArchive } = getQueries(this.props);
    let variables = { limit: PAGE_SIZE, offset: 0 };

    if (packageId) {
      variables = {
        ...variables,
        package: { id: packageId },
      };
    }

    return (
      <Page
        isFullWidth
        withContextProvider
        justifyContent="flex-start">
        <PageConsumer>
          {({ currentUser, loading: loadingUser }) => {
            const course = get(currentUser, 'userTeacher.courses[0].name');

            if (curriculum || course || chapter) {
              variables = {
                ...variables,
                questionInfo: {
                  ...(curriculum ? { curriculum: { name: curriculum } } : {}),
                  ...(course ? { course: { name: course } } : {}),
                  ...(chapter ? { chapter: { name: chapter } } : {}),
                },
              };
            }

            return (
              <Query
                query={QUERY_GET_QUESTIONS}
                variables={variables}
                fetchPolicy="cache-and-network"
                notifyOnNetworkStatusChange>
                {({ data, loading: loadingQuestion, fetchMore }) => {
                  const loading = loadingUser && loadingQuestion;
                  return (
                    <React.Fragment>
                      {Loading && <Loading type="equivalen" transparent color="default" />}
                      <QuestionListView
                        chapter={chapter}
                        isArchive={isArchive}
                        packageName={packageName}
                        data={data}
                        loading={loading}
                        onLoadMore={() => {
                          fetchMore({
                            variables: { offset: data.questions.length + 1 },
                            updateQuery: (prevResult, { fetchMoreResult }) => {
                              if (!fetchMoreResult || fetchMoreResult.questions.length === 0) {
                                return prevResult;
                              }

                              return {
                                questions: prevResult.questions.concat(fetchMoreResult.questions),
                              };
                            },
                          });
                        }}
                      />
                    </React.Fragment>
                  );
                }}
              </Query>
            );
          }}
        </PageConsumer>
      </Page>
    );
  }
}

export default QuestionPage;

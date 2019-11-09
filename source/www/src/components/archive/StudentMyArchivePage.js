// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import StudentMyArchiveListView from './StudentMyArchiveListView';
import { Page, PageConsumer } from '../common/Page';
import { PAGE_SIZE } from '../../constants';
import { getQueries } from '../../utils/router';
import { QUERY_GET_ARCHIVES_BY_USER } from '../gql.shared';
import Colors from '../../utils/colors';

type Props = {};

class StudentMyArchivePage extends Component<Props> {
  render() {
    const { evaluationId } = getQueries(this.props);
    let variables = { limit: PAGE_SIZE, offset: 0 };

    if (evaluationId) {
      variables = {
        ...variables,
        evaluationId,
      };
    }

    return (
      <Page
        isFullWidth
        withContextProvider
        studentBackgroundColor={Colors.grey}
        justifyContent="flex-start">
        <PageConsumer>
          {({ currentUser, loading: loadingUser }) => {
            if (currentUser.isStudent) {
              variables = {
                ...variables,
                userId: currentUser.id,
              };
            }

            return !loadingUser && (
              <Query
                query={QUERY_GET_ARCHIVES_BY_USER}
                variables={variables}
                notifyOnNetworkStatusChange>
                {({ data, loading: loadingArchive, fetchMore }) => {
                  const loading = loadingUser && loadingArchive;

                  return (
                    <StudentMyArchiveListView
                      evaluation={evaluationId}
                      user={currentUser}
                      props={this.props}
                      data={data}
                      loading={loading}
                      onLoadMore={() => {
                        fetchMore({
                          variables: { offset: data.archives.length + 1 },
                          updateQuery: (prevResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult || fetchMoreResult.archives.length === 0) {
                              return prevResult;
                            }

                            return {
                              archives: prevResult.archives.concat(fetchMoreResult.archives),
                            };
                          },
                        });
                      }}
                    />
                  )
                }}
              </Query>
            );
          }}
        </PageConsumer>
      </Page>
    );
  }
}

export default StudentMyArchivePage;

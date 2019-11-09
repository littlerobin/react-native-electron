// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import TeacherMyArchiveListView from './TeacherMyArchiveListView';
import { Page, PageConsumer } from '../common/Page';
import { PAGE_SIZE } from '../../constants';
import { QUERY_GET_ARCHIVES } from '../gql.shared';

type Props = {};

class TeacherMyArchivePage extends Component<Props> {
  render() {
    let variables = { limit: PAGE_SIZE, offset: 0 };

    return (
      <Page
        isFullWidth
        withContextProvider
        justifyContent="flex-start">
        <PageConsumer>
          {({ currentUser, loading: loadingUser }) => {
            if (currentUser.isTeacher) {
              variables = {
                ...variables,
                createdBy: { id: currentUser.id },
              };
            }

            return (
              <Query
                query={QUERY_GET_ARCHIVES}
                variables={variables}
                notifyOnNetworkStatusChange>
                {({ data, loading: loadingArchive, fetchMore }) => {
                  const loading = loadingUser && loadingArchive;

                  return (
                    <TeacherMyArchiveListView
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

export default TeacherMyArchivePage;

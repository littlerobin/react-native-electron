// @flow

import React from 'react';
import { Query } from 'react-apollo';
import StudentStudyListView from './StudentStudyListView';
import { Page, PageConsumer } from '../common/Page';
import { QUERY_GET_VIDEO_TUTORIAL } from '../gql.shared';
import Colors from '../../utils/colors';

type Props = {};

const StudentStudyPage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    studentBackgroundColor={Colors.grey}
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) =>
        !loadingUser && (
          <Query
            query={QUERY_GET_VIDEO_TUTORIAL}
            notifyOnNetworkStatusChange>
            {({ data, loading: loadingArchive, fetchMore }) => {
              const loading = loadingUser && loadingArchive;

              return (
                <StudentStudyListView
                  user={currentUser}
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
        )
      }
    </PageConsumer>
  </Page>
);

export default StudentStudyPage;

// @flow

import React from 'react';
import { Query } from 'react-apollo';
import FollowerListView from './FollowerListView';
import { Loading } from '../common';
import { Page, PageConsumer } from '../common/Page';
import Colors from '../../utils/colors';
import { QUERY_GET_USER_RELATIONSHIP } from '../gql.shared';
import { PAGE_SIZE } from '../../constants';

const FollowerPage = () => (
  <Page
    isFullWidth
    withContextProvider
    studentBackgroundColor={Colors.primary}
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => {
        let variables = {
          type: { name: 'USER' },
          limit: PAGE_SIZE,
          offset: 0,
        };

        if (currentUser.isStudent) {
          variables = {
            ...variables,
            user: { id: currentUser.id },
          };
        } else if (currentUser.isTeacher) {
          variables = {
            ...variables,
            target: { id: currentUser.id },
          };
        }

        return loadingUser ? (
          <Loading />
        ) : (
          <Query
            query={QUERY_GET_USER_RELATIONSHIP}
            variables={variables}
            notifyOnNetworkStatusChange>
            {({ data, loading: loadingUserRelationship, fetchMore }) => {
              const loading = loadingUser && loadingUserRelationship;

              return (
                <FollowerListView
                  user={currentUser}
                  data={data}
                  loading={loading}
                  onLoadMore={() => {
                    fetchMore({
                      variables: { offset: data.userRelationships.length + 1 },
                      updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult || fetchMoreResult.userRelationships.length === 0) {
                          return prevResult;
                        }

                        return {
                          userRelationships: prevResult.userRelationships.concat(fetchMoreResult.userRelationships),
                        };
                      },
                    });
                  }}
                />
              );
            }}
          </Query>
        );
      }}
    </PageConsumer>
  </Page>
);

export default FollowerPage;

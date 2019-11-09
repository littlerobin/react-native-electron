// @flow

import React from 'react';
import { Query } from 'react-apollo';
import RequestFollowerListView from './RequestFollowerListView';
import { Loading } from '../common';
import { Page, PageConsumer } from '../common/Page';
import { QUERY_GET_USER_RELATIONSHIP } from '../gql.shared';
import { PAGE_SIZE } from '../../constants';

const FollowerPage = () => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => {
        if (currentUser.isStudent) {
          return null;
        }

        const variables = {
          status: { name: 'PENDING' },
          type: { name: 'USER' },
          target: { id: currentUser.id },
          limit: PAGE_SIZE,
          offset: 0,
        };

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
                <RequestFollowerListView
                  data={data}
                  loading={loading}
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

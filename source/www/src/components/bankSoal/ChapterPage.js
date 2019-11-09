// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ChapterListView from './ChapterListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';
import { PAGE_SIZE } from '../../constants';

type Props = {};

const QUERY_GET_CHAPTERS = gql`
  query getChapters($courseId: ID, $limit: Int!, $offset: Int!) {
    chapters(courseId: $courseId, limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

const ChapterPage = (props: Props) => {
  const { isArchive } = getQueries(props)

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query
        query={QUERY_GET_CHAPTERS}
        variables={{ courseId: "1", limit: PAGE_SIZE, offset: 0 }}
        notifyOnNetworkStatusChange>
        {({ data, loading, fetchMore }) => (
          <ChapterListView
            isArchive={isArchive}
            data={data}
            loading={loading}
            onLoadMore={() => {
              fetchMore({
                variables: { offset: data.chapters.length + 1 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult || fetchMoreResult.chapters.length === 0) {
                    return prevResult;
                  }

                  return {
                    chapters: prevResult.chapters.concat(fetchMoreResult.chapters),
                  };
                },
              });
            }}
          />
        )}
      </Query>
    </Page>
  );
};

export default ChapterPage;

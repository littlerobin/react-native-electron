// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import TutorialListView from './TutorialListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';

type Props = {};

const QUERY_GET_VIDEO_TUTORIAL = gql`
  query getVideoTutorials {
    videoTutorials {
      id
      url
    }
  }
`;

const TutorialPage = (props: Props) => {
  const { type } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query query={QUERY_GET_VIDEO_TUTORIAL}>
        {({ data, loading }) => (
          <TutorialListView
            urlTitle={type}
            data={data.videoTutorials}
            loading={loading}
          />
        )}
      </Query>
    </Page>
  );
};

export default TutorialPage;

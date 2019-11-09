// @flow

import React from 'react';
import { Query } from 'react-apollo';
import TeacherTutorialListView from './TeacherTutorialListView';
import { Page } from '../common/Page';
import { QUERY_GET_VIDEO_TUTORIAL } from '../gql.shared';
import { getQueries } from '../../utils/router';

type Props = {};

const TeacherTutorialPage = (props: Props) => {
  const { type } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query query={QUERY_GET_VIDEO_TUTORIAL}>
        {({ data, loading }) => (
          <TeacherTutorialListView
            urlTitle={type}
            data={data.videoTutorials}
            loading={loading}
          />
        )}
      </Query>
    </Page>
  );
};

export default TeacherTutorialPage;

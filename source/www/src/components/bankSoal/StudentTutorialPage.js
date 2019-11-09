// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import StudentTutorialListView from './StudentTutorialListView';
import { Page } from '../common';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import { PAGE_SIZE } from '../../constants';

type Props = {};

const QUERY_GET_VIDEO_TUTORIAL = gql`
  query getVideoTutorials (
    $limit: Int
    $offset: Int
    $courseId: ID
  ) {
    videoTutorials(
      limit: $limit
      offset: $offset
      courseId: $courseId
    ) {
      id
      url
      question {
        questionInfos {
          course {
            name
          }
          chapter {
            name
          }
        }
      }
    }
  }
`;

const StudentTutorialPage = (props: Props) => {
  const { courseId } = getQueries(props);

  return (
    <Page
      isFullWidth
      studentBackgroundColor={Colors.grey}
      justifyContent="flex-start">
      <Query
        query={QUERY_GET_VIDEO_TUTORIAL}
        variables={{ courseId, limit: PAGE_SIZE, offset: 0 }}
        notifyOnNetworkStatusChange>
        {({ data, loading, fetchMore }) => (
          <StudentTutorialListView
            data={data}
            loading={loading}
          />
        )}
      </Query>
    </Page>
  );
};

export default StudentTutorialPage;

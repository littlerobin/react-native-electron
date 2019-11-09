// @flow
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import MainBoard from './MainBoard';
import { Page, PageConsumer } from '../common/Page';
import { PathConsumer } from '../context/path.context';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';

type Props = {};

const QUERY_GET_DATA = gql`
  query GetData($id: ID) {
    archive(id: $id) {
      evaluation {
        type
      }
      course {
        imageUrl
      }
    }
  }
`;
const MUTATION_GENERATE_RANDOM = gql`
  mutation GenerateRandom($id: ID) {
    generateRandomQuestion(userArchiveId: $id) {
      id
      orderNo
      question {
        id
        content
        options {
          id
          content
          option {
            name
          }
        }
      }
      userAnswer {
        answer
        isDoubt
      }
    }
  }
`;

const MainPage = (props: Props) => {
  const { archiveId, userArchiveId } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      backgroundColor={Colors.mainBackground}
      alignItems="flex-start"
      justifyContent="flex-start">
      <PageConsumer>
        {({ currentUser, loading }) => (
          <PathConsumer>
            {({ paths }) => (
              <Query query={QUERY_GET_DATA} variables={{ id: archiveId }}>
                {({ data, loading: loadingData }) => {
                  const evaluation = get(data, 'archive.evaluation.type', '');
                  const logoPath = get(data, 'archive.course.imageUrl', '');
                  const courseLogo = `${paths.STORAGE_URL}/${logoPath}`;

                  return !loadingData && (
                    <Mutation mutation={MUTATION_GENERATE_RANDOM}>
                      {(mutate, { loading }) => (
                        <MainBoard
                          logo={courseLogo}
                          requestGenerateRandQuestion={
                            () => mutate({ variables: { id: userArchiveId } })
                          }
                          loadingGenerate={loading}
                          archiveId={archiveId}
                          evaluation={evaluation}
                          currentUser={currentUser}
                        />
                      )}
                    </Mutation>
                  );
                }}
              </Query>
            )}
          </PathConsumer>
        )}
      </PageConsumer>
    </Page>
  );
};

export default MainPage;

// @flow

import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Page, PageConsumer } from '../common/Page';
import EditProfileView from './EditProfileView';
import Colors from '../../utils/colors';

type Props = {};

const MUTATION_UPDATE_PERSONAL_DATA = gql`
  mutation UpdatePersonalData($userData: UserInput) {
    updatePersonalData(userData: $userData) {
      id
      username
      isStudent
      isTeacher
    }
  }
`;

const EditProfilePage = (props: Props) =>
(
  <Page
    isFullWidth
    withContextProvider
    studentBackgroundColor={Colors.grey}
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => (
        <Mutation mutation={MUTATION_UPDATE_PERSONAL_DATA}>
          {(mutate, { loading: loadingMutation, error }) => (
            <EditProfileView
              loadingUser={loadingUser}
              user={currentUser}
              isStudent={currentUser.isStudent}
              isTeacher={currentUser.isTeacher}
              mutation={mutate}
            />
          )}
        </Mutation>
      )}
    </PageConsumer>
  </Page>
);

export default EditProfilePage;

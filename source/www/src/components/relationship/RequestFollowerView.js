// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { NotificationManager } from 'react-notifications';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Text, Avatar, ButtonRouter } from '../common';
import Colors from '../../utils/colors';
import { QUERY_GET_USER_RELATIONSHIP } from '../gql.shared';
import type { History } from '../types.shared';

type Props = {
  id: string,
  user: Object,
  target: Object,
};

const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
  },
  labelFullname: {
    fontSize: 16,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  wrapperIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonConfirmation: {
    backgroundColor: Colors.primary,
    padding: 8,
    marginHorizontal: 4,
  },
  buttonDelete: {
    backgroundColor: Colors.transparent,
    padding: 7,
    marginHorizontal: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderStyle: 'solid',
  },
};

const studentButton = require('../../images/assets/student-avatar.png');
const MUTATION_APPROVE_RELATIONSHIP = gql`
  mutation ApproveRequestRelationship($id: ID) {
    approveRequestRelationship(id: $id) {
      id
    }
  }
`;
const MUTATION_REJECT_RELATIONSHIP = gql`
  mutation RejectRequestRelationship($id: ID) {
    rejectRequestRelationship(id: $id) {
      id
    }
  }
`;

class RequestFollowerView extends Component<Props> {
  onReject = (history: History, mutation: any, id: string) => {
    const variables = { id };
    mutation({ variables, fetchPolicy: 'no-cache' }).then(() => {
      NotificationManager.success('Relasi ditolak', 'Berhasil');
      history.transitionTo('/teacher-request-follower');
    });
  };

  onConfirmation = (history: History, mutation: any, id: string) => {
    const variables = { id };
    mutation({ variables, fetchPolicy: 'no-cache' }).then(() => {
      NotificationManager.success('Relasi ditambahkan', 'Berhasil');
      history.transitionTo('/teacher-request-follower');
    });
  };

  render() {
    const { id, user: userStudent } = this.props;

    return (
      <View style={styles.container}>
        <Avatar type="square" size={50} source={studentButton} />
        <Text style={styles.labelFullname}>{get(userStudent, 'fullName', '')}</Text>
        <View style={styles.wrapperIcon}>
          <Mutation
            mutation={MUTATION_APPROVE_RELATIONSHIP}
            refetchQueries={() => [{ query: QUERY_GET_USER_RELATIONSHIP }]}>
            {(mutate, { loading, error }) => (
              <ButtonRouter
                style={styles.buttonConfirmation}
                activeOpacity={.8}
                onPress={(history: History) => this.onConfirmation(history, mutate, id)}>
                <Text style={{ color: Colors.white }}>KONFIRMASI</Text>
              </ButtonRouter>
            )}
          </Mutation>
          <Mutation
            mutation={MUTATION_REJECT_RELATIONSHIP}
            refetchQueries={() => [{ query: QUERY_GET_USER_RELATIONSHIP }]}>
            {(mutate, { loading, error }) => (
              <ButtonRouter
                style={styles.buttonDelete}
                activeOpacity={.8}
                onPress={(history: History) => this.onReject(history, mutate, id)}>
                <Text style={{ color: Colors.primary }}>HAPUS</Text>
              </ButtonRouter>
            )}
          </Mutation>
        </View>
      </View>
    );
  }
}

export default RequestFollowerView;

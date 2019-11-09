// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Text, Loading } from '../common';
import { DateTimePicker } from '../form';
import ShareArchiveFooter from './ShareArchiveFooter';
import { ShareArchiveConsumer } from '../modal/ModalShare';

const MUTATION_SHARE_USER = gql`
  mutation MutationShareUser($userArchive: UserTeacherArchiveInput) {
    createUserArchives(userArchive: $userArchive) {
      id
    }
  }
`;

const styles = {
  container: { padding: 10 },
  text: { paddingBottom: 5 },
};

type Props = {};
type State = {};

class FormSetTimePage extends Component<Props, State> {
  onSubmit = async (context, mutation) => {
    const { archiveId, users: checkedUsers, startTime, endTime } = context.state;
    const users = checkedUsers.map(user => ({ id: user.id }));
    const variables = {
      userArchive: {
        archiveId,
        users,
        startTime,
        endTime,
      },
    };

    await mutation({ variables });

    context.goTo('success-notif');
  };

  render() {
    return (
      <View style={{ width: '100%', zIndex: -1 }}>
        <ShareArchiveConsumer>
          {(context) => (
            <React.Fragment>
              <View style={styles.container}>
                <Text style={styles.text}>Waktu Mulai</Text>
                <DateTimePicker onChange={(value) => context.setData('startTime', value)} />
              </View>
              <View style={styles.container}>
                <Text style={styles.text}>Waktu Selesai</Text>
                <DateTimePicker onChange={(value) => context.setData('endTime', value)} />
              </View>
              <Mutation mutation={MUTATION_SHARE_USER}>
                {(mutate, { loading }) => (
                  <React.Fragment>
                    {loading && <Loading transparent />}
                    <ShareArchiveFooter
                      title="BAGIKAN"
                      onClick={() => this.onSubmit(context, mutate)}
                    />
                  </React.Fragment>
                )}
              </Mutation>
            </React.Fragment>
          )}
        </ShareArchiveConsumer>
      </View>
    );
  }
}

export default FormSetTimePage;

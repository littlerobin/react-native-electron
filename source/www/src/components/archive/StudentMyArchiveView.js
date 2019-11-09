// @flow

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Mutation } from 'react-apollo';
import get from 'lodash/get';
import gql from 'graphql-tag';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Text, ButtonRouter, Loading } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  endTime?: string,
  opened: boolean,
  archive: {
    id: string,
    name: string,
    evaluation: {
      type: string,
    },
    questionType: {
      name: string,
    },
    packages: Array<{
      name: string,
      totalQuestion: number,
    }>,
    createdAt: string,
  },
};

const styles = {
  container: {
    padding: 8,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  containerSubtitle: {
    flexDirection: 'column',
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
  },
  subtitleText: {
    flex: 1,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  wrapperIcon: {
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 16,
  },
  downloadButton: {
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerQuote: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

const MUTATION_READ_ARCHIVE = gql`
  mutation ReadArchive($userArchive: UserStudentArchiveInput) {
    updateUserArchive(userArchive: $userArchive) {
      id
      opened
    }
  }
`;

export const HeaderAssignment = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerQuote}>
      Jangan lupa bersyukur ya teman, karena kamu bisa ngerjain tugas kapan aja, di mana aja, tanpa ribet!
    </Text>
  </View>
);

class MyArchiveView extends Component<Props> {
  onRedirectToQuestion = async (mutate: ({ variables: Object }) => Promise<any>, history: History, id: string, name: string) => {
    const variables = {
      userArchive: {
        archive: { id: get(this.props, 'archive.id') },
        opened: true,
      },
    };

    const { data } = await mutate({ variables });
    const userArchiveId = get(data, 'updateUserArchive.id');

    history.transitionTo('/main', { archiveId: id, userArchiveId });
  };

  render() {
    const { archive, endTime, opened } = this.props;
    const { id, name } = archive;
    const deadlineDate = endTime ? moment(endTime).format('DD-MMM-YY hh:mm') : '';
    const styleTitle = opened ? styles.titleText : { ...styles.titleText, fontWeight: 'bold' };
    const styleSubtitle = opened ? styles.subtitleText : { ...styles.subtitleText, fontWeight: 'bold' };

    return (
      <View style={styles.container}>
        <View style={styles.containerSubtitle}>
          <Mutation mutation={MUTATION_READ_ARCHIVE}>
            {(mutate, { loading }) => (
              <ButtonRouter
                onPress={(history: History) => this.onRedirectToQuestion(mutate, history, id, name)}>
                {loading && <Loading type="equivalen" color="default" transparent />}
                <Text style={styleTitle}>{name}</Text>
              </ButtonRouter>
            )}
          </Mutation>
          <View style={styles.wrapperSubtitle}>
            <Text style={styleSubtitle}>{`BATAS PENGUMPULAN TUGAS: ${deadlineDate}`}</Text>
          </View>
        </View>
        <View style={styles.wrapperIcon}>
          <TouchableOpacity style={styles.downloadButton}>
            <FontAwesomeIcon icon={faDownload} color={Colors.grey} size="lg" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyArchiveView;

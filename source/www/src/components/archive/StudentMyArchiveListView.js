// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import StudentMyArchiveView, { HeaderAssignment } from './StudentMyArchiveView';
import { HeaderBackButton, Divider, Text, Loading, Image } from '../common';
import Colors from '../../utils/colors';

type Props = {
  evaluation: 'Tugas' | 'Kisi - Kisi' | 'Ujian',
  loading: boolean,
  data: Object,
  user: Object,
  props: Object,
  onLoadMore?: () => void,
};

const EVALUATION_MAP = {
  '1': { // Tugas
    iconImage: require('../../images/assets/icon-header-tugas.png'),
  },
  '2': { // Kisi - Kisi
    iconImage: require('../../images/assets/icon-header-tryout.png'),
  },
  '3': { // Ujian
    iconImage: require('../../images/assets/icon-header-ulangan.png'),
  },
};

class StudentMyArchiveListView extends Component<Props> {
  getHeaderComponent = () => (
    <HeaderAssignment />
  );

  getFooterComponent = () => this.props.loading ? <Loading /> : null;

  getEmptyComponent = () => (
    <Text
      style={{
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        paddingVertical: 16,
        borderStyle: 'solid',
        borderColor: Colors.primary,
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}>
      Data Masih Kosong
    </Text>
  );

  render() {
    const { data, evaluation } = this.props;
    const archivesData = get(data, 'archiveByUser');
    const ComponentRightButton = (
      <Image source={EVALUATION_MAP[evaluation].iconImage} size={60} />
    );

    return (
      <React.Fragment>
        <HeaderBackButton
          withTriangle
          isStudent
          ComponentRightButton={ComponentRightButton}
        />
        <FlatList
          data={archivesData}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          ItemSeparatorComponent={Divider}
          ListHeaderComponent={this.getHeaderComponent()}
          ListFooterComponent={this.getFooterComponent()}
          ListEmptyComponent={this.getEmptyComponent()}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          onEndReachedThreshold={1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > -10) {
              this.props.onLoadMore && this.props.onLoadMore();
            }
          }}
          renderItem={({ item }) => (
            <StudentMyArchiveView {...item} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default StudentMyArchiveListView;

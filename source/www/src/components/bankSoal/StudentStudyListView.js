// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import { HeaderBackButton, Divider, Image } from '../common';
import StudentStudyView, { HeaderStudy } from './StudentStudyView';

type Props = {
  data: Object,
  onLoadMore?: () => void,
};

class StudentStudyListView extends Component<Props> {
  getHeaderComponent = () => (
    <HeaderStudy />
  );

  getFooterComponent = () => null;

  render() {
    const { data } = this.props;
    const videoTutorialsData = get(data, 'videoTutorials');
    const ComponentRightButton = (
      <Image source={require('../../images/assets/icon-header-belajar.png')} size={60} />
    );

    return (
      <React.Fragment>
        <HeaderBackButton
          withTriangle
          isStudent
          ComponentRightButton={ComponentRightButton}
        />
        <FlatList
          data={videoTutorialsData}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          ItemSeparatorComponent={Divider}
          ListHeaderComponent={this.getHeaderComponent()}
          ListFooterComponent={this.getFooterComponent()}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          onEndReachedThreshold={1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > -10) {
              this.props.onLoadMore && this.props.onLoadMore();
            }
          }}
          renderItem={({ item }) => (
            <StudentStudyView {...item} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default StudentStudyListView;

// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import { HeaderBackButton } from '../common';
import FollowerView, { FollowerHeader, CountTotalFollower } from './FollowerView';

type Props = {
  user: Object,
  data: Object,
  loading: boolean,
  onLoadMore?: () => void,
};

class FollowerListView extends Component<Props> {
  render() {
    const { user, data } = this.props;
    const followerData = get(data, 'userRelationships', []);
    const totalRequested = followerData.filter(d => get(d, 'status.name') === 'PENDING').length;
    const list = followerData.filter(d => get(d, 'status.name') === 'APPROVED');
    const totalFollower = list.length;

    return (
      <React.Fragment>
        <HeaderBackButton
          isStudent={user.isStudent}
          ComponentRightButton={
            <CountTotalFollower isStudent={user.isStudent} totalFollower={totalFollower} />
          }
        />
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 16 }}
          ListHeaderComponent={
            <FollowerHeader isStudent={user.isStudent} totalRequest={totalRequested} />
          }
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          onEndReachedThreshold={1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > -10) {
              this.props.onLoadMore && this.props.onLoadMore();
            }
          }}
          renderItem={({ item }) => (
            <FollowerView {...item} currentUser={user} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default FollowerListView;

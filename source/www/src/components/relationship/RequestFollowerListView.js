// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import { HeaderBackButton } from '../common';
import RequestFollowerView from './RequestFollowerView';

type Props = {
  data: Object,
  loading: boolean,
  onLoadMore?: () => void,
};

class RequestFollowerListView extends Component<Props> {
  render() {
    const { data } = this.props;
    const followerData = get(data, 'userRelationships', []);

    return (
      <React.Fragment>
        <HeaderBackButton title="PERMINTAAN MENGIKUTI" />
        <FlatList
          data={followerData}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }) => (
            <RequestFollowerView {...item} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default RequestFollowerListView;

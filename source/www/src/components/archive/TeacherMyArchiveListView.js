// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import get from 'lodash/get';
import TeacherMyArchiveView from './TeacherMyArchiveView';
import { HeaderBackButton, Text, Divider, Loading } from '../common';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

type Props = {
  loading: boolean,
  data: Object,
  user: Object,
  props: Object,
  onLoadMore?: () => void,
};

class MyArchiveListView extends Component<Props> {
  getFooterComponent = () => this.props.loading ? <Loading /> : null;

  getEmptyComponent = () => (
    <Text
      style={{
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        paddingVertical: 16,
        borderStyle: 'solid',
        borderColor: Colors.white,
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}>
      Data Masih Kosong
    </Text>
  );

  _onRightMenuClick = (history) => {
    history.transitionTo('/archive-input');
  };

  render() {
    const { data, props } = this.props;
    const title = 'ARSIP SAYA';
    const archivesData = get(data, 'archives');
    const ComponentRightButton = (
      <FontAwesomeIcon
        icon={faPlus}
        color={Colors.primary}
        size="2x"
      />
    );

    return (
      <React.Fragment>
        <HeaderBackButton
          title={title}
          ComponentRightButton={ComponentRightButton}
          onRightMenuClick={this._onRightMenuClick}
        />
        <View style={{ flex: 1, width: '100%' }}>
          {this.props.loading ? <Loading type="equivalen" /> : (
            <FlatList
              data={archivesData}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={{ paddingVertical: 4 }}
              ItemSeparatorComponent={Divider}
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
                <TeacherMyArchiveView {...item} isTeacher />
              )}
            />
          )}
        </View>
        <FooterMenu
          isTeacher
          props={props}
        />
      </React.Fragment>
    );
  }
}

export default MyArchiveListView;

// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import {
  HeaderBackButton,
  Image,
  Text,
  Loading,
} from '../common';
import TeacherTutorialView from './TeacherTutorialView';

type Props = {
  urlTitle: string,
  data: Array<{
    id: string,
    url: string,
  }>,
  loading: boolean,
};

const styles = {
  information: {
    paddingVertical: 24,
    fontSize: 16,
    textAlign: 'center',
  },
  wrapperContent: {
    width: '60%',
  },
};

class TeacherTutorialListView extends Component<Props> {
  render() {
    const { urlTitle, data, loading } = this.props;

    return (
      <React.Fragment>
        <HeaderBackButton
          ComponentMid={
            <Image
              source={require(`../../images/assets/${urlTitle}.png`)}
              size={40}
            />
          }
        />
        <View style={styles.wrapperContent}>
          <Text style={styles.information}>
            Belajar itu tidak kenal usia dan waktu. Mari jelajahi video-video karya anak bangsa yang membahas soal secara kreatif sekarang juga!
          </Text>
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => item}
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingVertical: 16 }}
              renderItem={({ item }) => (
                <TeacherTutorialView {...item} />
              )}
            />
          )}
        </View>
      </React.Fragment>
    );
  }
}

export default TeacherTutorialListView;

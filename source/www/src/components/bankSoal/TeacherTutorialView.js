// @flow

import React from 'react';
import { View } from 'react-native';
import { VideoElectron } from '../common';

type Props = {
  id: string,
  url: string,
};

const styles = {
  container: { padding: 16, flex: 8 },
};

const TeacherTutorialView = (props: Props) => (
  <View style={styles.container}>
    <VideoElectron {...props} />
  </View>
);

export default TeacherTutorialView;

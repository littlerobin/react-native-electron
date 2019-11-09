// @flow

import React from 'react';
import { View } from 'react-native';
import { Text, VideoElectron } from '../common';

const styles = {
  container: { padding: 16, flex: 8 },
  headerText: {
    padding: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
};

type PropsHeader = { title: string };
export const StudentTutorialHeaderSection = (props: PropsHeader) => (
  <Text style={styles.headerText}>{props.title}</Text>
);

type Props = {
  id: string,
  url: string,
};
const StudentTutorialView = (props: Props) => (
  <View style={styles.container}>
    <VideoElectron {...props} />
  </View>
);

export default StudentTutorialView;

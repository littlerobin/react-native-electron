// @flow

import React from 'react';
import { View } from 'react-native';
import { Text } from '../common';

type Props = {
  index: number | string,
  content: string,
};

const styles = {
  wrapperContent: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  bullet: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    fontSize: 16,
  },
};

const ContentGroup = (props: Props) => (
  <View style={styles.wrapperContent}>
    <Text style={styles.bullet}>{`${props.index}.`}</Text>
    <div dangerouslySetInnerHTML={{__html: props.content}} />
  </View>
);

export default ContentGroup;

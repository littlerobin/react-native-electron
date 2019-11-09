// @flow
import React from 'react';
import {ActivityIndicator} from 'react-native';
import Page from './Page';
import Colors from '../../utils/colors';

type Props = {
  transparent: boolean,
};

const Loading = ({ transparent }: Props) => (
  <Page backgroundColor={transparent ? Colors.transparent : Colors.grey}>
    <ActivityIndicator size="large" />
  </Page>
);

export default Loading;

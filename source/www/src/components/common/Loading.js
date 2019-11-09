// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import Page from './Page';
import { Image } from '../common';
import Colors from '../../utils/colors';

type Props = {
  transparent: boolean,
  type?: 'default' | 'equivalen',
  color?: 'default' | 'green' | 'yellow',
};

const Loading = ({ transparent, type, color }: Props) => {
  const loadingType = type || 'default';
  const loadingColor = color || 'default';
  let LoadingContent;

  switch(loadingType) {
    case 'default':
      LoadingContent = <ActivityIndicator size="large" />;
      break;
    case 'equivalen':
      LoadingContent = (
        <Image source={require(`../../images/assets/loading-eqv-${loadingColor}.gif`)} size={20} />
      );
      break;
  }

  return (
    <Page backgroundColor={transparent ? Colors.transparent : Colors.grey}>
      {LoadingContent}
    </Page>
  );
};

export default Loading;

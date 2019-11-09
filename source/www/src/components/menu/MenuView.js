// @flow
import React from 'react';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import { Image } from '../common';
import Colors from '../../utils/colors';

type Props = {
  source: any,
  onClick: () => void,
  widthContainer?: string,
};

const styles = {
  menuView: {
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const MenuView = (props: Props) => (
  <ButtonHoverContextProvider
    style={{
      ...styles.menuView,
      width: props.widthContainer,
    }}
    focusStyle={{ backgroundColor: Colors.yellow }}
    onPress={props.onClick}>
    <Image source={props.source} size={50} />
  </ButtonHoverContextProvider>
);

export default MenuView;

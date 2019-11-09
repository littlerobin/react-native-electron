// @flow

import React from 'react';
import { Text } from 'react-native';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import { COMIC_SANS } from '../fonts';

type Props = {
  text: string,
  header?: boolean,
  right?: boolean,
  active?: boolean,
  onClick?: () => void,
};

const styles = {
  wrapperMenu: { padding: 8 },
  menuText: { fontSize: 20, fontFamily: COMIC_SANS },
  activeButton: {
    width: '80%',
    borderRadius: 10,
    // width: 40,
    // borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
  },
};

const MenuButton = (props: Props) => {
  const styleTextBold = props.header ? { fontWeight: 'bold' } : {};
  const styleTextAlign = props.right ? { textAlign: 'right' } : { textAlign: 'center' };
  const styleText = props.active ? {
    ...styles.menuText,
    ...styles.activeButton,
  } : styles.menuText;
  const styleWrapper = props.active ? {
    ...styles.wrapperMenu,
    alignItems: 'center',
  } : styles.wrapperMenu;

  return (
    <ButtonHoverContextProvider
      style={styleWrapper}
      focusStyle={{}}
      onPress={() => props.onClick && props.onClick()}>
      <ButtonHoverContextConsumer>
        {({ focused }) => {
          const styleFocusMenu = focused ? {
            ...styleText,
            ...styleTextBold,
            ...styleTextAlign,
            color: Colors.mainBackground,
          } : {
            ...styleText,
            ...styleTextBold,
            ...styleTextAlign,
          };

          return (
            <Text style={styleFocusMenu}>{props.text}</Text>
          );
        }}
      </ButtonHoverContextConsumer>
    </ButtonHoverContextProvider>
  );
};

export default MenuButton;

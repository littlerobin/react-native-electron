// @flow
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

type Props = {
  title: 'bhsindo' | 'bhsing' | 'mat' | 'ipa' | 'tryout',
  onClick: () => void,
};

const styles = {
  menuView: {
    padding: 16,
  },
  menuIcon: {
    width: 180,
    height: 180,
  },
  menuText: {
    width: 180,
    height: 75,
  },
};

const MenuView = (props: Props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.menuView}
    onPress={props.onClick}>
    <Image source={require(`../../images/assets/img_icon_${props.title}.png`)} style={styles.menuIcon} />
    <Image source={require(`../../images/assets/img_texticon_${props.title}.png`)} style={styles.menuText} />
  </TouchableOpacity>
);

export default MenuView;

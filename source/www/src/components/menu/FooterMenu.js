// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from '../common';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import { RouterContextConsumer } from '../context/router.context';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import type { History } from '../types.shared';

type Props = { isStudent?: boolean, isTeacher?: boolean, props: Object };
type State = {};

const styles = {
  footerView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    width: '100%',
  },
  buttonMenu: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
};
const menus = [
  { imagePath: 'home', navigationUrl: '/main-menu' },
  { imagePath: 'arsip', navigationUrl: '/teacher-archive' },
  { imagePath: 'lainnya', navigationUrl: '/faq' },
];

class FooterMenu extends Component<Props, State> {
  onMenuPress = (history: History, activeMenu: string, navigationUrl: string) => {
    history.transitionTo(navigationUrl, { activeMenu });
  };

  render() {
    const { isStudent, isTeacher, props } = this.props;
    const { activeMenu } = getQueries(props);
    let prefix = 's';

    if (isStudent) {
      prefix = 's';
      delete menus[1];
    } else if (isTeacher) {
      prefix = 't';
    }

    return (
      <View style={styles.footerView}>
        {menus.map(menu => {
          const { imagePath, navigationUrl } = menu;
          const isActive = imagePath === activeMenu;
          const source = isActive
            ? require(`../../images/assets/footer-menu-${imagePath}-${prefix}-active.png`)
            : require(`../../images/assets/footer-menu-${imagePath}-${prefix}.png`);

          return (
            <RouterContextConsumer key={imagePath}>
              {({ history }: { history: History }) => (
                <ButtonHoverContextProvider
                  focusStyle={{}}
                  style={styles.buttonMenu}
                  onPress={() => this.onMenuPress(history, imagePath, navigationUrl)}>
                  <Image source={source} size={50} />
                </ButtonHoverContextProvider>
              )}
            </RouterContextConsumer>
          );
        })}
      </View>
    );
  }
}

export default FooterMenu;

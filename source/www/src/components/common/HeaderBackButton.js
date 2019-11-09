// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Text, Triangle, ButtonRouter } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  title?: string,
  onRightMenuClick?: (history: History) => void,
  ComponentBackButton?: React$Node,
  ComponentMid?: React$Node,
  ComponentRightButton?: React$Node,
  withTriangle: boolean,
  isStudent?: boolean,
};

const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: 8,
  },
  wrapperLeftMenu: {},
  wrapperCenterMenu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  wrapperRightMenu: { justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
};

class HeaderBackButton extends Component<Props> {
  getHeaderContent = () => {
    const {
      title,
      ComponentBackButton,
      ComponentMid,
      ComponentRightButton,
      onRightMenuClick,
      isStudent,
    } = this.props;

    let backgroundColor = null;
    let color = Colors.primary;

    if (isStudent) {
      backgroundColor = Colors.primary;
      color = Colors.yellowBackground;
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        {ComponentBackButton ? ComponentBackButton : (
          <ButtonRouter
            activeOpacity={0.8}
            style={styles.wrapperLeftMenu}
            onPress={(history: History) => {
              history.goBack();
            }}>
            <FontAwesomeIcon icon={faAngleLeft} color={color} size="3x" />
          </ButtonRouter>
        )}
        <View style={styles.wrapperCenterMenu}>
          {ComponentMid}
          {title ? <Text style={[styles.title, { color }]}>{title}</Text> : <View />}
        </View>
        <ButtonRouter
          activeOpacity={0.8}
          style={styles.wrapperRightMenu}
          onPress={(history: History) => onRightMenuClick && onRightMenuClick(history)}>
          {ComponentRightButton}
        </ButtonRouter>
      </View>
    );
  };

  render() {
    return (
      this.props.withTriangle ? (
        <Triangle>
          {this.getHeaderContent()}
        </Triangle>
      ) : this.getHeaderContent()
    );
  }
}

export default HeaderBackButton;

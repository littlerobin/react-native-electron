// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';

const styles = {
  collapseButton: {
    padding: 8,
    height: 65,
    alignSelf: 'center',
    backgroundColor: '#DCECE7',
  },
  collapseIcon: {},
};

type Props = {
  onCollapse: () => void,
  showComponent: boolean,
  side?: 'HORIZONTAL' | 'VERTICAL',
};

const CollapseButton = ({ onCollapse, showComponent, side = 'VERTICAL' }: Props) => {
  let icon;
  let style = styles.collapseButton;

  if (side === 'VERTICAL') {
    icon = showComponent ? faAngleDoubleRight : faAngleDoubleLeft;
    style = {
      ...style,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    };
  } else if (side === 'HORIZONTAL') {
    icon = showComponent ? faAngleDoubleUp : faAngleDoubleDown;
    style = {
      ...style,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingHorizontal: 16,
      position: 'absolute',
      zIndex: 1,
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={.9}
      style={style}
      onPress={onCollapse}>
      <FontAwesomeIcon icon={icon} color="#74BfA9" size="3x" style={styles.collapseIcon} />
    </TouchableOpacity>
  );
};

export default CollapseButton;

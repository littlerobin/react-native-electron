import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../common';
import Colors from '../../utils/colors';

const styles = {
  container: {
    flexDirection: 'column',
    margin: 'auto',
    width: '40%',
    paddingVertical: 8,
  },
  error: {
    color: Colors.red,
    textAlign: 'right',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapperComponent: {
    flex: 1,
  },
};

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function withArchiveFormGroup(Component, { key, field, withRightIcon }) {
  return class extends React.Component<*> {
    static displayName = `archiveFormGroup(${getDisplayName(
      Component
    )})`;

    render() {
      const styleContainer = field.type !== 'select' ? {
        ...styles.container,
        zIndex: -1,
      } : {
        ...styles.container,
        ...(field.zIndex ? { zIndex: field.zIndex } : {}),
      };

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={key}
          style={styleContainer}>
          {field.label && <Text style={styles.labelText}>{field.label}</Text>}
          <View style={styles.wrapperComponent}>
            {React.cloneElement(Component, {
              ...this.props,
              backgroundColor: Colors.white,
            })}
          </View>
        </TouchableOpacity>
      );
    }
  }
}

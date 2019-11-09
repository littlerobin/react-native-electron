import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../utils/colors';

const styles = {
  error: {
    color: Colors.red,
    textAlign: 'right',
  },
};

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function withFormGroup(Component, { key, align, style }) {
  return class extends React.Component<*> {
    static displayName = `formGroup(${getDisplayName(
      Component
    )})`;

    render() {
      const { error, ...props } = this.props;

      return (
        <View
          key={key}
          align={align}
          style={style}>
          {React.cloneElement(Component, {
            ...props,
          })}
          {!!error && <Text style={styles.error}>{`*${error}`}</Text>}
        </View>
      );
    }
  }
}

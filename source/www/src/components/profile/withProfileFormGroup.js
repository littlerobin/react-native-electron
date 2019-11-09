import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../common';
import Colors from '../../utils/colors';

const styles = {
  container: {
    flexDirection: 'row',
    margin: 'auto',
    width: '40%',
  },
  error: {
    color: Colors.red,
    textAlign: 'right',
  },
  labelText: {
    fontSize: 18,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  wrapperComponent: {
    flex: 1,
  },
};

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function withProfileFormGroup(Component, { key, field, withRightIcon }) {
  return class extends React.Component<*> {
    static displayName = `profileFormGroup(${getDisplayName(
      Component
    )})`;

    render() {
      const { ...props } = this.props;

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={key}
          style={styles.container}
          onPress={field.onPress}>
          {field.label && <Text style={styles.labelText}>{field.label}</Text>}
          <View style={styles.wrapperComponent}>
            {React.cloneElement(Component, {
              ...props,
            })}
          </View>
          <FontAwesomeIcon
            icon={faAngleRight}
            color={withRightIcon ? Colors.primary : Colors.transparent}
            size="2x"
          />
        </TouchableOpacity>
      );
    }
  }
}

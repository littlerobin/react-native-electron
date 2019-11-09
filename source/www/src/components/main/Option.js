// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import Colors from '../../utils/colors';

type OptionType = 'A' | 'B' | 'C' | 'D';

type Props = {
  optionLabel: OptionType,
  optionContent: string,
  onClick: (selectedOption: OptionType) => void,
  active: boolean,
};

const styles = {
  wrapperOption: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: Colors.transparent,
    alignItems: 'center',
  },
  focusOption: { borderWidth: 2, borderColor: Colors.white },
  activeOption: { borderWidth: 2, borderColor: Colors.yellow },
  text: { color: Colors.white, fontSize: 18, paddingHorizontal: 4 },
};

class Option extends Component<Props> {
  render() {
    const { optionLabel, optionContent, active, onClick } = this.props;

    return (
      <ButtonHoverContextProvider
        style={styles.wrapperOption}
        focusStyle={styles.focusOption}
        activeStyle={active ? styles.activeOption : null}
        onPress={() => onClick(optionLabel)}>
        <Text style={styles.text}>{`${optionLabel}.`}</Text>
        <Text style={styles.text}>
          <div dangerouslySetInnerHTML={optionContent} />
        </Text>
        <View style={{flex: 1}} />
      </ButtonHoverContextProvider>
    );
  }
}

export default Option;

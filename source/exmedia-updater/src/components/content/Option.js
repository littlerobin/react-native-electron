// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import Colors from '../../utils/colors';

type OptionType = 'A' | 'B' | 'C' | 'D';

type Props = {
  optionLabel: OptionType,
  optionImage: string,
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
  },
  focusOption: { borderWidth: 2, borderColor: Colors.white },
  activeOption: { borderWidth: 2, borderColor: Colors.yellow },
  choice: { color: Colors.white, fontSize: 24 },
};

class Option extends Component<Props> {
  render() {
    return (
      <ButtonHoverContextProvider
        style={styles.wrapperOption}
        focusStyle={styles.focusOption}
        activeStyle={this.props.active ? styles.activeOption : null}
        onPress={() => this.props.onClick(this.props.optionLabel)}>
        <Text style={styles.choice}>{`${this.props.optionLabel}.`}</Text>
        <Image source={this.props.optionImage} />
        <View style={{flex: 1}} />
      </ButtonHoverContextProvider>
    );
  }
}

export default Option;

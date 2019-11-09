// @flow
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { ParamAnswer } from '../types.shared';
import Colors from '../../utils/colors';

type Props = ParamAnswer & {
  isSelected: boolean,
  onMoveNumber: (number: number) => void,
};

const styles = {
  wrapperNumber: {
    flexDirection: 'row',
    flex: 1,
    flexBasis: 'unset',
    padding: 4,
    margin: 4,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
    backgroundColor: Colors.white,
  },
  text: {
    color: Colors.black,
    fontSize: 12,
  },
};

class PageNumber extends Component<Props> {
  onPageNumberClick = (no: number | string) => {
    const page = parseInt(no, 10);
    this.props.onMoveNumber(page);
  };

  render() {
    const { no, answer, isDoubt, correct, isSelected } = this.props;
    let style = styles.wrapperNumber;
    let styleText = isSelected ? { ...styles.text, color: Colors.white } : styles.text;

    if (isSelected) {
      style = {
        ...style,
        backgroundColor: Colors.mainBackground,
      };
    }

    if (isDoubt) {
      style = {
        ...style,
        backgroundColor: Colors.doubt,
      };
    }

    if (typeof correct !== 'undefined') {
      if (correct) {
        style = {
          ...style,
          backgroundColor: Colors.green,
        };
        styleText = {
          ...styleText,
          color: Colors.black,
        };
      } else {
        style = {
          ...style,
          backgroundColor: Colors.red,
        };
        styleText = {
          ...styleText,
          color: Colors.white,
        };
      }
    }

    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => this.onPageNumberClick(no)}
        style={style}>
        <Text style={styleText}>{`${no}. ${answer}`}</Text>
      </TouchableOpacity>
    );
  }
}

export default PageNumber;

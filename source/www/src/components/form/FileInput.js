// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../common';

type Props = {
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  accept?: string,
  ComponentTrigger?: Element<typeof Component>,
};

const styles = {
  inputFile: {
    display: 'none',
  },
};

class FileInput extends Component<Props> {
  static defaultProps = {
    accept: 'image/*',
  };

  inputFileRef = React.createRef();

  onClickButton = () => {
    this.inputFileRef.current.click();
  };

  render() {
    const { onChange, ComponentTrigger, accept } = this.props;
    return (
      <View>
        <input
          ref={this.inputFileRef}
          type="file"
          accept={accept}
          onChange={onChange}
          style={styles.inputFile}
        />
        {ComponentTrigger ? (
            React.cloneElement(ComponentTrigger, {
              onPress: this.onClickButton,
            })
          ) : (
            <TouchableOpacity
              onPress={this.onClickButton}>
              <Text>Upload</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

export default FileInput;

// @flow

import React, { Component } from 'react';
import { Image } from 'react-native';

type Source = string | Object;
type Props = {
  source: Source,
  resizeMode?: 'center' | 'contain' | 'cover' | 'none' | 'repeat' | 'stretch',
  style?: Object,
  size?: number,
};

type State = {
  source: ?Source,
  width: ?number,
  height: ?number,
};

class AutoSizeImage extends Component<Props, State> {
  static defaultProps = {
    resizeMode: 'contain',
  };

  state = {
    source: null,
    width: null,
    height: null,
  };

  componentDidMount() {
    const { source, size } = this.props;

    this.getSize(source, size);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { source, size } = this.props;

    if (source !== prevState.source) {
      this.setState({ source }, () => {
        this.getSize(source, size);
      });
    }
  }

  getSize = (source?: string | Object, size?: number) => {
    Image.getSize(source, (width, height) => {
      let widthSize = width;
      let heightSize = height;
      if (size) {
        const scale = size / 100;
        widthSize = widthSize * scale;
        heightSize = heightSize * scale;
      }

      this.setState({ width: widthSize, height: heightSize });
    });
  }

  render() {
    const width = this.state.width;
    const height = this.state.height;
    const style = {
      ...this.props.style,
      width,
      height,
    };

    return (
      <Image
        {...this.props}
        style={style}
      />
    );
  }
}

export default AutoSizeImage;

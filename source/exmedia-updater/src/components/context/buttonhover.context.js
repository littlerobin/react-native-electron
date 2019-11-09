// @flow

import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Colors from '../../utils/colors';

type Props = {
  children: React$Node,
  style?: any,
  focusStyle?: any,
  activeStyle?: any,
  params?: Object,
};

type State = {
  focused: boolean,
};

const styles = {
  focus: { borderWidth: 2, borderColor: Colors.white },
};

const ButtonHoverContext: Object = React.createContext();

export class ButtonHoverContextProvider extends Component<Props, State> {
  static defaultProps = {
    focusStyle: styles.focus,
  };

  state = {
    focused: false,
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onLeave = () => {
    this.setState({ focused: false });
  };

  render() {
    const {
      style: customStyle,
      focusStyle,
      activeStyle,
      children,
      params,
      ...props
    } = this.props;
    const style = Object.assign(
      {},
      customStyle,
      this.state.focused ? focusStyle : null,
      activeStyle,
    );

    return (
      <ButtonHoverContext.Provider
        value={{
          ...this.state,
          ...(params || {}),
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={style}
          onMouseEnter={this.onFocus}
          onMouseLeave={this.onLeave}
          {...props}>
          {children}
        </TouchableOpacity>
      </ButtonHoverContext.Provider>
    );
  }
}

export const ButtonHoverContextConsumer = ButtonHoverContext.Consumer;

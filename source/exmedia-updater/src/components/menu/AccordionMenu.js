// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MenuButton from './MenuButton';

type Props = {
  text: string,
  children: React$Node,
};
type State = {
  isCollapse: boolean,
};

class AccordionMenu extends Component<Props, State> {
  state = {
    isCollapse: false,
  };

  toggleCollapse = () => {
    this.setState({ isCollapse: !this.state.isCollapse });
  };

  render() {
    return (
      <View>
        <MenuButton text={this.props.text} onClick={this.toggleCollapse} header right />
        {this.state.isCollapse ? this.props.children : null}
      </View>
    );
  }
}

export default AccordionMenu;

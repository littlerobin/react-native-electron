// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import CollapseButton from './CollapseButton';
import { Text } from '../common';
import Timer from '../content/Timer';
import { HamburgerMenu } from '../menu';
import Colors from '../../utils/colors';

type Props = {
  username: string,
  logo: string,
  onTimeoutTimer?: () => void,
};
type State = {
  showHeader: boolean,
};

const styles = {
  container: {
    flexDirection: 'row',
    top: 0,
    padding: 15,
    width: '100%',
  },
  containerLeftHeader: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  containerRightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleUsername: {
    color: Colors.white,
    fontSize: 32,
  },
};

class HeaderBoard extends Component<Props, State> {
  state = {
    showHeader: true,
  };

  _onToggle = () => {
    this.setState({  showHeader: !this.state.showHeader });
  };

  render() {
    const { showHeader } = this.state;
    let style = styles.container;

    return (
      <React.Fragment>
        <CollapseButton onCollapse={this._onToggle} showComponent={showHeader} side="HORIZONTAL" />
        {showHeader && (
          <View style={style}>
            <View style={styles.containerLeftHeader}>
              <Text style={styles.titleUsername}>{this.props.username}</Text>
              <View>
                <Timer onTimeOut={this.props.onTimeoutTimer} />
              </View>
            </View>
            <View style={styles.containerRightHeader}>
              <HamburgerMenu logo={this.props.logo} />
            </View>
          </View>
        )}
        {!showHeader && (
          <View style={{ position: 'absolute', top: '2%', left: '80%' }}>
            <Timer onTimeOut={this.props.onTimeoutTimer} isTransparent />
          </View>
        )}
      </React.Fragment>
    );
  }
}

export default HeaderBoard;

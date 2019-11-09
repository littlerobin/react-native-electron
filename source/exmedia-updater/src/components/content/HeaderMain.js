// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import { withModal, ModalResult } from '../modal';
import Timer from './Timer';
import { Divider } from '../common';
import ProfileInfo from './ProfileInfo';
import type { MatPel } from '../types.shared';

type Props = {
  matpel: MatPel,
  isMainMode: boolean,
  renderModal?: (Props: *) => void,
  mainActionCreator?: Object,
  startTime?: boolean,
};
type State = {
  username: ?string
};

const imgLogoEx = require('../../images/assets/img_logo_ex.png');

const styles = {
  header: { flexDirection: 'row', padding: 15 },
  containerLeftHeader: { paddingVertical: 5, paddingHorizontal: 10 },
  logoImage: { width: 170, height: 50 },
  wrapperLogoMatpel: { paddingVertical: 5, paddingHorizontal: 10 },
  logoMatpel: { width: 60, height: 60 },
  containerRightHeader: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
};

const mapStateToProps = state => ({
  startTime: state.main.startTime,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModal(ModalResult)
@connect(mapStateToProps, mapDispatchToProps)
class HeaderMain extends Component<Props, State> {
  _onTimeOut = () => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.toogleStartTimeAction(false);
  };

  _onStartResumeTimer = () => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.toogleStartTimeAction(true);
  };

  render() {
    const isOpen = this.props.startTime === false;

    return (
      <View style={styles.header}>
        <View style={styles.containerLeftHeader}>
          <Image source={imgLogoEx} style={styles.logoImage} size={30} />
        </View>
        <Divider vertical />
        <View style={styles.containerRightHeader}>
          <View style={styles.wrapperLogoMatpel}>
            <Image
              source={require(`../../images/assets/img_icon_${this.props.matpel}.png`)}
              style={styles.logoMatpel}
            />
          </View>
          {this.props.isMainMode && <Timer onTimeOut={this._onTimeOut} />}
          <ProfileInfo />
        </View>
        {this.props.renderModal && this.props.isMainMode &&
          this.props.renderModal({
            isOpen,
            close: this._onStartResumeTimer,
          })}
      </View>
    );
  }
}

export default HeaderMain;

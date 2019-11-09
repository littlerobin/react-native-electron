// @flow

import React, { Component } from 'react';
import { Page } from '../common';
import { withModal, ModalTryout } from '../modal';
import MenuView from './MenuView_';
import Colors from '../../utils/colors';
import type { MatPel } from '../types.shared';

const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];
type Props = {
  renderModal?: (props: *) => void,
};

type State = { matpel: ?MatPel, openModal: boolean };

@withModal(ModalTryout)
class MenuPage extends Component<Props, State> {
  state = {
    openModal: false,
    matpel: null,
  };

  _onClickMenu = (matpel) => {
    this.setState({ matpel }, () => {
      this.openModal();
    });
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <Page backgroundColor={Colors.mainBackground} flexDirection="row">
        {menus.map(menu => (
          <MenuView
            key={menu}
            title={menu}
            onClick={() => this._onClickMenu(menu)}
          />
        ))}
        {this.props.renderModal &&
          this.props.renderModal({
            matpel: this.state.matpel,
            open: this.state.openModal,
            close: this.closeModal,
          })}
      </Page>
    );
  }
}

export default MenuPage;

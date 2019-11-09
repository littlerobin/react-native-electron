// @flow

import React, {Component} from 'react';
import RModal from 'react-modal';

type Props = {};

class Modal extends Component<Props> {
  render() {
    return (
      <RModal
        {...this.props}
      />
    );
  }
}

export default Modal;

// @flow

import React, { type ComponentType } from 'react';

type PropsWrapper = {};

const withModal =
  (ModalComponent: ComponentType<*>) =>
  (Component: ComponentType<*>) => {
    class ModalWrapper extends React.Component<PropsWrapper> {
      renderModal = (props: Object) => (
        <ModalComponent {...props} />
      );

      render() {
        return <Component {...this.props} renderModal={this.renderModal} />;
      }
    }

    return ModalWrapper;
  }

export default withModal;

// @flow

import React, { Component } from 'react';
import { Modal } from '../common';
import { ShareArchivePage, FormSetTimePage, SuccessNotif } from '../share';

type Props = {
  open: boolean,
  close: Function,
  archiveId: string,
};

type FormModalShare = 'choose-user' | 'choose-time' | 'success-notif';
type State = {
  currentForm: FormModalShare,
  archiveId: string,
  users: Array<{ id: string | number }>,
  startTime: ?date,
  endTime: ?date,
};

const styles = {
  content: {
    width: 400,
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: 3,
    transform: 'translate(-50%, -50%)',
    maxHeight: 400,
  },
};

const ShareArchiveContext: Object = React.createContext();
export const ShareArchiveConsumer = ShareArchiveContext.Consumer;

class ModalShare extends Component<Props, State> {
  state = {
    currentForm: 'choose-user',
    archiveId: this.props.archiveId,
    users: [],
    startTime: new Date(),
    endTime: new Date(),
  };

  goTo = (pageForm: FormModalShare) => {
    this.setState({ currentForm: pageForm });
  };

  onClose = () => {
    this.setState({ currentForm: 'choose-user' }, () => {
      this.props.close();
    });
  };

  setData = (key: 'archiveId' | 'users' | 'startTime' | 'endTime', value: any) => {
    this.setState({ [key]: value });
  };

  render() {
    const { open } = this.props;
    const { currentForm } = this.state;
    let Content;

    switch(currentForm) {
    case 'choose-user':
      Content = <ShareArchivePage />;
      break;
    case 'choose-time':
      Content = <FormSetTimePage />;
      break;
    case 'success-notif':
      Content = <SuccessNotif />;
      break;
    }

    return (
      <Modal
        isOpen={open}
        onRequestClose={this.onClose}
        style={styles}
        ariaHideApp={false}>
        <ShareArchiveContext.Provider
          value={{
            state: this.state,
            setData: this.setData,
            goTo: this.goTo,
            onClose: this.onClose,
          }}>
          {Content}
        </ShareArchiveContext.Provider>
      </Modal>
    );
  }
}

export default ModalShare;

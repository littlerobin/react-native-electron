// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import isElectronRenderer from 'is-electron-renderer';
import Video from '../video';
import type { MatPel, DataQuestion } from '../types.shared';

type Props = {
  matpel: MatPel,
  to: number,
  page: number,
  dataQuestion?: DataQuestion,
};

type State = {
  uri: ?string,
  exists: boolean,
  filename: ?string,
};

const styles = {
  container: { padding: 16, flex: 8 },
};

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;
  const { dataQuestion } = userLessonData[currentMatpel];

  return { dataQuestion };
};

@connect(mapStateToProps)
class TutorialBoard extends Component<Props, State> {
  state = {
    filename: null,
    uri: null,
    exists: false,
  };

  componentDidMount() {
    if (isElectronRenderer) {
      this.requestElectronGetFile();
    }
  }

  componentDidUpdate({ matpel: prevMatpel, page: prevPage, to: prevTo }) {
    const { matpel, page, to } = this.props;
    const isGetFile = matpel !== prevMatpel || page !== prevPage || to !== prevTo;

    if (isElectronRenderer && isGetFile) {
      this.requestElectronGetFile();
    }
  }

  requestElectronGetFile = () => {
    const { matpel, page, dataQuestion } = this.props;
    const { to, page: number } = dataQuestion[page];
    const filename = `${matpel}-to-${to}-no-${number}-tutorial.mp4`;
    let uri = `https://storage.googleapis.com/video-learn/${filename}`;

    const isExists = require('electron').ipcRenderer.sendSync('send-exists-file', { filename });

    if (!isExists) {
      this.setState({ uri, exists: false, filename });
    }

    require('electron').ipcRenderer.on('get-exists-file', (event, arg) => {
      this.setState({ uri: arg, exists: true, filename });
    });
  };

  render() {
    const { exists, uri, filename } = this.state;

    return (
      <View style={styles.container}>
        <Video
          filename={filename}
          source={{ uri }}
          volume={1}
          style={{ width: '100%', height: 400 }}
          showDwnldBtn={!exists}
        />
      </View>
    );
  }
}

export default TutorialBoard;

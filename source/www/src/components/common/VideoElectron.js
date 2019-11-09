// @flow

import React from 'react';
import isElectronRenderer from 'is-electron-renderer';
import Video from '../video';
import config from '../../config';
import { PathConsumer } from '../context/path.context';

type Props = {
  id: string,
  url: string,
};

const VideoElectron = (props: Props) => {
  let exists = false;

  return (
    <PathConsumer>
      {({ paths }) => {
        const uriLocal = `${paths.videoFilePath}/${props.url}`;
        let uri = `${config.GOOGLE_CLOUD_STORAGE_API_URI}/${props.url}`;
        if (isElectronRenderer) {
          exists = require('electron').ipcRenderer.sendSync('is-exists-file', uriLocal);

          if (exists) uri = uriLocal;
        }

        return (
          <Video
            source={{ uri }}
            volume={1}
            style={{width: '100%' }}
            showDwnldBtn={!exists}
          />
        );
      }}
    </PathConsumer>
  );
};

export default VideoElectron;

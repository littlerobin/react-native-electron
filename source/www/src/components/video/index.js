// @flow

import React, { Component } from 'react';
import { createElement, View, TouchableOpacity } from 'react-native';
import Slider from 'react-rangeslider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStop,
  faStopCircle,
  faRedo,
  faVolumeUp,
  faVolumeDown,
  faVolumeOff,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

import DownloadButton from './DownloadButton';
import Colors from '../../utils/colors';

import 'react-rangeslider/lib/index.css';

const STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  STOP: 'STOP',
};

/* $FlowFixMe - the renderItem passed in from SectionList is optional there but
 * required here */
type Props = {
  /* Native only */
  source: Object,
  volume: ?number,
  style: ?PropTypes.StyleSheet,
  showDwnldBtn: ?boolean,
  filename: string,
};
type State = {
  state: 'PLAY' | 'PAUSE' | 'STOP',
  progress: number,
  volume: number,
  opacityControl: number,
  showDwnldBtn: boolean,
  showVolumeControl: boolean,
};

const styles = {
  container: {
    position: 'relative',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.grey,
  },
  control: {
    paddingHorizontal: 4,
  },
  playback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
};

class Video extends Component<Props, State> {
  static getDerivedStateFromProps(props, state) {
    if (String(props.showDwnldBtn) !== String(state.showDwnldBtn)) {
      return {
        ...state,
        showDwnldBtn: props.showDwnldBtn,
      };
    }

    return null;
  }

  state = {
    state: STATE.STOP,
    progress: 0,
    volume: 0,
    opacityControl: 1,
    showVolumeControl: false,
    showDwnldBtn: true,
  };

  componentDidMount() {
    this.initialVideoProp();
  }

  componentDidUpdate({ source: prevSource }) {
    if (prevSource.uri !== this.props.source.uri) {
      this.initialVideoProp();
    }
  }

  initialVideoProp = () => {
    const volume = this._videoRef.current.volume * 100;
    const progress = 0;
    this.setState({ volume, progress, state: STATE.STOP });
    this._videoRef.current.addEventListener('timeupdate', this._updateProgressBar, false);
    this._videoRef.current.addEventListener('ended', this._onEnd, false);
  }

  _videoRef: Object = React.createRef();

  _onPlaybackResume = () => {
    if (this._videoRef.current.paused || this._videoRef.current.ended) {
      this.setState({ state: STATE.PLAY }, () => {
        this._videoRef.current.play();
      });
    } else {
      this.setState({ state: STATE.PAUSE }, () => {
        this._videoRef.current.pause();
      });
    }
  };

  _onEnd = (event) => {
    this.setState({ state: STATE.STOP }, () => {
      this._videoRef.current.pause();
      this._videoRef.current.currentTime = 0;
    });
  };

  _onReset = () => {
    this.setState({ progress: 0, state: STATE.STOP }, () => {
      this._videoRef.current.currentTime = 0;
    });
  };

  _updateProgressBar = () => {
    const percentage = Math.floor((100 / this._videoRef.current.duration) * this._videoRef.current.currentTime);
    this.setState({ progress: percentage });
  };

  _renderTooltipVolume = () => (
    <View className='slider-vertical' style={{ position: 'absolute', bottom: 10, left: '25%' }}>
      <Slider
        min={0}
        max={100}
        value={this.state.volume}
        orientation="vertical"
        onChange={this.handleChangeVolume}
      />
    </View>
  );

  handleChangeProgress = (value: number) => {
    this.setState({ progress: value }, () => {
      const time = this._videoRef.current.duration * value / 100;
      this._videoRef.current.currentTime = time;
    });
  };

  handleChangeVolume = (value: number) => {
    this.setState({ volume: value }, () => {
      const volume = value / 100;
      this._videoRef.current.volume = volume;
    });
  };

  toggleTooltipVolume = () => {
    this.setState({ showVolumeControl: !this.state.showVolumeControl });
  };

  handleFullScreen = () => {
    if (this._videoRef.current.requestFullscreen) {
      this._videoRef.current.requestFullscreen();
    } else if (this._videoRef.current.mozRequestFullScreen) {
      this._videoRef.current.mozRequestFullScreen();
    } else if (this._videoRef.current.webkitRequestFullscreen) {
      this._videoRef.current.webkitRequestFullscreen();
    } else if (this._videoRef.current.msRequestFullscreen) {
      this._videoRef.current.msRequestFullscreen();
    }
  };

  render() {
    const { source, filename, volume, style } = this.props;
    let iconState = faStop;
    let iconVolume = faVolumeUp;

    if (this.state.state === STATE.PLAY) {
      iconState = faPause;
    } else if (this.state.state === STATE.PAUSE) {
      iconState = faPlay;
    } else if (this.state.state === STATE.STOP) {
      iconState = faPlay;
    }

    if (this.state.volume >= 50) {
      iconVolume = faVolumeUp;
    } else if (this.state.volume > 0 && this.state.volume < 50) {
      iconVolume = faVolumeDown;
    } else if (this.state.volume === 0) {
      iconVolume = faVolumeOff;
    }

    return (
      <View
        style={styles.container}
        onMouseEnter={() => this.setState({ opacityControl: 1 })}
        onMouseLeave={() => this.setState({ opacityControl: 0.2 })}>
        {createElement('video', {
          ref: this._videoRef,
          src: source.uri || source,
          volume,
          controls: false,
          controlsList: "nodownload",
          style,
        })}
        <TouchableOpacity
          onPress={this._onPlaybackResume}
          style={[styles.playback, { opacity: this.state.opacityControl }]}>
          <FontAwesomeIcon icon={iconState} color={Colors.primary} size="lg" />
        </TouchableOpacity>
        <View style={[styles.controls, { opacity: this.state.opacityControl }]}>
          <Slider
            min={0}
            max={100}
            value={this.state.progress}
            onChange={this.handleChangeProgress}
          />
          <TouchableOpacity onPress={this._onReset} style={styles.control}>
            <FontAwesomeIcon icon={faRedo} color={Colors.primary} size="lg" />
          </TouchableOpacity>
          <View>
            {this.state.showVolumeControl ? this._renderTooltipVolume() : null}
            <TouchableOpacity onPress={this.toggleTooltipVolume} style={styles.control}>
              <FontAwesomeIcon icon={iconVolume} color={Colors.primary} size="lg" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this._onEnd} style={styles.control}>
            <FontAwesomeIcon icon={faStopCircle} color={Colors.primary} size="lg" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleFullScreen} style={styles.control}>
            <FontAwesomeIcon icon={faExpandArrowsAlt} color={Colors.primary} size="lg" />
          </TouchableOpacity>
          {this.state.showDwnldBtn ? (
            <DownloadButton
              source={source}
              filename={filename}
              style={styles.control}
              onAfterDownload={() => this.setState({ showDwnldBtn: false })}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default Video;

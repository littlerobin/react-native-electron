// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import Colors from '../../utils/colors';
import { secondsToTime } from '../../utils/timer';

type Props = {
  mainActionCreator?: Object,
  startTime?: boolean,
  time?: number,
  onTimeOut?: () => void,
};
type State = {};

const styles = {
  wrapper: {
    borderWidth: 2,
    borderColor: Colors.white,
    padding: 8,
    justifyContent: 'center',
    width: '12%',
  },
  text: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
};

const mapStateToProps = state => ({
  time: state.main.time,
  startTime: state.main.startTime,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Timer extends Component<Props, State> {
  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps: Props) {
    const isStartTimer = prevProps.startTime !== this.props.startTime && this.props.startTime;
    const isStopTimer = prevProps.startTime !== this.props.startTime && !this.props.startTime;

    if (isStartTimer) {
      this.timer = null;
      this.startTimer();
    } else if (isStopTimer) {
      if (this.timer !== null) clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    if (this.timer !== null) clearInterval(this.timer);
  }

  timer: ?IntervalID = null;

  countDown = () => {
    const time = this.props.time || -1;
    // Check if we're at zero.
    if (time <= 0) {
      if (this.timer !== null) clearInterval(this.timer);
      this.props.onTimeOut && this.props.onTimeOut();
    }

    // Remove one second, set state so a re-render happens.
    const seconds = time - 1;

    this.props.mainActionCreator &&
      this.props.mainActionCreator.updateTimeAction(seconds);
  }

  startTimer = () => {
    if (this.timer === null) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
    const { h, m, s } = secondsToTime(this.props.time || -1);

    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          {`${h}:${m}:${s}`}
        </Text>
      </View>
    );
  }
}

export default Timer;

// @flow
import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import variables from '../ui/variables';

type Props = { message: string, status: 'success' | 'error' };
type State = { show: boolean };

const ContainerNotif = styled.div`
  background-color: ${props =>
    props.status === 'error' ? variables.colorRedLight : variables.colorGreenBright};
  padding-left: ${variables.largerSize};
  padding-right: ${variables.largerSize};
  padding-top: ${variables.mediumSize};
  padding-bottom: ${variables.mediumSize};
  text-align: center;
  color: ${variables.colorWhite};
  border-radius: ${variables.largeSize};
  font-size: ${variables.fontSizeMedium};
  position: fixed;
  right: ${variables.largerSize};
  top: ${variables.largestSize};
  z-index: ${variables.zIndexNotification};
  max-width: 250px;
`;

const FadeTransition = styled.div`
  opacity: 0;
  transition: all 0.9s;
  ${props => props.delay && `transition-delay: ${props.delay}ms`};
  ${props =>
    (props.state === 'entering' || props.state === 'entered') &&
    `
    opacity: 1;
  `};
`;
const durationOnShow = 100;
const durationStayShow = 2000;

class Notification extends React.Component<Props, State> {
  timeout: ?TimeoutID
  state = {
    show: false,
  };

  componentDidMount() {
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        this.setState({ show: true }, () => {
          setTimeout(() => {
            this.setState({ show: false });
          }, durationStayShow)
        });
      }, durationOnShow);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    return (
      <Transition
        enter={!this.state.show}
        in={this.state.show}
        timeout={{ enter: 1000, exit: 1000 }}>
        {(state) => (
          <FadeTransition state={state} delay={100}>
            <ContainerNotif status={this.props.status}>
              {this.props.message}
            </ContainerNotif>
          </FadeTransition>
        )}
      </Transition>
    );
  }
}

export default Notification;

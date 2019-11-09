// @flow
import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Transition } from 'react-transition-group';
import HeroSlider from './HeroSlider';

const Container = styled.div`
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 60px;
  padding: 50px 0;
  ${breakpoint('tablet')`
    padding: 144px 96px;
    margin: 0;
  `};
  @media only screen and (max-device-width: 480px){
    padding-bottom: 750px;
  }
`;

const InnerContainer = styled.div`
  padding: 100px 24px;
  ${breakpoint('tablet')`
    padding: 0;
  `};
`;

const WordsTransition = styled.div`
  opacity: 0;
  transition: all 0.6s;
  margin-bottom: 40px;

  ${props =>
    (props.state === 'entering' || props.state === 'entered') &&
    `
    opacity: 1;
  `};
`;

type Props = {};

type State = {
  wordsVisible: boolean,
  deviceVisible: boolean,
  backgroundVisible: boolean,
};

class Hero extends React.Component<Props, State> {
  state = {
    wordsVisible: false,
    deviceVisible: false,
    backgroundVisible: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        wordsVisible: true,
        deviceVisible: true,
      });
    }, 150);

    setTimeout(() => {
      this.setState({
        backgroundVisible: true,
      });
    }, 900);
  }

  render() {
    return (
      <Container>
        <InnerContainer>
          <Transition in={this.state.wordsVisible} timeout={600}>
            {state => (
              <WordsTransition state={state}>
                <HeroSlider />
              </WordsTransition>
            )}
          </Transition>
        </InnerContainer>
      </Container>
    );
  }
}

export default Hero;

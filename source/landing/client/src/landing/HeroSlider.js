// @flow
import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Transition } from 'react-transition-group';
import variables from '../ui/variables';

import pic1 from './img/exmedia/5.png';
import pic2 from './img/exmedia/6.png';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 190px;
  z-index: ${variables.zIndexHeroSlider};
  ${breakpoint('tablet')`
    height: 200px;
  `};
`;

const ContainerSliding = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 360px;
  height: 190px;
  pointer-events: none;
  transform: translateX(-50%);
  transition: all 0.6s;

  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeMassive};
    height: 200px;
  `};

  ${props =>
    props.state === 'entering' &&
    `
      transform: translateX(-50%) translateY(0);
      transition-delay: .3s;
    `};
  ${props =>
    props.state === 'entered' &&
    `
      transform: translateX(-50%) translateY(0);
    `};
  ${props =>
    props.state === 'exiting' &&
    `
      transform: translateX(-50%) translateY(150%);
    `};
  ${props =>
    props.state === 'exited' &&
    `
      transform: translateX(-50%) translateY(150%);
  `};
`;

const Image = styled.img`
  width: 100%;
`;

type Props = {};

type State = {
  activeSlide: number,
};

const listPic = [pic1, pic2];

class HeroSlider extends React.Component<Props, State> {
  intervalId: any;

  state = {
    activeSlide: 0,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const nextSlide =
        this.state.activeSlide >= listPic.length - 1
          ? 0
          : this.state.activeSlide + 1;
      this.setState({ activeSlide: nextSlide });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Container>
        {listPic.map((pic, i) => (
          <Transition key={i} in={i === this.state.activeSlide} timeout={1200}>
            {state => (
              <ContainerSliding key={i} state={state}>
                <Image src={pic} />
              </ContainerSliding>
            )}
          </Transition>
        ))}
      </Container>
    );
  }
}

export default HeroSlider;

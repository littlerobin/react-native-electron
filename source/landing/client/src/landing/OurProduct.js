// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import photoProduct1 from './img/exmedia/10_.png';
import photoProduct2 from './img/exmedia/11_.png';

import ScrollToTarget from './ScrollToTarget';

import variables from '../ui/variables';

const Container = styled.div`
  margin-bottom: 96px;
  ${breakpoint('tablet')`
    margin-bottom: 240px;
  `};
`;

const InnerContainer = styled.div`
  text-align: center;
  ${breakpoint('tablet')`
    width: 800px;
    margin: 0 auto;
  `};
`;

const Heading = styled.div`
  font-family: ${variables.fontPrimaryBold};
  font-weight: ${variables.fontWeightBold};
  font-size: ${variables.fontSizeLargest};
  line-height: 1.2;
  margin-bottom: 24px;
  color: ${variables.colorRed};
  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeHuge};
    letter-spacing: -1px;
  `};
`;

const VisualContainer = styled.div`
  position: relative;
  ${breakpoint('tablet')`
    height: 480px;
    margin-bottom: 120px;
  `};
`;

const ImageContainer = styled.div`
  ${breakpoint('tablet')`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${variables.zIndexCardImage};
    width: 720px;
    height: 480px;
  `};
`;

const Image = styled.img`
  width: 100%;
`;

const PlasticContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: -60px;
  @media (max-width: 340px) {
    transform: scale(0.9);
  }
  ${breakpoint('tablet')`
    position: absolute;
    top: auto;
    bottom: 0px;
    left: 30%;
    margin: 0;
    z-index: ${variables.zIndexCardPlastic};
    transform: none;
  `};
`;

const ImageTransition = styled.div`
  opacity: 0;
  transform: translateX(-100%);
  transition: transform 0.9s, opacity 0.6s;
  ${props =>
    (props.state === 'entering' || props.state === 'entered') &&
    `
    opacity: 1;
    transform: translateX(0);
  `};
`;

const PlasticTransition = styled.div`
  opacity: 0;
  transform: translateX(192px);
  transition: transform 0.9s, opacity 0.6s;
  ${props =>
    (props.state === 'entering' || props.state === 'entered') &&
    `
    opacity: 1;
    transform: translateX(0);
  `};
`;

type Props = {};

type State = {
  isCardVisible: boolean,
  isTextVisible: boolean,
};

class OurProduct extends React.Component<Props, State> {
  state = {
    isCardVisible: false,
    isTextVisible: false,
  };

  handleCardEnter = () => {
    this.setState({ isCardVisible: true });
  };

  handleCardLeave = () => {
    this.setState({ isCardVisible: false });
  };

  handleTextEnter = () => {
    this.setState({ isTextVisible: true });
  };

  handleTextLeave = () => {
    this.setState({ isTextVisible: false });
  };

  render() {
    return (
      <ScrollToTarget hash="#our-product" pos="center">
        <Container>
          <InnerContainer>
            <Waypoint
              onEnter={this.handleCardEnter}
              onLeave={this.handleCardLeave}
              topOffset="5%"
              bottomOffset="20%"
            >
              <VisualContainer>
                <Transition in={this.state.isCardVisible} timeout={2000}>
                  {state => (
                    <div>
                      <ImageContainer>
                        <ImageTransition state={state}>
                          <Image src={photoProduct1} alt="" />
                        </ImageTransition>
                      </ImageContainer>
                      <PlasticContainer>
                        <PlasticTransition state={state}>
                          <Image src={photoProduct2} alt="" />
                        </PlasticTransition>
                      </PlasticContainer>
                    </div>
                  )}
                </Transition>
              </VisualContainer>
            </Waypoint>
            <Heading>Produk Kami</Heading>
          </InnerContainer>
        </Container>
      </ScrollToTarget>
    );
  }
}

export default OurProduct;

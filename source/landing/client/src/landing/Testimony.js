// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import Waypoint from 'react-waypoint';
import Slider from 'react-slick';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ScrollToTarget from './ScrollToTarget';
import variables from '../ui/variables';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  margin-bottom: 48px;
  ${breakpoint('tablet')`
    margin-bottom: 96px;
  `};
`;

const InnerContainer = styled.div`
  text-align: center;
  padding: 0 24px;
  ${breakpoint('tablet')`
    width: 800px;
    margin: 0 auto;
    text-align: center;
  `};
`;

const Heading = styled.div`
  font-family: ${variables.fontPrimaryBold};
  font-weight: ${variables.fontWeightBold};
  font-size: ${variables.fontSizeLarger};
  line-height: 1.2;
  margin-bottom: 24px;
  color: ${variables.colorRed};
  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeLargest};
    letter-spacing: 1px;
  `};
`;

const Body = styled.div`
  color: ${variables.colorNeutral};
  font-family: ${variables.fontPrimary};
  line-height: 1.4;
  margin-bottom: 24px;
  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeNormal};
    margin-bottom: 36px;
  `};
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

const ContainerTestimonyCard = styled.div`
  display: flex !important;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
const TestimonyCard = styled.div`
  flex: 0 0 auto;
  width: 30%;
  border: ${props =>
    props.red ?
      `2px solid ${variables.colorRed}` :
      `2px solid ${variables.colorNeutralDarkest}`};
  padding: ${variables.largeSize};
  border-radius: ${variables.largeSize};
  margin: ${variables.mediumSize};
`;

type Props = {};

type State = {
  isVisible: boolean,
};

const styles = {
  arrowButton: {
    backgroundColor: variables.colorRed
  },
};

const testimonies = [
  [
    { index: 1, period: 'angkatan 2017/2018', footer: '(M Ilham, SMPN 207)', content: '"Alhamdulilah kak, hari ini UN berjalan lancar jaya dan saya tambah percaya diri. Berkat exmedia saya sangat terbantu kak, makasi."' },
    { index: 2, period: 'angkatan 2017/2018', footer: '(Fahmi, SMPN 130)', content: '"Saya peringkat 2 USBN kak! Makasi kak. Sekarang saya akan berusaha masuk ke SMAN. Sekali lagi makasi ya kak."' },
    { index: 3, period: 'angkatan 2017/2018', footer: '(M Durmuji, SMPN 170)', content: '"Hasil UN saya: Bahasa Indonesia 86, Bahasa Inggris 98, Matematika 70, IPA 85. Makasi kak exmedia-nya!"' },
  ],
  [
    { index: 4, period: 'angkatan 2018/2019', footer: '(Firdaus, SMPN 287)', content: '"Sore ka, aku mau ngasi tau aja barusan aku nyobain exmedia nya, seruuu bangettttt kaa! Terima kasih ya ka udah ngenalin produk kaka ke saya."' },
    { index: 5, period: 'angkatan 2018/2019', footer: '(Trimulyani, SMPN 172)', content: '"Ka saya berterimakasih sekali, saya lebih mudah untuk mengingat pelajaran lalu dengan Exmedia. Tidak sia-sia saya membeli Exmedia."' },
    { index: 6, period: 'angkatan 2018/2019', footer: '(Versa B., SMPN 73)', content: '"Kakk seneng banget nilai ipa 84, bhs inggris 94, mtk 80, b indonesia 88. Seneng banget! Dulu nggak pernah dapet diatas 80 gitu. Pas belajar pake exmedia nilainya di atas 80 semuaa."' },
  ],
];

class Testimony extends React.Component<Props, State> {
  state = {
    isVisible: true,
  };

  handleWaypointEnter = () => {
    this.setState({ isVisible: true });
  };

  handleWaypointLeave = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const nextArrow = <label style={styles.arrowButton}>Next</label>;
    const prevArrow = <label style={styles.arrowButton}>Prev</label>;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow,
      prevArrow,
    };

    return (
      <ScrollToTarget hash="#testimony" pos="center">
        <Waypoint
          onEnter={this.handleWaypointEnter}
          onLeave={this.handleWaypointLeave}
          topOffset="5%"
          bottomOffset="20%"
        >
          <Container>
            <Transition in={this.state.isVisible} timeout={2000}>
              {state => (
                <InnerContainer>
                  <FadeTransition state={state} delay={150}>
                    <Heading>APA PENDAPAT MEREKA TENTANG KAMI?</Heading>
                  </FadeTransition>
                  <FadeTransition state={state} delay={300}>
                    <Body>
                      <Slider {...settings}>
                        {testimonies.map(testimony => (
                          <ContainerTestimonyCard>
                            {testimony.map(testi => {
                              const isRed = testi.index % 2 === 1;

                              return (
                                <TestimonyCard red={isRed}>
                                  {testi.content}
                                  <br /> <br />
                                  {testi.footer}
                                  <br />
                                  <b>{testi.period}</b>
                                </TestimonyCard>
                              );
                            })}
                          </ContainerTestimonyCard>
                        ))}
                      </Slider>
                    </Body>
                  </FadeTransition>
                </InnerContainer>
              )}
            </Transition>
          </Container>
        </Waypoint>
      </ScrollToTarget>
    );
  }
}

export default Testimony;

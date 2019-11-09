// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
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
  color: ${variables.colorRed};
  margin-bottom: 24px;
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
    font-size: ${variables.fontSizeMedium};
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

const ContainerHistoryCompany = styled.div`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const YearHistoryCompany = styled.div`
  color: ${variables.colorNeutral};
  padding-left: 8px;
  padding-right: 8px;
`;
const ActionHistoryCompany = styled.div`
  text-align: justify;
  padding-left: 8px;
  padding-right: 8px;
`;

type Props = {};

type State = {
  isVisible: boolean,
};

class AboutUs extends React.Component<Props, State> {
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
    return (
      <ScrollToTarget hash="#about-us" pos="center">
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
                  <FadeTransition state={state} delay={0} />
                  <FadeTransition state={state} delay={150}>
                    <Heading>APA YANG SUDAH KAMI LAKUKAN?</Heading>
                  </FadeTransition>
                  <FadeTransition state={state} delay={300}>
                    <Body>
                      <ContainerHistoryCompany>
                        <YearHistoryCompany>2012</YearHistoryCompany>
                        <ActionHistoryCompany>
                          Exmedia mulai dirintis dengan merek dagang sebagai <i>software</i> yang menyediakan kumpulan soal-soal latihan UN, dilangkapi dengan video pembahasan dan dikemas dalam DVD dan Flashdisk.
                        </ActionHistoryCompany>
                      </ContainerHistoryCompany>
                      <ContainerHistoryCompany>
                        <YearHistoryCompany>2013</YearHistoryCompany>
                        <ActionHistoryCompany>
                          Exmedia menggunakan browser google chrome sebagai <i>platform</i> untuk pembelajarannya dan terus mengembangkan sistem latihan belajar yang lebih baik lagi.
                        </ActionHistoryCompany>
                      </ContainerHistoryCompany>
                      <ContainerHistoryCompany>
                        <YearHistoryCompany>2015</YearHistoryCompany>
                        <ActionHistoryCompany>
                          PT Global Prima Solusindo berdiri sebagai badan hukum yang menaungi Exmedia sekaligus mendaftarkan hak cipta Exmedia. Di tahun ini, Exmedia juga pertama kali mengeluarkan sistem <i>random</i> untuk latihan soal-soal UN secara <i>offline</i>.
                        </ActionHistoryCompany>
                      </ContainerHistoryCompany>
                      <ContainerHistoryCompany>
                        <YearHistoryCompany>2016</YearHistoryCompany>
                        <ActionHistoryCompany>
                          Exmedia mengembangkan <i>software</i> latihan UNBK berbasis <i>local server</i> dan digunakan pertama kali di final Kompetisi IPA SMP Se-Jakarta 2016
                        </ActionHistoryCompany>
                      </ContainerHistoryCompany>
                      <ContainerHistoryCompany>
                        <YearHistoryCompany>2017</YearHistoryCompany>
                        <ActionHistoryCompany>
                          Exmedia dipercaya mengadakan Uji Coba Ujian Nasional Berbasis Komputer (UCUNBK) serentak pertama di DKI Jakarta untuk tingkat SMP dengan total peserta sekitar 300 sekolah (SMP Negeri dan Swasta serta beberapa MTs) dengan jumlah siswa yang mengikuti sebanyak 30.000 siswa
                        </ActionHistoryCompany>
                      </ContainerHistoryCompany>
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

export default AboutUs;

// @flow
import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import SocialIcons from './SocialIcons';

import variables from '../ui/variables';
import phoneIcon from './img/exmedia/aArtboard-5.png';
// import lineIcon from './img/exmedia/bArtboard-5.png';

const Container = styled.div`
  padding: 48px 0;
  ${breakpoint('tablet')`
    padding: 60px 0;
  `};
`;

const InnerContainer = styled.div`
  border-top: 1px solid ${variables.colorNeutralSemiLight};
  ${breakpoint('tablet')`
    width: 960px;
    margin: 0 auto;
  `};
  ${breakpoint('desktop')`
    width: 1152px;
  `};
`;

// const ItemAnchor = ItemLink.withComponent('a');

const SocialContainer = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const CompanyContainer = styled.div`
  text-align: center;
  padding: 9px 0;
  ${breakpoint('tablet')`
    padding: 12px 0;
  `};
`;

const Company = styled.div`
  color: ${variables.colorNeutralDark};
  font-size: ${variables.fontSizeNormal};
  padding-top: ${variables.mediumSize};
  padding-bottom: ${variables.mediumSize};
`;

const CompanyAddress = styled.div`
  width: 300px;
  margin: 0 auto;
  color: ${variables.colorNeutralDark};
  font-size: ${variables.fontSizeSmall};
  padding-top: ${variables.mediumSize};
  padding-bottom: ${variables.mediumSize};
`;

const IconImage = styled.img`
  width: 30px;
  padding-right: 10px;
`;

const Row = styled.div`
  display: table;
  margin: 0 auto;
`;

const Col = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export const Footer = () => (
  <Container>
    <InnerContainer>
      <SocialContainer>
        <SocialIcons />
      </SocialContainer>

      <CompanyContainer>
        <Company>PT Global Prima Solusindo</Company>
        <CompanyAddress>
          Ruko Garden Shopping Arcade Blok B/8DH, Jl. Let. Jend. S. Parman Kav. 28, Podomoro City, Jakarta Barat, 11470
        </CompanyAddress>
        <Company>
          <Row>
            <Col>
              <IconImage src={phoneIcon} alt="" />
            </Col>
            <Col>
              <div>0838 999 89 555</div>
              <div>0895 40497 5678</div>
            </Col>
          </Row>
        </Company>
      </CompanyContainer>
    </InnerContainer>
  </Container>
);

export default Footer;

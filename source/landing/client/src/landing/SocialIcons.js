// @flow
import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Facebook from './img/exmedia/cArtboard-5.png';
import Instagtam from './img/exmedia/dArtboard-5.png';

const Container = styled.div``;

const InnerContainer = styled.div`
  display: inline-block;
  ${breakpoint('tablet')`
  `};
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  ${breakpoint('tablet')`
  `};
`;

const Icon = styled.div`
  flex: 0 0 21px;
  width: 21px;
  margin: 0 12px;
  opacity: 0.25;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  ${breakpoint('tablet')`
    &:hover {
      opacity: .5;
  `};
`;

const Link = styled.a``;

const IconImage = styled.img`
  width: 100%;
`;

export const SocialIcons = () => (
  <Container>
    <InnerContainer>
      <Icons>
        <Icon>
          <Link href="https://www.facebook.com/Exmedia-480506542399406" target="_blank">
            <IconImage src={Facebook} alt="Facebook" />
          </Link>
        </Icon>
        <Icon>
          <Link href="https://www.instagram.com/exmedia.id" target="_blank">
            <IconImage src={Instagtam} alt="Instagram" />
          </Link>
        </Icon>
      </Icons>
    </InnerContainer>
  </Container>
);

export default SocialIcons;

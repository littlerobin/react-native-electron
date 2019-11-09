// @flow
import React from 'react';
import { Button } from './ui';
import styled from 'styled-components';
import variables from '../ui/variables';

const Container = styled.div`
  max-width: 400px;
  margin: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = Button.extend`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 0px;
  font-size: ${variables.fontSizeLarge};
  @media only screen and (max-device-width: 480px){
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const OrderButton = () => (
  <Container>
    <InnerContainer>
      <StyledButton
        color="red"
        onClick={() => {}}
      >
        PEMESANAN
      </StyledButton>
    </InnerContainer>
  </Container>
);

export default OrderButton;

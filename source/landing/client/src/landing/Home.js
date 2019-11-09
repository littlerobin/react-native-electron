// @flow
import React from 'react';
import styled from 'styled-components';
import qs from 'querystring';
import Notification from './Notification';
import OurProduct from './OurProduct';
import ContactUs from './ContactUs';
import Hero from './Hero';
import ScrollToTarget from './ScrollToTarget';
import variables from '../ui/variables';
import AboutUs from './AboutUs';
import Testimony from './Testimony';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${variables.colorWhite};
`;

export const Home = (props: any) => {
  const urlQuery = props.location.search.replace('?', '');
  const params = qs.parse(urlQuery);
  const messageEmailSent = params.message;

  return (
    <ScrollToTarget hash="#home" pos="top">
      <Container>
        {messageEmailSent && (
          <Notification status={params.status} message={messageEmailSent} />
        )}
        <Hero />
        <AboutUs />
        <OurProduct />
        <Testimony />
        <ContactUs />
      </Container>
    </ScrollToTarget>
  );
};

export default Home;

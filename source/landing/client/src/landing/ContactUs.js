// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ScrollToTarget from './ScrollToTarget';
import variables from '../ui/variables';
import { Button } from './ui';

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

const Form = styled.form``;

const FormContainer = styled.div``;

const InputContainer = styled.div`
  padding-top: ${variables.mediumSize};
  padding-bottom: ${variables.mediumSize};
`;

const ButtonContainer = styled.div``;

const Input = styled.input`
  font-family: ${variables.fontPrimary};
  font-size: ${variables.fontSizeNormal};
  width: 80%;
  margin-right: 18px;
  padding: 7px 0;
  border: 0;
  border-bottom: 2px solid ${variables.colorNeutralLight};
  outline: 0;
  &:focus {
    border-color: ${variables.colorRed};
  }
`;

const TextArea = styled.textarea`
  font-family: ${variables.fontPrimary};
  font-size: ${variables.fontSizeNormal};
  width: 80%;
  margin-right: 18px;
  padding: 7px 0;
  border: 0;
  border-bottom: 2px solid ${variables.colorNeutralLight};
  outline: 0;
  &:focus {
    border-color: ${variables.colorRed};
  }
`;

type Props = {};

type State = {
  isVisible: boolean,
  form: {
    name: ?string,
    email: ?string,
    phone: ?string,
    message: ?string,
  },
};

class ContactUs extends React.Component<Props, State> {
  state = {
    isVisible: true,
    form: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  };

  handleWaypointEnter = () => {
    this.setState({ isVisible: true });
  };

  handleWaypointLeave = () => {
    this.setState({ isVisible: false });
  };

  onChangeForm = (key: string, value: string) => {
    this.setState({
      form: { ...this.state.form, [key]: value }
    });
  };

  render() {
    return (
      <ScrollToTarget hash="#contact-us" pos="center">
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
                    <Heading>MARI TERKONEKSI DENGAN KAMI</Heading>
                  </FadeTransition>
                  <FadeTransition state={state} delay={300}>
                    <Form
                      action="/send-email"
                      method="post"
                      target="_blank"
                    >
                      <FormContainer>
                        <InputContainer>
                          <Input
                            type="text"
                            value={this.state.form.name}
                            placeholder="Nama Lengkap"
                            name="name"
                            onChange={(e) => this.onChangeForm('name', e.target.value)}
                            required
                          />
                        </InputContainer>
                        <InputContainer>
                          <Input
                            type="email"
                            value={this.state.form.email}
                            placeholder="Alamat Email"
                            name="email"
                            onChange={(e) => this.onChangeForm('email', e.target.value)}
                            required
                          />
                        </InputContainer>
                        <InputContainer>
                          <Input
                            type="text"
                            value={this.state.form.phone}
                            placeholder="Nomor Handphone"
                            name="phone"
                            onChange={(e) => this.onChangeForm('phone', e.target.value)}
                            required
                          />
                        </InputContainer>
                        <InputContainer>
                          <TextArea
                            value={this.state.form.message}
                            placeholder="Pesan"
                            name="message"
                            onChange={(e) => this.onChangeForm('message', e.target.value)}
                            required
                          />
                        </InputContainer>
                        <ButtonContainer>
                          <Button type="submit" color="gradient" fluid>
                            Kirim
                          </Button>
                        </ButtonContainer>
                      </FormContainer>
                    </Form>
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

export default ContactUs;

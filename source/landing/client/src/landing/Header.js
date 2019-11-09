// @flow
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Logo from './Logo';
import variables from '../ui/variables';

const Container = styled.div`
  overflow: hidden;
  position: fixed;
  z-index: ${variables.zIndexHeader};
  width: 100%;
  padding: 0 18px;
  background: ${props =>
    props.withBackground ? 'rgba(255, 255, 255, .9)' : 'transparent'};
  box-shadow: ${props =>
    props.withBackground ? variables.boxShadowNeutralSmall : 'none'};
  transition: all 0.3s;
  ${breakpoint('tablet') `
    padding: 0 48px;
  `};
`;

const InnerContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  ${breakpoint('tablet') `
    height: 72px;
  `};
`;

const LeftNavContainer = styled.div`
  display: none;
  ${breakpoint('tablet') `
    flex: 60%;
    display: flex;
    justify-content: flex-start;
  `};
`;

const RightNavContainer = styled.div`
  display: none;
  ${breakpoint('tablet') `
    flex: 40%;
    display: flex;
    justify-content: flex-end;
  `};
`;

const Nav = styled.div``;

const NavItem = styled.div`
  display: inline-block;
  margin-left: ${props => (props.marginLeft ? '12px' : '0')};
  margin-right: 10px;
`;

const NavLink = styled(Link) `
  color: ${props =>
    props.status === 'active' ? variables.colorRed : variables.colorNeutral};
  border-bottom: ${props =>
    props.status === 'active' ? '3px solid #f20' : ''};
  font-size: ${variables.fontSizeSmall};
  font-family: ${variables.fontMyraidBold};
  line-height: 1;
  text-transform: uppercase;
  ${breakpoint('tablet') `
    padding: 12px 18px;
    &:hover {
      color: ${variables.colorRedDark};
      text-decoration: none;
    }
  `};
`;

type Props = {
  location: Object,
  withBackground: ?boolean,
  listMenu: ?Array<Object>,
};

type State = {
  forceBackground: boolean,
};

class Header extends React.Component<Props, State> {
  state = {
    forceBackground: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const forceBackground = this.props.location.pathname !== '/';

    if (prevState.forceBackground !== forceBackground) {
      this.setState({ forceBackground });
    }
  }

  render() {
    const activeMenu = this.props.location.hash;
    const listMenu = this.props.listMenu || [];

    return (
      <Container
        withBackground={this.props.withBackground || this.state.forceBackground}
      >
        <InnerContainer>
          <LeftNavContainer>
            <NavItem>
              <Link to="/#home">
                <Logo />
              </Link>
            </NavItem>

            <Nav>
              {listMenu
                .filter(menu => menu.position === 'left')
                .map(menu => {
                  return (
                    <NavItem key={menu.label}>
                      <NavLink
                        to={menu.link}
                        status={activeMenu === menu.link ? 'active' : 'deactive'}
                      >
                        {menu.label}
                      </NavLink>
                    </NavItem>
                  )
                }
              )}
            </Nav>
          </LeftNavContainer>

          <RightNavContainer>
            <Nav>
              {listMenu
                .filter(menu => menu.position === 'right')
                .map(menu => (
                  <NavItem key={menu.label}>
                    <NavLink
                      to={menu.link}
                      status={activeMenu === menu.link ? 'active' : 'deactive'}
                    >
                      {menu.label}
                    </NavLink>
                  </NavItem>
                )
              )}
            </Nav>
          </RightNavContainer>
        </InnerContainer>
      </Container>
    );
  }
}

export default withRouter(Header);

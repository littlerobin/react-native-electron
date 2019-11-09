// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import { withModal, ModalTryout } from '../modal';
import { Divider } from '../common';
import { RouterContextConsumer } from '../context/router.context';
// import { PersistorConsumer } from '../context/persistor.context';
import {
  ButtonHoverContextProvider,
  ButtonHoverContextConsumer,
} from '../context/buttonhover.context';
import AccordionMenu from './AccordionMenu';
import MenuButton from './MenuButton';
import Colors from '../../utils/colors';
import { removeStore } from '../../utils/store';
import type { MatPel, History, UserPickLesson, Persistor } from '../types.shared';
import data from '../../data';
import { createDataTryout } from '../../utils/dataQuestion';

type Props = {
  currentMatpel: MatPel,
  userPickLesson: UserPickLesson,
  mainActionCreator?: Object,
  renderModal?: (props: Object) => void,
};
type State = {
  active: boolean,
  matpel: ?MatPel,
  openModal: boolean,
};

const styles = {
  wrapperMenuHamburger: { justifyContent: 'center', paddingHorizontal: 8 },
  menuHamburger: { borderWidth: 2, borderColor: Colors.white, padding: 12 },
  backgroundMenu: { borderWidth: 2, borderColor: Colors.mainBackground, backgroundColor: Colors.white },
  tooltip: { position: 'absolute', top: 80, right: 0, padding: 16, width: 240 },
  additionalTooltip: {
    position: 'absolute',
    top: -20,
    right: 0,
    bottom: '100%',
    backgroundColor: Colors.mainBackground,
    borderBottomWidth: 20,
    borderBottomColor: Colors.white,
    borderLeftWidth: 24,
    borderLeftColor: Colors.transparent,
    borderRightWidth: 24,
    borderRightColor: Colors.transparent,
  },
  containerMenu: { position: 'relative' },
  wrapperButtonMenuTo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  wrapperButtonMenuMatpel: { paddingVertical: 8 },
};

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;

  return {
    currentMatpel,
    userPickLesson: userLessonData[currentMatpel],
  };
};

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModal(ModalTryout)
@connect(mapStateToProps, mapDispatchToProps)
class HamburgerMenu extends Component<Props, State> {
  state = {
    active: false,
    matpel: null,
    openModal: false,
  };

  onMenuClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleCourseClick = (matpel: MatPel) => {
    this.setState({ active: false, matpel, openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  handleTryoutClick = (index: number, history: History) => {
    const currentMatpel = this.props.currentMatpel;
    const toId = index + 1;
    const lessonData = data[currentMatpel];
    const dataQuestion = createDataTryout(toId, lessonData.totalQuestion);

    if (this.props.mainActionCreator) {
      this.props.mainActionCreator.resetTimeAction();
      this.props.mainActionCreator.resetAnswerAction();
      this.props.mainActionCreator.setLessonData({
        matpel: currentMatpel,
        to: toId,
        dataQuestion,
      });
    }

    this.setState({ active: false });
    history.push({ pathname: '/main' }, { page: 1 });
  };

  handleLogout = async (persistor: Persistor, history: History) => {
    await persistor.flush();
    await persistor.purge();

    removeStore('token');
    removeStore('username');
    removeStore('class');

    history.replace('/splash');
  };

  goMainMenu = (history: History) => {
    history.replace('/manu');
  };

  renderTooltip = () => {
    // const matpel = this.props.currentMatpel;
    // const lessonData = data[matpel];
    // const tryouts = lessonData.tryouts || [];
    const { to } = this.props.userPickLesson;

    return (
      <View style={[styles.backgroundMenu, styles.tooltip]}>
        <View style={styles.additionalTooltip} />
        <View style={styles.containerMenu}>
          <AccordionMenu text="Tryout">
            <View style={styles.wrapperButtonMenuTo}>
              {/* {tryouts.map((tryout, idx) => {
                const { to } = this.props.userPickLesson;
                const toId = idx + 1;
                const isActive = to === toId;

                return (
                  <View key={tryout} style={{width: 'calc(100% * (1/3))'}}>
                    <RouterContextConsumer>
                      {({ history }) => (
                        <MenuButton
                          active={isActive}
                          text={toId.toString()}
                          onClick={() => this.handleTryoutClick(idx, history)}
                        />
                      )}
                    </RouterContextConsumer>
                  </View>
                );
              })} */}

              <View style={{width: 'calc(100% * (1/2))'}}>
                <RouterContextConsumer>
                  {({ history }) => (
                    <MenuButton
                      active={to === 10}
                      text="Bonus TO 1"
                      onClick={() => this.handleTryoutClick(9, history)}
                    />
                  )}
                </RouterContextConsumer>
              </View>

              <View style={{width: 'calc(100% * (1/2))'}}>
                <RouterContextConsumer>
                  {({ history }) => (
                    <MenuButton
                      active={to === 11}
                      text="Bonus TO 2"
                      onClick={() => this.handleTryoutClick(10, history)}
                    />
                  )}
                </RouterContextConsumer>
              </View>
            </View>
          </AccordionMenu>
          <Divider />
          <AccordionMenu text="Mata Pelajaran">
            <View style={styles.wrapperButtonMenuMatpel}>
              <MenuButton text="BAHASA INDONESIA" right onClick={() => this.handleCourseClick('bhsindo')} />
              <MenuButton text="BAHASA INGGRIS" right onClick={() => this.handleCourseClick('bhsing')} />
              <MenuButton text="MATEMATIKA" right onClick={() => this.handleCourseClick('mat')} />
              <MenuButton text="IPA" right onClick={() => this.handleCourseClick('ipa')} />
            </View>
          </AccordionMenu>
          <Divider />
          <RouterContextConsumer>
            {({ history }) => (
              <MenuButton
                text="Keluar"
                header
                right
                onClick={() => {
                  this.goMainMenu(history);
                }}
              />
            )}
          </RouterContextConsumer>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapperMenuHamburger}>
        <ButtonHoverContextProvider
          focusStyle={{}}
          onPress={() => this.onMenuClick()}>
          <ButtonHoverContextConsumer>
            {({focused}) => {
              const style = Object.assign(
                {},
                styles.menuHamburger,
                focused ? styles.backgroundMenu : null,
              );
              const iconFocusColor = focused ? Colors.mainBackground : Colors.white;

              return (
                <View style={style}>
                  <FontAwesomeIcon icon={faBars} color={iconFocusColor} />
                </View>
              );
            }}
          </ButtonHoverContextConsumer>
        </ButtonHoverContextProvider>
        {this.state.active ? this.renderTooltip() : null}
        {this.props.renderModal &&
          this.props.renderModal({
            matpel: this.state.matpel,
            open: this.state.openModal,
            close: this.closeModal,
          })}
      </View>
    );
  }
}

export default HamburgerMenu;

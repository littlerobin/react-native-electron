// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ModalConfirmationFinish, ModalResult } from '../modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import type { ParamAnswer } from '../types.shared';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    right: 0,
    margin: -16,
    paddingLeft: 2,
    backgroundColor: Colors.white,
  },
  collapseButton: {
    padding: 8,
    height: 65,
    alignSelf: 'center',
    backgroundColor: '#DCECE7',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  collapseIcon: {},
  flatList: {
    borderLeftColor: Colors.white,
    borderLeftWidth: 1,
  },
  columnWrapper: {
    borderWidth: 1,
    borderColor: Colors.mainBackground,
  },
  wrapperNumber: {
    flexDirection: 'row',
    width: 50,
    padding: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftColor: '#1EA684',
    borderRightColor: '#1EA684',
    borderBottomColor: '#1EA684',
    backgroundColor: '#DCECE7',
  },
  focusWrapperNumber: {
    borderWidth: 1,
    borderColor: Colors.mainBackground,
  },
  containerHeader: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.white,
    backgroundColor: Colors.mainBackground,
  },
  headerText: {
    color: Colors.white,
    textAlign: 'center',
    paddingVertical: 4,
    fontSize: 16,
  },
  text: {
    color: Colors.black,
    fontSize: 12,
  },
  containerFooter: {
    backgroundColor: Colors.red,
    paddingVertical: 4,
  },
  footerText: {
    color: Colors.white,
    textAlign: 'center',
  },
};

class PageNumber extends Component<ParamAnswer> {
  onPageNumberClick = (history, no) => {
    const page = parseInt(no, 10);
    history.transitionTo('/main', { page });
  };

  render() {
    const { no, answer, isDoubt, correct } = this.props;
    return (
      <RouterContextConsumer>
        {({ history }) => {
          const { page } = history.getCurrentState();
          const isSelected = parseInt(no, 10) === page;
          let style = styles.wrapperNumber;
          let styleText = isSelected ? { ...styles.text, color: Colors.white } : styles.text;

          if (isSelected) {
            style = {
              ...style,
              backgroundColor: Colors.mainBackground,
            };
          }

          if (isDoubt) {
            style = {
              ...style,
              backgroundColor: Colors.doubt,
            };
          }

          if (typeof correct !== 'undefined') {
            if (correct) {
              style = {
                ...style,
                backgroundColor: Colors.green,
              };
              styleText = {
                ...styleText,
                color: Colors.black,
              };
            } else {
              style = {
                ...style,
                backgroundColor: Colors.red,
              };
              styleText = {
                ...styleText,
                color: Colors.white,
              };
            }
          }

          return (
            <ButtonHoverContextProvider
              onPress={() => this.onPageNumberClick(history, no)}
              focusStyle={{}}
              style={style}>
              <Text style={styleText}>{`${no}. ${answer}`}</Text>
            </ButtonHoverContextProvider>
          )
        }}
      </RouterContextConsumer>
    );
  }
}

const CollapseButton = ({
  onCollapse,
  showPageNumber,
}: {
  onCollapse: () => void,
  showPageNumber: boolean,
}) => {
  const styleButtonCollapse = showPageNumber ? {right: 16} : {right: -16};
  const icon = showPageNumber ? faAngleDoubleRight : faAngleDoubleLeft;

  return (
    <TouchableOpacity activeOpacity={1} style={[styles.collapseButton, styleButtonCollapse]} onPress={onCollapse}>
      <FontAwesomeIcon icon={icon} color="#74BfA9" size="3x" style={styles.collapseIcon} />
    </TouchableOpacity>
  );
};

type Props = {
  data: Array<ParamAnswer>,
  renderModal?: (props: Object) => void,
  isMainMode: boolean,
};
type State = {
  showPageNumber: boolean,
  isOpenConfirmation: boolean,
  isOpenModalResult: boolean,
};

class PageNumberList extends Component<Props, State> {
  state = {
    showPageNumber: true,
    isOpenConfirmation: false,
    isOpenModalResult: false,
  };

  _onToggle = () => {
    this.setState({ showPageNumber: !this.state.showPageNumber });
  };

  _onOpenModalConfirmation = () => {
    this.setState({ isOpenConfirmation: true });
  };

  _onCloseModalConfirmation = () => {
    this.setState({ isOpenConfirmation: false });
  };

  closeModalResult = () => {
    this.setState({ isOpenModalResult: false });
  };

  _getTotalUnAnswer = () =>
    this.props.data.filter(item => item.answer === '').length;

  _getTotalDoubtAnswer = () =>
    this.props.data.filter(item => item.isDoubt).length;

  render() {
    return (
      <View style={styles.wrapper}>
        <CollapseButton onCollapse={this._onToggle} showPageNumber={this.state.showPageNumber} />
        {this.state.showPageNumber && (
          <View style={styles.container}>
            <View style={styles.containerHeader}>
              <Text style={styles.headerText}>JAWABAN</Text>
            </View>
            <FlatList
              keyExtractor={item => item.no}
              data={this.props.data}
              style={styles.flatList}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }: { item: ParamAnswer }) => (
                <PageNumber no={item.no} answer={item.answer} isDoubt={item.isDoubt} correct={item.correct} />
              )}
            />
            {this.props.isMainMode && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this._onOpenModalConfirmation}
                style={styles.containerFooter}>
                <Text style={styles.footerText}>SELESAI</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <ModalConfirmationFinish
          totalUnAnswer={this._getTotalUnAnswer()}
          totalDoubtAnswer={this._getTotalDoubtAnswer()}
          isOpen={this.state.isOpenConfirmation}
          close={this._onCloseModalConfirmation}
        />
        <ModalResult
          isOpen={this.state.isOpenModalResult}
          close={this.closeModalResult}
        />
      </View>
    );
  }
}

export default PageNumberList;

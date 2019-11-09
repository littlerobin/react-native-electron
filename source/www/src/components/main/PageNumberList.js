// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import PageNumber from './PageNumber';
import CollapseButton from './CollapseButton';
import { ModalConfirmationFinish, withModal } from '../modal';
import Colors from '../../utils/colors';
import type { ParamAnswer } from '../types.shared';

const styles = {
  wrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    height: '100%',
    alignItems: 'center',
    zIndex: -1,
  },
  container: {
    right: 0,
    paddingLeft: 2,
    backgroundColor: Colors.white,
    width: '100%',
  },
  flatList: {
    width: '93%',
    marginVertical: 8,
  },
  columnWrapper: {
    borderWidth: 1,
    borderColor: Colors.mainBackground,
  },
  containerHeader: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.white,
    backgroundColor: Colors.mainBackground,
    padding: 8,
  },
  headerText: {
    color: Colors.white,
    textAlign: 'center',
    paddingVertical: 4,
    fontSize: 16,
  },
  containerFooter: {
    backgroundColor: Colors.red,
    paddingVertical: 4,
    marginVertical: 8,
  },
  footerText: {
    color: Colors.white,
    textAlign: 'center',
  },
};

type Props = {
  data: Array<ParamAnswer>,
  activeNo: number,
  onMoveNumber: (number: number) => void,
  renderModal?: (Props: *) => void,
};
type State = {
  showPageNumber: boolean,
  showModalConfirmation: boolean,
};

@withModal(ModalConfirmationFinish)
class PageNumberList extends Component<Props, State> {
  state = {
    showPageNumber: false,
    showModalConfirmation: false,
  };

  _onToggle = () => {
    this.setState({ showPageNumber: !this.state.showPageNumber });
  };

  _onFinishButton = () => {
    this.setState({ showModalConfirmation: true });
  };

  _onCloseModalConfirmation = () => {
    this.setState({ showModalConfirmation: false });
  };

  _getTotalUnAnswer = () =>
    this.props.data.filter(item => item.answer === '').length;

  _getTotalDoubtAnswer = () =>
    this.props.data.filter(item => item.isDoubt).length;

  render() {
    const { showPageNumber } = this.state;
    const { data, activeNo, onMoveNumber } = this.props;
    const styleWrapper = showPageNumber ? {
      ...styles.wrapper,
      width: '100%',
    } : styles.wrapper;
    const numColumns = data.length / 10;
    return (
      <View style={styleWrapper}>
        <CollapseButton onCollapse={this._onToggle} showComponent={showPageNumber} />
        {showPageNumber && (
          <View style={styles.container}>
            <FlatList
              keyExtractor={item => item.no}
              data={data}
              numColumns={numColumns}
              style={styles.flatList}
              renderItem={({ item }: { item: ParamAnswer }) => (
                <PageNumber
                  no={item.no}
                  answer={item.answer}
                  isSelected={item.no === activeNo}
                  isDoubt={item.isDoubt}
                  correct={item.correct}
                  onMoveNumber={onMoveNumber}
                />
              )}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this._onFinishButton}
              style={styles.containerFooter}>
              <Text style={styles.footerText}>SELESAI</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.props.renderModal &&
          this.props.renderModal({
            totalUnAnswer: this._getTotalUnAnswer(),
            totalDoubtAnswer: this._getTotalDoubtAnswer(),
            isOpen: this.state.showModalConfirmation,
            close: this._onCloseModalConfirmation,
          })}
      </View>
    );
  }
}

export default PageNumberList;

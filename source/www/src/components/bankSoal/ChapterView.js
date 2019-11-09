// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import archiveAction from '../../actions/archive';
import { RouterContextConsumer } from '../context/router.context';
import { Text } from '../common';
import Colors from '../../utils/colors';

type Props = {
  name: string,
  isArchive?: any,
  archiveActionCreator?: {
    setChapterArchiveAction: ({
      chapter: string,
    }) => void,
  },
};

const styles = {
  container: {
    marginVertical: 4,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
  },
};

const mapStateToProps = ({ archive }) => ({
  ...archive,
});

const mapDispatchToProps = dispatch => ({
  archiveActionCreator: bindActionCreators(archiveAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ChapterView extends Component<Props> {
  render() {
    const { name, isArchive } = this.props;

    return (
      <RouterContextConsumer>
        {({ history }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={() => {
              if (isArchive === 'true') {
                this.props.archiveActionCreator &&
                  this.props.archiveActionCreator.setChapterArchiveAction({ chapter: name });
              }
              history.transitionTo('/question', { chapter: name, isArchive })
            }}>
            <Text style={styles.label}>{`${name}`}</Text>
          </TouchableOpacity>
        )}
      </RouterContextConsumer>
    );
  }
}

export default ChapterView;

// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../common';
import { ShareArchiveConsumer } from '../modal/ModalShare';
import Colors from '../../utils/colors';

const styles = {
  containerHeader: {
    flexDirection: 'row',
    padding: 10,
    zIndex: -1,
  },
  closeButton: {},
  wrapperText: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

const ShareArchiveHeader = ({ close, title }: { title: string, close: Function }) => (
  <View style={styles.containerHeader}>
    <View style={styles.wrapperText}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
    <ShareArchiveConsumer>
      {({ onClose }) => (
        <TouchableOpacity activeOpacity={.8} onPress={onClose} style={styles.closeButton}>
          <FontAwesomeIcon icon={faTimes} size="2x" color={Colors.primary} />
        </TouchableOpacity>
      )}
    </ShareArchiveConsumer>
  </View>
);

export default ShareArchiveHeader;

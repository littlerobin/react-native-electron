// @flow
import React from 'react';
import { View } from 'react-native';
import ShareArchiveFooter from './ShareArchiveFooter';
import { ShareArchiveConsumer } from '../modal/ModalShare';
import { Text } from '../common';

const styles = {
  text: { paddingVertical: 16, fontWeight: 'bold' },
};

const SuccessNotif = () => (
  <View style={{ width: '100%', alignItems: 'center' }}>
    <Text style={styles.text}>SOAL SUDAH BERHASIL DIBAGIKAN</Text>
    <ShareArchiveConsumer>
      {(context) => (
        <ShareArchiveFooter
          title="OK"
          onClick={() => context.onClose()}
        />
      )}
    </ShareArchiveConsumer>
  </View>
);

export default SuccessNotif;

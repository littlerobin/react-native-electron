// @flow

import React from 'react';
import { View } from 'react-native';
import { Text } from '../common';
import { Page, PageConsumer } from '../common/Page';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

const styles = {
  container: { width: '100%', padding: 16, flex: 1 },
  title: {
    paddingVertical: 32,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  header: {
    paddingVertical: 16,
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    paddingVertical: 8,
    color: Colors.black,
    fontSize: 16,
  },
};

type Props = {};
const FAQ = (props: Props) => (
  <Page
    backgroundColor={Colors.grey}
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser }) => (
        <React.Fragment>
          <View style={styles.container}>
            <Text
              style={styles.title}>
              Pengaturan Lainnya
            </Text>
            <Text
              style={styles.header}>
              KEBIJAKAN PRIVASI
            </Text>
            <Text
              style={styles.paragraph}>
              Equivalen adalah sebuah platform di bidang pendidikan yang hadir untuk mendukung dan membantu
              guru serta siswa dalam menyikapi perkembangan teknologi digital dalam proses belajar mengajar.
              Equivalen berada di bawah wewenang PT Global Prima Solusindo. Dengan mengakses dan menggunakan
              aplikasi equivalen, berarti Anda telah paham dan menyetujui semua perarturan yang berlaku di dalam
              Equivalen.
            </Text>
            <Text
              style={styles.paragraph}>
              Kebijakan Privasi ini bertujuan untuk membantu Anda memahami data yang kami kumpulkan, alasan kami
              mengumpulkannya, dan yang kami lakukan dengan data tersebut. Ini penting; kami harap Anda meluangkan
              waktu untuk membacanya dengan saksama.
            </Text>
            <Text
              style={styles.header}>
              SYARAT & KETENTUAN
            </Text>
            <Text
              style={styles.header}>
              FAQ
            </Text>
          </View>
          <FooterMenu
            isTeacher={currentUser.isTeacher}
            props={props}
          />
        </React.Fragment>
      )}
    </PageConsumer>
  </Page>
);

export default FAQ;

// @flow

import React from 'react';
import { View } from 'react-native';
import { Text, Image, ButtonRouter } from '../common';

const styles = {
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerStudyTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  headerStudySubtitle: {
    fontStyle: 'italic',
  },
  wrapperMatpel: {
    flexDirection: 'row',
  },
};

type MatpelButtonProps = {
  title: 'bhsindo' | 'bhsing' | 'mat' | 'ipa' | 'tryout',
  courseId: string,
};

const stylesMatpelButton = {
  menuView: {
    padding: 16,
  },
  menuIcon: {
    width: 180,
    height: 180,
  },
  menuText: {
    width: 180,
    height: 75,
  },
};

const MatpelButton = (props: MatpelButtonProps) => (
  <ButtonRouter
    activeOpacity={0.8}
    style={stylesMatpelButton.menuView}
    onPress={(history) => history.transitionTo('student-tutorial', { courseId: props.courseId })}>
    <Image
      source={require(`../../images/assets/img_icon_${props.title}.png`)}
      size={50}
      style={stylesMatpelButton.menuIcon}
    />
    <Image
      source={require(`../../images/assets/img_texticon_${props.title}.png`)}
      size={50}
      style={stylesMatpelButton.menuText}
    />
  </ButtonRouter>
);

export const HeaderStudy = () => (
  <View style={styles.container}>
    <Text style={styles.headerStudyTitle}>
      Fakta no. 1: BELAJAR ITU NGGAK NGEBOSENIN!
    </Text>
    <Text style={styles.headerStudySubtitle}>
      Mau ngebuktiin? Segera pilih mata pelajaran dan topik yang mau kamu pelajari sekarang juga.
    </Text>
    <View style={styles.wrapperMatpel}>
      <MatpelButton title="bhsindo" courseId="1" />
      <MatpelButton title="bhsing" courseId="2" />
      <MatpelButton title="mat" courseId="3" />
      <MatpelButton title="ipa" courseId="4" />
    </View>
  </View>
);

type Props = {};
const StudentStudyView = (props: Props) => (
  <View />
);

export default StudentStudyView;

// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import get from 'lodash/get';
import StudentTutorialView, { StudentTutorialHeaderSection } from './StudentTutorialView';
import { HeaderBackButton, Divider } from '../common';
import { convertArrayToSectionListData } from '../../utils/convertArray';

type Props = {
  data: Object,
};

class StudentTutorialListView extends Component<Props> {
  render() {
    const { data } = this.props;
    const videoTutorials = get(data, 'videoTutorials', []);
    const sections = convertArrayToSectionListData(
      videoTutorials,
      ['question.questionInfos[0].course.name', 'question.questionInfos[0].chapter.name']
    );

    return (
      <React.Fragment>
        <HeaderBackButton isStudent withTriangle />
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          SectionSeparatorComponent={Divider}
          ItemSeparatorComponent={null}
          renderItem={({item, index, section}) => (
            <StudentTutorialView {...item} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <StudentTutorialHeaderSection title={title} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default StudentTutorialListView;

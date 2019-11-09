// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  SummaryArchiveHeaderSection,
  SectionSeparator,
  SummaryArchiveView,
  SummaryArchiveFooterComponent,
  SummaryArchiveHeaderComponent,
} from './SummaryArchiveView';
import { HeaderBackButton, Loading } from '../common';
import Colors from '../../utils/colors';
import { convertObjToArr } from '../../utils/convertArray';
import type { History } from '../types.shared';
import { QUERY_GET_ARCHIVES } from '../gql.shared';

type Props = {
  createArchiveRule?: Object,
  currentPackage?: number,
};

const MUTATION_CREATE_ARCHIVE = gql`
  mutation CreateArchive($archive: ArchiveInput) {
    createArchive(archive: $archive) {
      id
    }
  }
`;

const mapStateToProps = ({ archive }) => ({
  ...archive,
});

@connect(mapStateToProps)
class SummaryArchiveListView extends Component<Props> {
  getFooterComponent = () => (
    <Mutation
      mutation={MUTATION_CREATE_ARCHIVE}
      refetchQueries={() => [{ query: QUERY_GET_ARCHIVES }]}>
      {(mutate, { loading, error }) => (
        <React.Fragment>
          {loading && <Loading type="equivalen" color="default" transparent />}
          <SummaryArchiveFooterComponent mutate={mutate} loadingMutate={loading} />
        </React.Fragment>
      )}
    </Mutation>
  );

  render() {
    const {
      createArchiveRule,
      currentPackage = 0,
    } = this.props;
    const selectedQuestions = get(
      createArchiveRule,
      `packages[${currentPackage}]`,
      {}
    );
    const data = convertObjToArr(selectedQuestions, 'sectionList',
      (returnValue) => {
        const dataWithoutFiltered = convertObjToArr(
          returnValue.data,
          'array',
        );
        const data = dataWithoutFiltered.filter(d => d.selected)

        return {
          title: returnValue.title,
          data,
        };
      });

    return (
      <React.Fragment>
        <HeaderBackButton
          ComponentRightButton={
            currentPackage === 1 ? (
              <FontAwesomeIcon
                icon={faTimes}
                color={Colors.primary}
                size="2x"
              />
            ) : null
          }
          onRightMenuClick={(history: History) => {
            history.replace('/main-menu');
          }}
        />
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderItem={({item, index, section: {title}}) => (
            <SummaryArchiveView {...item} title={title} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <SummaryArchiveHeaderSection title={title} />
          )}
          SectionSeparatorComponent={SectionSeparator}
          ListHeaderComponent={<SummaryArchiveHeaderComponent />}
          ListFooterComponent={this.getFooterComponent()}
        />
      </React.Fragment>
    );
  }
}

export default SummaryArchiveListView;

// @flow

import React from 'react';
import { Page } from '../common/Page';
import CurriculumView from './CurriculumView';
import { getQueries } from '../../utils/router';

type Props = {};

const CurriculumPage = (props: Props) => {
  const { type, isArchive } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <CurriculumView
        urlTitle={type}
        isArchive={isArchive}
      />
    </Page>
  );
}

export default CurriculumPage;

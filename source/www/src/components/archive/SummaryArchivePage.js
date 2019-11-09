// @flow

import React from 'react';
import SummaryArchiveListView from './SummaryArchiveListView';
import { Page } from '../common/Page';

type Props = {};

const SummaryArchivePage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <SummaryArchiveListView />
  </Page>
);

export default SummaryArchivePage;

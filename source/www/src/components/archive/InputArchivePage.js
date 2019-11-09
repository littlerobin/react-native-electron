// @flow

import React from 'react';
import InputArchiveView from './InputArchiveView';
import { Page } from '../common/Page';

type Props = {};

const MyArchivePage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <InputArchiveView />
  </Page>
);

export default MyArchivePage;

// @flow

import React from 'react';
import { HeaderBackButton } from '../common';
import InputArchiveForm from './InputArchiveForm';

type Props = {};

const InputArchiveView = (props: Props) => (
  <React.Fragment>
    <HeaderBackButton />
    <InputArchiveForm />
  </React.Fragment>
);

export default InputArchiveView;

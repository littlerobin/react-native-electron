// @flow

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import withArchiveFormGroup from './withArchiveFormGroup';
import { RouterContextConsumer } from '../context/router.context';
import archiveAction from '../../actions/archive';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  archiveActionCreator?: {
    setArchiveRuleAction: (params: Object) => void,
  },
};

const QUERY_GET_EVALUATION = gql`
  query getEvaluations {
    evaluations {
      id
      type
    }
  }
`;

const QUERY_GET_QUESTION_TYPE = gql`
  query getQuestionTypes {
    questionTypes {
      id
      name
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  archiveActionCreator: bindActionCreators(archiveAction, dispatch),
});

@connect(null, mapDispatchToProps)
class InputArchiveForm extends Component<Props> {
  getFieldMap = () => [
    {
      key: 'name',
      type: 'text',
      label: 'NAMA PAKET',
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'evaluations',
      type: 'select',
      label: 'JENIS EVALUASI',
      query: QUERY_GET_EVALUATION,
      fieldMap: { value: 'id', label: 'type' },
      zIndex: 3,
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'totalPackages',
      type: 'select',
      label: 'JUMLAH PAKET',
      options: [
        { label: '1 Paket', value: 1 },
        { label: '2 Paket', value: 2 },
        { label: '3 Paket', value: 3 },
        { label: '4 Paket', value: 4 },
      ],
      zIndex: 2,
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'questionTypes',
      type: 'select',
      label: 'JENIS SOAL',
      query: QUERY_GET_QUESTION_TYPE,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 1,
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'totalQuestions',
      type: 'number',
      label: 'JUMLAH SOAL',
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'minimumScore',
      type: 'number',
      label: 'NILAI MINIMUM',
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
    {
      key: 'archiveSubmit',
      type: 'submit',
      text: 'PILIH SOAL',
      style: {
        backgroundColor: Colors.primary,
        padding: 16,
        width: '40%',
        alignSelf: 'flex-end',
      },
      textStyle: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
      },
      component: (element: React$Node, field: Object) =>
        withArchiveFormGroup(element, {
          key: field.key,
          field,
        }),
    },
  ];

  onSubmit = (data: Object, history: History) => {
    const name = get(data, 'name');
    const evaluationId = get(data, 'evaluations.id', 0);
    const totalPackages = get(data, 'totalPackages.value', 0);
    const questionType = get(data, 'questionTypes.value', 0);
    const totalQuestions = get(data, 'totalQuestions', 0);
    const minimumScore = parseFloat(get(data, 'minimumScore', 0));
    const params= { name, evaluationId, totalPackages, questionType, totalQuestions, minimumScore };
    this.props.archiveActionCreator &&
      this.props.archiveActionCreator.setArchiveRuleAction(params);

    history.transitionTo('/curriculum', { type: 'bank-soal', isArchive: true });
  };

  render() {
    return (
      <RouterContextConsumer>
        {({ history }: { history: History }) => (
          <FormEngine
            fields={this.getFieldMap()}
            onSubmit={(data) => this.onSubmit(data, history)}
          />
        )}
      </RouterContextConsumer>
    );
  }
}

export default InputArchiveForm;

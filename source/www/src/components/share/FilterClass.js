// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import { Select } from '../form';
import gql from 'graphql-tag';
import type { Option } from '../types.shared';

type Props = { handleFilter?: (key: string, value: string) => void };
type State = {
  grade?: { value: string, label: string },
  class?: { value: string, label: string },
};

const QUERY_GET_GRADES = gql`
  query getGrades {
    grades {
      id
      name
    }
  }
`;
const QUERY_GET_CLASS = gql`
  query getClasses($grade: GradeInput) {
    classes(grade: $grade) {
      id
      name
    }
  }
`;
const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  wrapperGrade: {
    flex: 2,
    paddingHorizontal: 2,
  },
  wrapperClass: {
    flex: 1,
    paddingHorizontal: 2,
  },
};

class FilterClass extends Component<Props, State> {
  state = {
    grade: null,
    class: null,
  };

  onChangeSelect = (key, selected) => {
    this.setState({ [key]: selected }, () => {
      const id = selected.value;
      const keyParent = `${key}Id`;
      this.props.handleFilter && this.props.handleFilter(keyParent, id);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperGrade}>
          <Select
            name="grades"
            placeholder="Select Grade"
            fieldMap={{ value: 'id', label: 'name' }}
            query={QUERY_GET_GRADES}
            value={this.state.grade}
            onChange={(selected: Option) => {
              this.onChangeSelect('grade', selected);
              this.setState({ class: null });
            }}
          />
        </View>
        <View key={JSON.stringify(this.state.grade)} style={styles.wrapperClass}>
          <Select
            name="classes"
            placeholder="Select Kelas"
            fieldMap={{ value: 'id', label: 'name' }}
            params={{ grade: { id: get(this.state, 'grade.value', '') } }}
            query={QUERY_GET_CLASS}
            value={this.state.class}
            onChange={(selected: Option) => this.onChangeSelect('class', selected)}
          />
        </View>
      </View>
    );
  }
}

export default FilterClass;

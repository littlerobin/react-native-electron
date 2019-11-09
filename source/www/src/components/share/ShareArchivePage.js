// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading } from '../common';
import ShareArchiveHeader from './ShareArchiveHeader';
import FilterClass from './FilterClass';
import ShareArchiveListView from './ShareArchiveListView';

type Props = {};
type State = {
  gradeId: ?string,
  classId: ?string,
};

const QUERY_GET_USER_BY_CLASS = gql`
  query QueryGetUserByClass(
    $class: ClassesInput
  ) {
    users (
      limit: 100
      offset: 0
      isStudent: true
      class: $class
    ) {
      id
      fullName
    }
  }
`;

class ShareArchivePage extends Component<Props, State> {
  state = {
    gradeId: null,
    classId: null,
  };

  onChangeFilter = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <React.Fragment>
        <ShareArchiveHeader title="BAGI KE" />
        <FilterClass handleFilter={this.onChangeFilter} />
        <Query
          query={QUERY_GET_USER_BY_CLASS}
          variables={{
            class: {
              id: this.state.classId,
            },
          }}>
          {({ data, loading }) =>
            loading ? (
              <Loading />
            ) : (
              <ShareArchiveListView
                key={this.state.classId}
                data={data}
                needRefresh
              />
            )
          }
        </Query>
      </React.Fragment>
    );
  }
}

export default ShareArchivePage;

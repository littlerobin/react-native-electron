// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import ShareArchiveView from './ShareArchiveView';
import ShareArchiveFooter from './ShareArchiveFooter';
import CheckAllStudent from './CheckAllStudent';
import { ShareArchiveConsumer } from '../modal/ModalShare';
import { convertArrToObj, convertObjToArr } from '../../utils/convertArray';

type Props = {
  data: Object,
  needRefresh: boolean,
};

class ShareArchiveListView extends Component<Props> {
  state = {
    data: {},
    needRefresh: this.props.needRefresh,
  };

  componentDidMount() {
    this.setState({
      data: this.setData(this.props.data),
    });
  }

  componentDidUpdate({ data: prevData }, { needRefresh: prevNeedRefresh }) {
    const currentPropsData = convertArrToObj(get(this.props.data, 'users', []), 'id');

    if (prevData !== currentPropsData && Boolean(prevNeedRefresh) !== Boolean(this.state.needRefresh) && this.state.needRefresh) {
      this.setState({ data: currentPropsData });
    }
  }

  setData = (data) =>
    convertArrToObj(get(data, 'users', []), 'id');

  onClickHeaderCheckbox = (checked) => {
    const list = convertObjToArr(this.state.data, 'array');
    const data = list.map(d => ({ ...d, checked }));
    this.setState({ data: convertArrToObj(data, 'id'), needRefresh: false });
  };

  onClickCheckbox = (id: string) => {
    const { data } = this.state;
    data[id].checked = !data[id].checked;
    this.setState({ data });
  };

  onSubmit = (context) => {
    const data = convertObjToArr(this.state.data, 'array');
    const users = data.filter(d => d.checked);

    context.setData('users', users);
    context.goTo('choose-time');
  };

  render() {
    const { data } = this.state;

    return (
      <FlatList
        data={convertObjToArr(data, 'array')}
        keyExtractor={(item, index) => item.id}
        style={{ width: '100%', zIndex: -1 }}
        ListHeaderComponent={
          <CheckAllStudent onClick={this.onClickHeaderCheckbox} />
        }
        ListFooterComponent={
          <ShareArchiveConsumer>
            {(context) => (
              <ShareArchiveFooter
                title="LANJUT"
                onClick={() => this.onSubmit(context)}
              />
            )}
          </ShareArchiveConsumer>
        }
        renderItem={({ item }) => (
          <ShareArchiveView
            {...item}
            onClick={() => this.onClickCheckbox(item.id)}
          />
        )}
      />
    );
  }
}

export default ShareArchiveListView;

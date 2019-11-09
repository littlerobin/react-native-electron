// @flow

import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import get from 'lodash/get';
import Colors from '../../utils/colors';
import type { Option } from '../types.shared';

type Value = string | number | Object;
type Props = {
  query?: string,
  params?: Object,
  fieldMap?: Option,
  placeholder?: string,
  name: string,
  value: Option,
  options?: Array<Option> | Function,
  backgroundColor?: string,
  onChange?: (value: Value) => void,
  onValueChange?: (value: Value) => void,
  onInputChange?: (value: string) => string,
};
type State = {
  selectedOption: ?any,
};

const styles = {
  option: (base, state) => ({
    ...base,
    borderBottom: `1px solid ${Colors.primary}`,
    color: state.isFocused ? Colors.white : Colors.primary,
    padding: 20,
    backgroundColor: state.isFocused ? Colors.primary : Colors.white,
    cursor: 'pointer',
  }),
  control: (base) => ({
    ...base,
    borderColor: Colors.primary,
    backgroundColor: Colors.transparent,
    boxShadow: null,
    '&:hover': {
      borderColor: Colors.primary,
    },
  }),
  input: (base) => ({
    ...base,
    borderColor: Colors.primary,
    backgroundColor: Colors.transparent,
  }),
};

class Select extends React.Component<Props, State> {
  state = {
    selectedOption: this.props.value,
  }

  handleChange = (selectedOption: Value) => {
    this.setState(
      { selectedOption },
      () => {
        this.props.onChange && this.props.onChange(selectedOption);
        this.props.onValueChange && this.props.onValueChange(selectedOption);
      }
    );
  };

  // _onInputChange = (inputValue: string) => '';

  _loadOptions = (client, query, params, inputValue, callback) => {
    const { name, fieldMap = {} } = this.props;
    const fieldMapValue = fieldMap.value || '';
    const fieldMapLabel = fieldMap.label || '';

    client.query({ query, variables: params }).then(({ data }) => {
      const optionsData = get(data, `${name}`, []);
      let options = optionsData.map(d => ({ value: d[fieldMapValue], label: d[fieldMapLabel], ...d }));

      if (typeof this.props.options === 'function') {
        callback(this.props.options(options));
      } else if (typeof this.props.options === 'object') {
        options = this.props.options ? this.props.options.concat(options) : options;
        callback(options);
      } else {
        callback(options);
      }
    });
  };

  render() {
    const { query, params, placeholder, options, backgroundColor } = this.props;
    const { selectedOption } = this.state;
    const style = {
      ...styles,
      control: (base) => ({
        ...base,
        ...(backgroundColor ? { backgroundColor } : Colors.transparent),
        borderColor: Colors.primary,
        boxShadow: null,
        '&:hover': {
          borderColor: Colors.primary,
        },
      }),
    };

    return query ? (
      <ApolloConsumer>
        {client => (
          <AsyncSelect
            placeholder={placeholder}
            cacheOptions
            defaultOptions
            styles={style}
            value={selectedOption}
            onChange={this.handleChange}
            loadOptions={(inputValue, callback) => this._loadOptions(client, query, params, inputValue, callback)}
          />
        )}
      </ApolloConsumer>
    ) : (
      <ReactSelect
        placeholder={placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        isSearchable
        options={options}
        styles={style}
      />
    );
  }
}

export default Select;

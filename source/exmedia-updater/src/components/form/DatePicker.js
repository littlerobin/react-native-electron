// @flow

import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

type Props = {
  placeholder?: string,
  value?: Date,
  name: string,
  minDate?: Date,
  maxDate?: Date,
  onChange?: (value: Date) => void,
};
type State = {
  date: ?Date,
};

class Picker extends Component<Props, State> {
  placeholderEl: ?HTMLLabelElement;
  state = {
    date: this.props.value,
  }

  componentDidMount() {
    this.toggleShowPlaceholder();
  }

  componentDidUpdate(_, prevState: State) {
    if (prevState.date !== this.state.date) {
      this.toggleShowPlaceholder();
    }
  }

  toggleShowPlaceholder = () => {
    const inputClassEl = document.getElementsByClassName('react-date-picker__button__input');
    const monthEl = document.getElementsByClassName('react-date-picker__button__input__month');
    const dayEl = document.getElementsByClassName('react-date-picker__button__input__day');
    const yearEl = document.getElementsByClassName('react-date-picker__button__input__year');
    const dividerEl = document.getElementsByClassName('react-date-picker__button__input__divider');

    if (!this.state.date && inputClassEl) {
      if (this.placeholderEl === null) {
        inputClassEl[0].appendChild(this.renderPlaceholder());
      }
      monthEl[0].style.display = 'none';
      dayEl[0].style.display = 'none';
      yearEl[0].style.display = 'none';
      dividerEl[0].style.display = 'none';
      dividerEl[1].style.display = 'none';
    } else {
      if (this.placeholderEl !== null) {
        this.placeholderEl.remove();
        this.placeholderEl = null;
      }
      monthEl[0].style.display = 'block';
      dayEl[0].style.display = 'block';
      yearEl[0].style.display = 'block';
      dividerEl[0].style.display = 'block';
      dividerEl[1].style.display = 'block';
    }
  };

  placeholderEl = null;

  renderPlaceholder: any = () => {
    this.placeholderEl = document.createElement('label');
    this.placeholderEl.style.color = '#757575';
    this.placeholderEl.setAttribute('id', `placeholder-${this.props.name}`);
    (this.placeholderEl || {}).innerHTML = this.props.placeholder || 'Placeholder';

    return this.placeholderEl;
  };

  onChange = (date: Date) => {
    this.setState({ date }, () => this.props.onChange && this.props.onChange(date));
  };

  render() {
    return (
      <DatePicker
        {...this.props}
        locale="id-ID"
        onChange={this.onChange}
        value={this.state.date}
      />
    );
  }
}

export default Picker;

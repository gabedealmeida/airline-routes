import React, { Component } from 'react';

class Select extends Component {
  handleOnChange = (e) => {
    e.preventDefault();
    const target = e.target.value;
    this.props.onSelect(target);
  }

  render() {
    const options = this.props.options.map((option) => {
      const value = option[this.props.valueKey];
      return <option disabled={this.props.value !== value && this.props.value !== 'all'} key={value} value={value}>{option[this.props.titleKey]}</option>;
    });

    return (
      <select value={this.props.value} onChange={this.handleOnChange}>
        <option key="all" value="all">{this.props.allTitle}</option>
        { options }
      </select>
    )
  }
}

export default Select;

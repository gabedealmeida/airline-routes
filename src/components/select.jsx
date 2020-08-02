import React, { Component } from 'react';

class Select extends Component {

  handleOnChange = (e) => {
    e.preventDefault();
    const target = e.target.value;
    this.props.onSelect(target);
  }

  render() {
    const options = this.props.options.map((airline) => {
      return <option disabled={this.props.value !== airline.id && this.props.value !== 'all'} key={airline.id} value={airline.id}>{airline.name}</option>;
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

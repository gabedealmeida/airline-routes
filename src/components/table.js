import React, { Component } from 'react';

class Table extends Component {
  render() {
  const headers = this.props.columns.map((header) => {
    return <th key={header.name}>{ header.name }</th>;
  });

  const bodyRows = this.props.routes.map((route) => {
    const data = this.props.columns.map((colData) => {
      const value = route[colData.property];
      return <td key={colData.property + value}>{ value }</td>;
    });

    return <tr key={Object.values(route).join(':')}>{ data }</tr>;
  });

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            { headers }
          </tr>
        </thead>
        <tbody>
          { bodyRows }
        </tbody>
      </table>
    )
  }
}

export default Table;
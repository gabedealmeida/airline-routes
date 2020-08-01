import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }

  static defaultProps = {
    perPage: 25,
  }

  handlePrevious = () => {
    this.setState((prevState) => ({ page: prevState.page - 1}));
  }

  handleNext = () => {
    this.setState((prevState) => ({ page: prevState.page + 1}));
  }

  render() {
  const headers = this.props.columns.map((header) => {
    return <th key={header.name}>{ header.name }</th>;
  });

  const start = this.state.page * this.props.perPage;

  const bodyRows = this.props.rows.slice(start, start + this.props.perPage).map((route) => {
    const data = this.props.columns.map((colData) => {
      const prop = colData.property;
      const value = route[prop];
      return <td key={colData.property + value}>{ this.props.format(prop, value) }</td>;
    });

    return <tr key={Object.values(route).join(':')}>{ data }</tr>;
  });

    return (
      <div>
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
        <div className="pagination">
          <p>Showing {start + 1 }-{start + bodyRows.length} of {this.props.rows.length} routes.</p>
          <p>
            <button disabled={this.state.page === 0} onClick={this.handlePrevious}>
              Previous Page
            </button>
            <button disabled={start + this.props.perPage >= this.props.rows.length} onClick={this.handleNext}>
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;
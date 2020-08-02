import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/table';
import Select from './components/select';

class App extends Component {
  defaultState = {
    airline: 'all',
    airport: 'all',
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  format(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  airlineSelected = (value) => {
    if (value !== 'all') {
      value = Number(value);
    }

    this.setState({airline: value});
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = DATA.routes.filter((route) => {
      if (this.state.airline === 'all') return route;
      return route.airline === this.state.airline;
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
        <Select options={DATA.airlines} valueKey="id" titleKey="name"
          allTitle="All Airlines" value={this.state.airline} onSelect={this.airlineSelected} />
          <Table className="routes-table" rows={filteredRoutes} columns={columns} format={this.format} />
        </section>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/table';

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

  handleOnChange = (e) => {
    const target = e.target.value;
    let airline;

    if (target === 'all') {
      airline = 'all';
    } else {
      const id = Number(target);
      airline = this.format('airline', id);
    }
  
    this.setState({airline: airline});
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const airlineOptions = DATA.airlines.map((airline) => {
      return <option disabled={this.state.airline !== airline.name && this.state.airline !== 'all'} key={airline.id} value={airline.id}>{airline.name}</option>;
    });

    const filteredRoutes = DATA.routes.filter((route) => {
      if (this.state.airline === 'all') return route;
      return this.format('airline', route.airline) === this.state.airline;
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <select name="airline" onChange={this.handleOnChange}>
            <option key={'all'} value="all">All Airlines</option>
            { airlineOptions }
          </select>
          <Table className="routes-table" rows={filteredRoutes} columns={columns} format={this.format} />
        </section>
      </div>
    );
  }
}

export default App;
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

  airportSelected = (value) => {
    this.setState({airport: value});
  }

  routeHasCurrentAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === 'all';
  };

  routeHasCurrentAirport = (route) => {
    return route.src === this.state.airport || route.dest === this.state.airport || this.state.airport === 'all';
  };

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = DATA.routes.filter( (route) => {
      return this.routeHasCurrentAirline(route) && this.routeHasCurrentAirport(route);
    });

    const filteredRoutesByAirline = DATA.routes.filter(this.routeHasCurrentAirline);

    const filteredRoutesByAirport = DATA.routes.filter(this.routeHasCurrentAirport);

    const filteredAirlines = DATA.airlines.filter( (airline) => {
      return filteredRoutesByAirport.some( (route) => route.airline === airline.id );
    });

    const filteredAirports = DATA.airports.filter( (airport) => {
      return filteredRoutesByAirline.some( (route) => route.src === airport.code || route.dest === airport.code );
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on
            <Select options={filteredAirlines} valueKey="id" titleKey="name"
              allTitle="All Airlines" value={this.state.airline} onSelect={this.airlineSelected}
            />
            flying out of
            <Select options={filteredAirports} valueKey="code" titleKey="name"
              allTitle="All Airports" value={this.state.airport} onSelect={this.airportSelected} />

            <Table className="routes-table" rows={filteredRoutes} columns={columns} format={this.format}
            />
          </p>
        </section>
      </div>
    );
  }
}

export default App;
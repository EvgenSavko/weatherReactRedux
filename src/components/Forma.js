import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';

class Forma extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      input: '',
    };
  }

  onNameChange(e) {
    this.setState({ name: e.target.value, input: e.target });
  }

onGetName = e => {
    e.preventDefault();
    if (this.state.name != undefined) {
      this.props.onAddCity(this.state.name);
      //
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.name
        }&type=like&APPID=fe7b0d9704ac5510ac37676e142dc409`,
      )
        .then( response => response.json())
        .then(data => {
          console.log('data', data);
          if (data.cod == 404 ) alert('error#404 city not found')
          else {
            let objectName = data.name;
            let objectTemp = (data.main.temp - 273).toFixed(0);
            let objectHumidity = data.main.humidity;
            let objectWind = data.wind.speed;
            let objectDescription = data.weather[0].description;
            let objectIcon = data.weather[0].icon;
            let objectCoord1 = data.coord.lat;
            let objectCoord2 = data.coord.lon;
            this.props.onGetCityObj(
              objectName,
              objectTemp,
              objectHumidity,
              objectWind,
              objectDescription,
              objectIcon,
              objectCoord1,
              objectCoord2,
            );
          }
        });
      //
      this.setState({ name: '' });
      if (this.state.name) this.state.input.value = '';
    }
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Name city</label>
            <input
              type="text"
              onChange={this.onNameChange.bind(this)}
              className="form-control"
              id="exampleInputEmail1"
              aria-
              describedby="emailHelp"
              placeholder="Enter correct name city"
            />
            <small id="emailHelp" className="form-text text-muted">
              You must enter a city name: Tokyo, Kiev, Moscow, Prague, Salvador.
            </small>
          </div>

          <button onClick={this.onGetName} type="submit" className="btn btn-primary">
            Add City
          </button>
        </form>
      </div>
    );
  }
}
export default connect(
  state => ({
    cities: state.cities,
    newCities: state.newCities,
  }),
  dispatch => ({
    onAddCity: name => {
      const payload = {
        id: Date.now().toString(),
        name,
      };
      dispatch({ type: 'ADD_CITY', payload });
    },
    onGetCityObj: (
      objectName,
      objectTemp,
      objectHumidity,
      objectWind,
      objectDescription,
      objectIcon,
      objectCoord1,
      objectCoord2,
    ) => {
      const payload = {
        name: objectName,
        temp: objectTemp,
        humidity: objectHumidity,
        wind: objectWind,
        description: objectDescription,
        icon: objectIcon,
        coord1: objectCoord1,
        coord2: objectCoord2,
      };
      dispatch({ type: 'ADD_CITY_OBJECT', payload });
    },
  }),
)(Forma);

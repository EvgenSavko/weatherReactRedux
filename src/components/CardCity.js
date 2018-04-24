import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';

class CardCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCity: this.props.post,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ nameCity: nextProps.post });
  }

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        this.state.nameCity
      }&type=like&APPID=fe7b0d9704ac5510ac37676e142dc409`,
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          objectName: data.name,
          objectTemp: (data.main.temp - 273).toFixed(0),
          objectHumidity: data.main.humidity,
          objectWind: data.wind.speed,
          objectDescription: data.weather[0].description,
          objectIcon: data.weather[0].icon,
        });
      });
  }
  render() {
    // console.log("CardCity", this.state.nameCity)
    // console.log("CardCity", this.state.objectName, this.state.objectTemp, this.state.objectHumidity, this.state.objectWind, this.state.bjectDescription)
    return (
      <div className="col-3" style={{ marginBottom: 15 + 'px' }}>
        <ul className="list-group">
          <li className="list-group-item" style={{ borderColor: 'coral' }}>
            name: {this.state.objectName}
          </li>
          <li className="list-group-item">
            <img
              src={`https://api.openweathermap.org/img/w/${this.state.objectIcon}.png`}
              alt={'img weather'}
            />
            {this.state.objectDescription}{' '}
          </li>
          <li className="list-group-item">temp: {this.state.objectTemp} C</li>
          <li className="list-group-item">humidity: {this.state.objectHumidity} %</li>
          <li className="list-group-item">wind: {this.state.objectWind} m/sec</li>
        </ul>
      </div>
    );
  }
}

export default CardCity;

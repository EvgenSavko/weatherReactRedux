import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';

import getStartCities from '../actions/startCities';

import Forma from './Forma';
import CardCity from './CardCity';
import AddCard from './AddCard';

class PageWeather extends Component {
  constructor(props) {
    super(props);

    this.onButtonChange = this.onButtonChange.bind(this);

    this.post = {};
    this.state = {
      object: {},
    };
  }

  onButtonChange(object) {
    this.setState({ object: object });
  }

  componentWillMount() {
    this.props.onGetStartCities();
  }

  render() {
    //this.props.onGetStartCities()
    return (
      <div className="container">
        <h1>Welcome to React Weather</h1>
        <Forma />
        <AddCard />
        <div className="row" style={{ marginTop: 15 + 'px' }}>
          {this.props.cities.map(item => {
            this.post = item;
            return <CardCity post={this.post} />;
          })}
        </div>
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
    onGetStartCities: () => {
      dispatch(getStartCities());
    },
  }),
)(PageWeather);

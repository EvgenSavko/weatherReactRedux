import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import PageWeather from '../components/PageWeather';
import CardSingle from '../components/CardSingle';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={PageWeather} />
        <Route path="/main" component={PageWeather} />
        <Route path="/post/:id" component={CardSingle} />
      </div>
    );
  }
}

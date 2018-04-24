import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayGet : []
    }
  }

  onButton = (index) => {
    console.log(index)
    this.props.onDelCity(index)
    //e.target.parentElement.className = 'none';
    //this.props.onDelCity(index);
  };



  onUpdate = e => {
    let nameCity = e.target.previousElementSibling.previousElementSibling.firstElementChild.id;
    let nameField = e.target.previousElementSibling.previousElementSibling.firstElementChild;
    let tempField =
      e.target.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling;
    let tempImg =
      e.target.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling
        .nextElementSibling;
    let dataHoursMS = new Date();
    //console.log('e.target', e.target.previousElementSibling.previousElementSibling.firstElementChild.id)
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&type=like&APPID=fe7b0d9704ac5510ac37676e142dc409`,
    )
      .then(response => response.json())
      .then(data => {
        nameField.innerHTML =
          'name:' +
          ' ' +
          data.name +
          ' ' +
          "<span style='font-size: 60%; padding-left: 50px'>" +
          'update in ' +
          dataHoursMS.getHours() +
          ':' +
          dataHoursMS.getMinutes() +
          ':' +
          dataHoursMS.getSeconds() +
          '</span>';
        tempField.innerHTML = 'temp:' + ' ' + (data.main.temp - 273).toFixed(0) + ' C';
        tempImg.innerHTML =
          '<img src="https://api.openweathermap.org/img/w/' +
          data.weather[0].icon +
          '.png" /> ' +
          ' ' +
          data.weather[0].description;
      });
  };

  // componentDidMount(){
  //   this.state.set = true;
  // }

  render() {

    return (
      <div className="row" style={{ marginTop: 15 + 'px' }}>
        {this.props.citiesObj.map((item, index) => (
          <div className="col-4" style={{ marginBottom: 15 + 'px' }}>
            <ul className="list-group">
              <li
                id={item.name}
                data-toggle={index}
                className="list-group-item"
                style={{ borderColor: 'coral' }}
              >
                name: {item.name}
              </li>
              <li className="list-group-item">temp: {item.temp} C</li>
              <li className="list-group-item">
                <img
                  src={`https://api.openweathermap.org/img/w/${item.icon}.png`}
                  alt={'img weather'}
                />
                {item.description}
              </li>
              <li className="list-group-item">
                <Link to={`/post/${item.name}`} className="uk-button uk-button-text">
                  Read more
                </Link>
              </li>
            </ul>
            <button onClick={() => this.onButton(index)} className="btn btn-dark btn-sm" type="button">
              Delete City
            </button>
            <button onClick={this.onUpdate} className="btn btn-info btn-sm" type="button">
              Update info
            </button>
          </div>
        ))}
      </div>
    );
  }
}
export default connect(
  state => ({
    cities: state.cities,
    newCities: state.newCities,
    citiesObj : state.citiesObj,
  }),
  dispatch => ({
    onDelCity: index => {
      dispatch({ type: 'DELL_CITY', index  });
    },
  }),
)(AddCard);

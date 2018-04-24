import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CardCity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post : {},
            object : {}
        }
    }
    
    
    componentDidMount(){
              fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.match.params.id}&type=like&APPID=fe7b0d9704ac5510ac37676e142dc409`)
.then(response => response.json())   
            .then( data => {
                this.setState({
                  objectName : data.name,
                  objectTemp : (data.main.temp - 273).toFixed(0),
                  objectHumidity : data.main.humidity,
                  objectWind : data.wind.speed,
                  objectDescription : data.weather[0].description,
                  objectIcon : data.weather[0].icon,
                  objectCoord1 : data.coord.lat,
                  objectCoord2 : data.coord.lon,   
                })
            })

    }    
    
  render() {
  // console.log('CardSingle match', this.props.match.params.id)
    return (
        <div className='col-3' style={{marginBottom: 15+'px' }}>
          <ul className="list-group" >
            <li className="list-group-item" style={{borderColor: 'coral' }}>name: {this.state.objectName}</li>
            <li className="list-group-item">temp: {this.state.objectTemp} C</li>
            <li className="list-group-item">humidity: {this.state.objectHumidity} %</li>
            <li className="list-group-item">wind: {this.state.objectWind} m/sec</li>
            <li className="list-group-item">weather: {this.state.objectDescription}</li>
            <li className="list-group-item"><img src={`https://api.openweathermap.org/img/w/${this.state.objectIcon}.png`} alt={"img weather"} /></li>
            <li className="list-group-item">coord: <br /> lat {this.state.objectCoord1} <br />lon {this.state.objectCoord2}</li>
            <li className="list-group-item"><Link to={`/main`} className="uk-button uk-button-text">Go Home</Link></li>
          </ul>
        </div>

    );
  }
}

export default CardCity;

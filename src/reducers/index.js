import { combineReducers } from 'redux';


import cities from './cities';
import newCities from './newCities';
import citiesObj from './citiesObj';

export default combineReducers({
  cities,
  newCities,
  citiesObj,
});

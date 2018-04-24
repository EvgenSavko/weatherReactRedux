const initialState = [];

export default function citiesObj(state = initialState, action) {
  if (action.type === 'ADD_CITY_OBJECT') {
    return [...state, action.payload];
  } else if (action.type === 'DELL_CITY') {
    const newCities = [...state];
    newCities.splice(action.index, 1);
    return newCities;
  }
  return state;
}

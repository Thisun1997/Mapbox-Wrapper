import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION TYPES
const SET_STYLE = 'SET_STYLE';
const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS';
const CHANGE_WATER_COLOR = 'CHANGE_WATER_COLOR';
const TOGGLE_STATIONS = 'TOGGLE_STATIONS';
const CHANGE_MARKER_SIZE = 'CHANGE_MARKER_SIZE';
const SET_PROVINCE = 'SET_PROVINCE'
const SET_LOCATION = 'SET_LOCATION'

// ACTION CREATORS
export const setStyle = style => ({
  type: SET_STYLE,
  style,
});
export const setChargingStations = chargingStations => ({
  type: SET_CHARGING_STATIONS,
  chargingStations,
});
export const changeWaterColor = color => ({
  type: CHANGE_WATER_COLOR,
  color,
});
export const toggleStations = visibility => ({
  type: TOGGLE_STATIONS,
  visibility,
});
export const changeMarkerSize = size => ({
  type: CHANGE_MARKER_SIZE,
  size
});
export const displayProvince = description => ({
  type: SET_PROVINCE,
  description,
});
export const displayLocation = location => ({
  type: SET_LOCATION,
  location
})

// THUNK CREATOR
export const fetchAllStations = () => async dispatch => {
  const { data: chargingStations } = await axios.get(
    'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=fdpgLKYjndcWXLur2BpDVOTmjYJWiW9LqhVTyRtX&state=IL&fuel_type=ELEC'
  );
  dispatch(setChargingStations(chargingStations.fuel_stations));
};

// INITIAL STATE
const initialState = {
  style: {},
  chargingStations: [],
  description: 'Select province',
  location: []
};

// HANDLERS
const handlers = {
  [SET_STYLE]: (state, action) => {
    return { ...state, style: action.style };
  },
  [SET_CHARGING_STATIONS]: (state, action) => {
    return { ...state, chargingStations: action.chargingStations };
  },
  [CHANGE_WATER_COLOR]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'water');
    layer.paint[`fill-color`] = action.color;
    return { ...state, style: newStyle };
  },
  [TOGGLE_STATIONS]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'allStations');
    layer.layout.visibility = action.visibility;
    return { ...state, style: newStyle };
  },
  [CHANGE_MARKER_SIZE]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'allStations');
    layer.paint['circle-radius'] = action.size
    return {...state, style: newStyle}
  },
  [SET_PROVINCE]: (state, action) => {
    return { ...state, description: action.description };
  },
  [SET_LOCATION]: (state, action) => {

    return { ...state, location: action.location };
  },
};

// REDUCER
const reducer = (state = initialState, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    console.log(state)
    return state;
  } else {
    return handlers[action.type](state, action);
  }
};

const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware);
export default store;

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import  { db }  from '../firebase';
//import axios from 'axios';

// ACTION TYPES
const SET_PROVINCE = 'SET_PROVINCE'
const SET_LOCATION = 'SET_LOCATION'
const SET_SELECTED = 'SET_SELECTED'
const GET_PLACES = 'GET_PLACES'
const GET_USERS = 'GET_USERS'

// ACTION CREATORS
export const displayProvince = description => ({
  type: SET_PROVINCE,
  description,
});
export const displayLocation = location => ({
  type: SET_LOCATION,
  location
});
export const selectedLocation = selected => ({
  type: SET_SELECTED,
  selected
});
export const getPlaces = places_list => ({
  type: GET_PLACES,
  places_list
});
export const getUsers = no_of_users => ({
  type: GET_USERS,
  no_of_users
});

// THUNK CREATOR
// export const fetchAllStations = () => async dispatch => {
//   const { data: chargingStations } = await axios.get(
//     'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=fdpgLKYjndcWXLur2BpDVOTmjYJWiW9LqhVTyRtX&state=IL&fuel_type=ELEC'
//   );
//   dispatch(setChargingStations(chargingStations.fuel_stations));
// };
export const fetchPlaces = () => async dispatch => {
  const places_list = [[80,6.4],[80,7]] //fetching function
  dispatch(getPlaces(places_list))
}

export const fetchUsers = (description) => async dispatch => {
  var dic = {
    'Western Province': 'WP',
    'North Central Province': 'NC',
    'Southern Province':'SP',
    'Sabaragamuwa Province':'SB',
    'Uva Province':'UP',
    'Central Province':'CP',
    'North Western Province':'NW',
    'Eastern Province':'EP',
    'Northern Province':'NP'
  }
  var province = dic[description];
  const no_of_users = await db.collection('locations').doc(province).get()
        .then(doc => {
            if (doc.data() === undefined) {
                console.log('No matching documents.');
                return 0
            } 
            else{
                var user_tokens = doc.data().available_users
                return user_tokens.length;
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
    })
  //return dic[description];
  console.log(no_of_users);
  return no_of_users;
   };


// INITIAL STATE
const initialState = {
  description: 'Select province',
  location: [],
  selected: [],
  places_list: [],
  no_of_users: ''
};

// HANDLERS
const handlers = {
  [SET_PROVINCE]: (state, action) => {
    return { ...state, description: action.description };
  },
  [SET_LOCATION]: (state, action) => {
    return { ...state, location: action.location };
  },
  [SET_SELECTED]: (state, action) => {
    return { ...state, selected: action.selected };
  },
  [GET_PLACES]: (state, action) => {
    return {...state, places_list: action.places_list}
  },
  [GET_USERS]: (state, action) => {
    console.log(action.no_of_users)
    return {...state, no_of_users: action.no_of_users}
  }
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

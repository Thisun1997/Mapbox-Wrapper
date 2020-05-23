import React, { Component } from 'react';
import './App.css';
import Map from './Map';
//import MarkerMap from './MarkerMap';
import Sidebar from './Sidebar';
//import DisplayMap from './DisplayMap';

class App extends Component {
  render() {
    const accessToken =
      'pk.eyJ1IjoidGhpc3VuIiwiYSI6ImNrOTFvOWtuYTAyM2kza21rYWNoeXN0OHgifQ.NYX8O2aH4FFqB2qIOasIMA';
    const styleName = 'thisun/ck9314eok2fb01ip9jylxzrpu';
    const lon = 81.017452;
    const lat = 7.872285;
    const zoomScale = 7;

    return (
      <div className="App">
        <Map
          accessToken={accessToken}
          styleName={styleName}
          lon={lon}
          lat={lat}
          zoomScale={zoomScale}
        />
        {/* <DisplayMap 
          accessToken={accessToken}
          styleName={styleName}
          lon={lon}
          lat={lat}
          zoomScale={zoomScale}
        /> */}
        <Sidebar />
      </div>
    );
  }
}

export default App;

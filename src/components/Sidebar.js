import './Body.css';
import React from 'react';
import { connect } from 'react-redux';
import { changeMapStyle, toggleStations } from '../store/index';
// const maki = require('maki');



const Sidebar = props => {
  const { map, changeMapStyle, toggleStations } = props;

  const handleStyleChange = (event) => {
    const style = event.target.value;
    changeMapStyle(map, `mapbox://styles/mapbox/${style}-v9`)
  }

  const handleStations = (event) => {
    const visibility = event.target.value === 'all' ? 'visible' : 'none';
    console.log('station change!')
    toggleStations();

  }

  return (
    <div id="sidebar">
      <h1>MAP STYLING</h1>
      <form>
        <div className="styleOption mapStyle" onChange={(event) => handleStyleChange(event)}>
          <h3>MAP STYLE</h3>
          <select className="sidebarField colorInput">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="streets">Streets</option>
            <option value="satellite-streets">Satellite</option>
          </select>
        </div>

        <div
        className="styleOption evStations"
        onChange={(event) => handleStations(event)}
        >
          <h3> EV STATIONS </h3>
          <label className="sidebarField">
            <input
              type="radio"
              value="none"
              name="chargingStation"/>
            None
          </label>
          <label className="sidebarField">
            <input
              type="radio"
              value="all"
              name="chargingStation"/>
            All
          </label>
          <label className="sidebarField">
            <input
            type="radio"
            value="tesla"
            name="chargingStation" />
            Tesla
          </label>
          <label className="sidebarField">
            <input
            type="radio"
            value="free"
            name="chargingStation" />
            Free
          </label>
        </div>

        <div className="styleOption icon">
          <h3>MAP ZOOM</h3>
          <input
            type="number"
            min="1"
            max="20"
            className="zoomInput"
            placeholder="10"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    map: state.map
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeMapStyle: (map, style) => {
      const newStyle = map.setStyle(style)
      dispatch(changeMapStyle(newStyle))
    },
    toggleStations: () => {
      dispatch(toggleStations())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
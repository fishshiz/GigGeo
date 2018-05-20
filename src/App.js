import React, { Component } from 'react';
import MapContainer from "./map_container";
import SearchContainer from "./search_container";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchContainer />
        <MapContainer />
      </div>
    );
  }
}

export default App;

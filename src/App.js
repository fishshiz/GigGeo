import React, { Component } from 'react';
import MapContainer from "./map_container";
import SearchContainer from "./search_container";
import SelectedContainer from "./selected_container";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchContainer />
        <MapContainer />
        <SelectedContainer />
      </div>
    );
  }
}

export default App;

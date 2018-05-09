import mapboxgl from "mapbox-gl";
import React from "react";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default class Map extends React.Component {
  componentDidMount() {
    //   window.process.env = process.env;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/fishshiz/cjgwp824200002rns7w5309xm"
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%"
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}

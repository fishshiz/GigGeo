import mapboxgl from "mapbox-gl";
import React from "react";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default class Map extends React.Component {
  constructor() {
    super();
    this.loadPlaces = this.loadPlaces.bind(this);
  }
  componentDidMount() {
    
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/fishshiz/cjgwp824200002rns7w5309xm"
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.props.venues.forEach(place => {
      const location = place._embedded.venues[0].location;
      const [longitude, latitude] = [parseFloat(location.longitude), parseFloat(location.latitude)];
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(this.map);        
    });
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

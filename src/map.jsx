import mapboxgl from "mapbox-gl";
import React from "react";
import { compose } from "redux";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default class Map extends React.Component {
  constructor() {
    super();
    this.loadPlaces = this.loadPlaces.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
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

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  loadPlaces() {
    let coordinates = [];
    this.props.venues.forEach(place => {
      const venue = place._embedded.venues[0];
      const location = venue.location;
      const image = venue.images
        ? venue.images[this.getRandomInt(0, venue.images.length)].url
        : place.images[this.getRandomInt(0, place.images.length)].url;

      const [longitude, latitude] = [
        parseFloat(location.longitude),
        parseFloat(location.latitude)
      ];
      coordinates.push([longitude, latitude]);
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div><img class="tooltip__img" src="${image}"/><h2>` +
                place.name +
                `</h2><p>` +
                venue.name +
                `</p><p>` +
                venue.city.name + `, ` + venue.state.stateCode +
                `</p></div>`
            )
        )
        .addTo(this.map);
    });
    let bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    this.map.fitBounds(bounds, {
      padding: 30
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

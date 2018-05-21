import mapboxgl from "mapbox-gl";
import React from "react";
import { compose } from "redux";
import moment from "moment";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
    this.loadPlaces = this.loadPlaces.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.parseTime = this.parseTime.bind(this);
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

  parseTime(date, specifiedTime) {
    let d;
      d = { date: moment(date).calendar(null, {
        sameDay: "DD/MM/YYYY h:mm a",
        nextDay: "DD/MM/YYYY h:mm a",
        nextWeek: "DD/MM/YYYY h:mm a",
        lastDay: "DD/MM/YYYY h:mm a",
          lastWeek: "DD/MM/YYYY h:mm a",
          sameElse: "DD/MM/YYYY h:mm a"
        }), month: moment(date).format("MMM"), time: moment(date).format("h:mm a") };
      if (specifiedTime) {
        d.day = date.slice(8, 10);
      } else {
        d.day = d.date.slice(0, 2);
      }
  
    return d;
  }

  loadPlaces() {
    let coordinates = [];
    this.state.markers.forEach(m => m.remove());
    let that = this;
    this.props.venues.forEach(place => {
      const venue = place._embedded.venues[0];
      let time;
      let localDate;
      if (place.dates.start.dateTime) {
      localDate = place.dates.start.dateTime;
      } else {
        localDate = place.dates.start.localDate;
      }
      if (!place.dates.start.noSpecificTime && !place.dates.start.dateTime) {
        time = that.parseTime(localDate, true);
      } else {
         time = that.parseTime(localDate, false);
      }
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
      let marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div class="popup"><div class="info-image-holder"><img class="tooltip__img" src="${image}"/></div><div class="header__wrapper"><h2 class="popup__header">` +
                place.name +
                `</h2></div><div class="popup__content"><div class="datetime__wrapper"><div class="calendar">
                <p class="popup__month">` +
                time.month +
                `</p><p class="popup__day">` +
                time.day +
                `</p></div><div class="popup__info"><p class="popup__venue">` +
                venue.name +
                `</p><p class="popup__location">` +
                venue.city.name +
                `, ` +
                venue.state.stateCode +
                `</p><p class="popup__time">` +
                time.time +
                `</p></div></div></div></div>`
            )
        )
        .addTo(this.map);
        this.state.markers.push(marker);
    }
  );
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

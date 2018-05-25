import mapboxgl from "mapbox-gl";
import React from "react";
import { compose } from "redux";
import moment from "moment";
import Rainbow from "rainbowvis.js";

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
    this.generateRainbow = this.generateRainbow.bind(this);
    this.generateColor = this.generateColor.bind(this);
    this.orderByDate = this.orderByDate.bind(this);
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

  parseTime(date) {
    let d;
    d = {
      date: moment(date).calendar(null, {
        sameDay: "DD/MM/YYYY h:mm a",
        nextDay: "DD/MM/YYYY h:mm a",
        nextWeek: "DD/MM/YYYY h:mm a",
        lastDay: "DD/MM/YYYY h:mm a",
        lastWeek: "DD/MM/YYYY h:mm a",
        sameElse: "DD/MM/YYYY h:mm a"
      }),
      month: moment(date).format("MMM"),
      time: moment(date).format("h:mm a"),
      day: moment(date).format("DD")
    };
    return d;
  }

  generateRainbow() {
    let rainbow = new Rainbow();
    rainbow.setNumberRange(0, this.props.venues.length);
    rainbow.setSpectrum("#85ff6d", "#c74129");
    return rainbow;
  }

  generateColor(rainbow, place, ordered) {
    let idx = ordered
      .map(event => {
        return event.id;
      })
      .indexOf(place.id);
    return rainbow.colourAt(idx);
  }

  orderByDate() {
    let venues = this.props.venues;
    let output = [venues[0]];
    for (let i = 1; i < venues.length; i++) {
      let newDate = venues[i].dates.start.dateTime
        ? venues[i].dates.start.dateTime
        : venues[i].dates.start.localDate;

      let comparisonDate = output[0].dates.start.dateTime;
      if (new Date(newDate) < new Date(comparisonDate)) {
        output.unshift(venues[i]);
      } else if (
        new Date(venues[i].dates.start.dateTime) >
        new Date(output[output.length - 1].dates.start.dateTime)
      ) {
        output.push(venues[i]);
      } else {
        for (let j = 0; j < output.length; j++) {
          if (
            new Date(output[j].dates.start.dateTime) <=
              new Date(venues[i].dates.start.dateTime) &&
            new Date(output[j + 1].dates.start.dateTime) >
              new Date(venues[i].dates.start.dateTime)
          ) {
            output = output
              .slice(0, j + 1)
              .concat(venues[i])
              .concat(output.slice(j + 1));
            break;
          }
        }
      }
    }
    return output;
  }

  loadPlaces() {
    let coordinates = [];
    this.state.markers.forEach(m => m.remove());
    let that = this;
    let rainbow = this.generateRainbow();
    const ordered = this.orderByDate();
    ordered.forEach(place => {
      let color = this.generateColor(rainbow, place, ordered);
      let venue = place._embedded.venues[0];
      let time;
      if (place.dates.start.dateTime) {
        time = this.parseTime(new Date(place.dates.start.dateTime));
      } else {
        time = this.parseTime(new Date(place.dates.start.localDate));
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
      let marker = new mapboxgl.Marker({ color: `#${color}` })
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
    });

    let bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    this.map.fitBounds(bounds, {
      padding: 40
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

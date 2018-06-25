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
    this.handleHover = this.handleHover.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/fishshiz/cjgwp824200002rns7w5309xm"
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.venues !== nextProps.venues;
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate() {
    if (this.props.venues.length > 0) {
      this.loadPlaces();
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  parseTime(date, time) {
    let d;
    d = {
      month: moment(date).format("MMM"),
      time: moment(time, "HH:mm:ss").format("h:mm a"),
      day: moment(date).format("DD")
    };
    return d;
  }

  generateRainbow() {
    let rainbow = new Rainbow();
    rainbow.setNumberRange(0, this.props.venues.length);
    rainbow.setSpectrum("#05F140", "#c74129");
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

  handleHover(e, marker, place) {
    this.props.highlightMarker(place);
    e.target.classList.add("highlighted");
  }

  handleOut(e, marker) {
    e.target.classList.remove("highlighted");
    this.props.removehighlightMarker();
  }

  orderByDate() {
    let venues = this.props.venues;
    let output = [venues[0]];
    for (let i = 1; i < venues.length; i++) {
      let newDate = venues[i].dates.start.localDate;

      let comparisonDate = output[0].dates.start.localDate;
      if (new Date(newDate) <= new Date(comparisonDate)) {
        output.unshift(venues[i]);
      } else if (
        new Date(newDate) >=
        new Date(output[output.length - 1].dates.start.localDate)
      ) {
        output.push(venues[i]);
      } else {
        for (let j = 0; j < output.length; j++) {
          if (
            new Date(output[j].dates.start.localDate) <=
              new Date(venues[i].dates.start.localDate) &&
            new Date(output[j + 1].dates.start.localDate) >
              new Date(venues[i].dates.start.localDate)
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
    const ordered = this.props.artistSearch
      ? this.orderByDate()
      : this.props.venues;
    ordered.forEach(place => {
      let color = that.props.artistSearch
        ? that.generateColor(rainbow, place, ordered)
        : "c74129";
      let venue = place._embedded.venues[0];
      let time = that.parseTime(
        new Date(new moment(place.dates.start.localDate)),
        place.dates.start.localTime
      );

      if (!venue.location) {
        return;
      }
      const location = venue.location;
      const image = venue.images
        ? venue.images[that.getRandomInt(0, venue.images.length)].url
        : place.images[that.getRandomInt(0, place.images.length)].url;
      place.venue = venue;
      place.time = time;
      place.location = location;
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
                `</p></div></div></div><a href=${
                  place.url
                } target="_blank" class="popup__buy">Find Tickets</a>
                </div>`
            )
        )
        .addTo(that.map);
      that.state.markers.push(marker);
      let m = marker;
      marker
        .getElement()
        .addEventListener("mouseenter", e =>
          that.handleHover(e, marker, place)
        );
      marker
        .getElement()
        .addEventListener("mouseleave", e => that.handleOut(e, marker));
    });

    let bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    this.map.fitBounds(bounds, {
      padding: 80
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

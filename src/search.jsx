import React, { Component } from "react";
import Map from "./map";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    const array = [];
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events?apikey=YTiG9dlzX66Y2OabAulF5IuhhpzGI3N8&keyword=ed%20sheeran&countryCode=US"
    )
      .then(res => {
        return res.json();
      })
      .then(response =>
        response._embedded.events.map(event => {
          array.push(...event._embedded.venues[0].location);
          return event._embedded.venues[0].location;
        })
      )
      .then(hi => {
        this.setState({ places: hi });
      });
  }

  render() {
    return <Map places={this.state.places} />;
  }
}

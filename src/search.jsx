import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    this.props.edSheeranTour();
  }

  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}

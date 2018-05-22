import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";

require("flatpickr/dist/themes/airbnb.css");

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistSearch: false,
      query: "",
      date: new Date()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    let item = e.target;
    if ([...e.target.classList].includes("fa-headphones")) {
      item = document.querySelector(".artist__toggle");
    } else if ([...e.target.classList].includes("fa-building")) {
      item = document.querySelector(".city__toggle");
    }
    let other;
    let toggler = document.querySelector(".toggle");
    let wrapper = document.querySelector(".search__wrapper");
    let shell = document.querySelector(".toggle__calendar");
    if (
      this.state.artistSearch &&
      [...item.classList].includes("city__toggle")
    ) {
      other = document.querySelector(".artist__toggle");
      other.classList.remove("selected");
      shell.classList.add("moveIn");
      shell.classList.remove("moveBack");
      item.classList.add("selected");
      this.setState({ artistSearch: false });
    } else if (
      !this.state.artistSearch &&
      [...item.classList].includes("artist__toggle")
    ) {
      other = document.querySelector(".city__toggle");
      shell.classList.remove("moveIn");
      shell.classList.add("moveBack");
      other.classList.remove("selected");
      item.classList.add("selected");
      this.setState({ artistSearch: true });
    }
  }

  handleHover(e) {
    let target = e.target;

    target.classList.add("hover");
  }

  handleOut(e) {
    let target = e.target;
    target.classList.remove("hover");
  }

  componentDidMount() {
    // this.props.edSheeranTour();
  }

  handleUpdate(property) {
    return e =>
      this.setState({
        [property]: e.target.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let d = moment(this.state.date[0]).format("YYYY-MM-DD");
    if (this.state.artistSearch) {
      this.props.searchArtist(this.state.query);
    } else {
      this.props.searchCities(this.state.query, d);
    }
  }

  render() {
    const { query, date, artistSearch } = this.state;
    let calendar = (calendar = (
      <div className="calendar__wrapper">
        <Flatpickr
          value={date}
          onChange={date => {
            this.setState({ date });
          }}
        />
      </div>
    ));
    let placeholder;
    if (!artistSearch) {
      placeholder = " city";
    } else {
      placeholder = "n artist";
    }
    return (
      <div className="search__wrapper">
        <form className="search__form" onSubmit={this.handleSubmit}>
          <div className="search__comp">
            <input
              onChange={this.handleUpdate("query")}
              value={query}
              type="text"
              placeholder={`Search for a${placeholder}`}
              className="search__input"
            />

            <button
              className="headerSearch__submit submit sc-ir"
              type="submit"
            />
          </div>
        </form>
        <div className="toggle__calendar">
          {calendar}
          <div className="toggle">
            <div onClick={this.toggle} className="artist__toggle">
              <i className="fas fa-headphones" />
              <p className="toggle__text">Artist</p>
            </div>
            <div onClick={this.toggle} className="city__toggle selected">
              <i className="fas fa-building" />
              <p className="toggle__text">City</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import DropdownContainer from "./dropdown_container";

require("flatpickr/dist/themes/dark.css");

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistSearch: false,
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
      shell.classList.remove("moveIn");
      shell.classList.add("moveBack");
      item.classList.add("selected");
      this.props.toggleArtistSearch(false);
      this.setState({ artistSearch: false });
    } else if (
      !this.state.artistSearch &&
      [...item.classList].includes("artist__toggle")
    ) {
      other = document.querySelector(".city__toggle");
      shell.classList.add("moveIn");
      shell.classList.remove("moveBack");
      other.classList.remove("selected");
      item.classList.add("selected");
      this.props.toggleArtistSearch(true);
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
    this.props.changeDate(this.state.date);
    this.props.toggleArtistSearch(false);
  }

  handleUpdate(property) {
    let that = this;
    return e => {
      that.props.geocoder(e.target.value);
      that.props.searchText(e.target.value);
      that.setState({
        [property]: e.target.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let d = moment(this.state.date[0]).format("YYYY-MM-DD");
    if (this.state.artistSearch) {
      this.props.searchArtist(this.state.query);
    } else {
      this.props.searchCities(this.state.query, d);
      this.props.clearResults();
    }
    this.props.searchText("");
  }

  render() {
    const { date, artistSearch } = this.state;
    let calendar = (
      <div className="calendar__wrapper">
        <Flatpickr
          value={date}
          onChange={date => {
            this.props.changeDate(date);
            this.setState({ date });
          }}
        />
      </div>
    );
    let placeholder, dropdown, guide;
    if (!artistSearch) {
      placeholder = " city";
      dropdown = <DropdownContainer />;
      guide = (
        <div className="guide__wrapper fadeOut">
          <div className="guide__portal" />
          <div className="guide__flex">
            <div>
              <div className="arrow" />
              <p className="guide__p">Later</p>
            </div>
            <div>
              <div className="arrow" />
              <p className="guide__p">Sooner</p>
            </div>
          </div>
          <div className="guide__text">
            The relative nearness of the event date.
          </div>
        </div>
      );
    } else {
      placeholder = "n artist";
      dropdown = null;
      guide = (
        <div className="guide__wrapper fadeIn">
          <div className="guide__portal" />
          <div className="guide__flex">
            <div>
              <div className="arrow" />
              <p className="guide__p">Later</p>
            </div>
            <div>
              <div className="arrow" />
              <p className="guide__p">Sooner</p>
            </div>
          </div>
          <div className="guide__text">
            The relative nearness of the event date.
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="search__wrapper">
          <form className="search__form" onSubmit={this.handleSubmit}>
            <div className="search__comp">
              <input
                onChange={this.handleUpdate("query")}
                value={this.props.text}
                type="text"
                placeholder={`Search for a${placeholder}`}
                className="search__input"
              />

              <button
                className="headerSearch__submit submit sc-ir"
                type="submit"
              />
            </div>
            {dropdown}
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
        {guide}
      </div>
    );
  }
}

import React from "react";
import moment from "moment";

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  handleClick(e) {
    e.preventDefault();
    let d = moment(this.props.date[0]).format("YYYY-MM-DD");
    let tomorrow = moment(d)
      .add(1, "Days")
      .format("YYYY-MM-DD");
    this.props.clearResults();
    this.props.searchResults("");
    this.props.searchCities(
      e.target.dataset["city"],
      e.target.dataset["state"],
      d,
      tomorrow
    );
  }

  render() {
    if (this.props.geocode.length > 0) {
      return (
        <ul className="dropdown__wrapper">
          {this.props.geocode.map(item => (
            <li
              className="dropdown__item"
              key={item.id}
              onClick={this.handleClick}
              data-city={item.text}
              data-state={item.context[0].short_code.slice(3)}
            >
              {item.place_name}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }
}

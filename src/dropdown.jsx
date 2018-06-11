import React from "react";
import moment from "moment";

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = { cursor: 0, result: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state.cursor !== nextState.cursor;
  }

  componentDidMount() {
    const body = document.getElementById("root");
    body.addEventListener("keydown", this.handleKeyDown);
    this.setState({ result: this.props.geocode });
  }

  componentDidUpdate() {
    this.setState({ result: this.props.geocode });
  }

  handleClick(e) {
    e.preventDefault();
    let d = moment(this.props.date).format("YYYY-MM-DD");
    d = moment(d)
      .add(1, "days")
      .format("YYYY-MM-DD");
    let tomorrow = moment(d)
      .add(1, "days")
      .format("YYYY-MM-DD");
    this.props.clearResults();
    this.props.searchCities(
      e.target.dataset["city"],
      e.target.dataset["state"],
      d,
      tomorrow
    );
    this.props.searchResults(
      e.target.dataset["city"] + ", " + e.target.dataset["state"]
    );
  }

  handleEnter() {
    let d = moment(this.props.date).format("YYYY-MM-DD");
    d = moment(d)
      .add(1, "days")
      .format("YYYY-MM-DD");
    let tomorrow = moment(d)
      .add(1, "days")
      .format("YYYY-MM-DD");
    let selected = this.props.geocode[this.state.cursor];
    this.props.searchCities(
      selected.text,
      selected.context[0].short_code.slice(3),
      d,
      tomorrow
    );
    this.props.searchResults(
      selected.text + ", " + selected.context[0].short_code.slice(3)
    );
    // this.props.clearResults();
  }

  handleMouse(e) {
    const { result, cursor } = this.state;
    let obj = result.filter(i => i.place_name === e.target.innerText)[0];
    this.setState({ cursor: result.indexOf(obj) });
  }

  handleKeyDown(e) {
    const { cursor, result } = this.state;
    if (!e) return;
    if (e.key === "ArrowUp" && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (e.key === "ArrowDown" && cursor < result.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    } else if (e.key === "Enter" && result.length > 0) {
      this.handleEnter();
    }
  }

  render() {
    const { cursor } = this.state;
    if (this.props.geocode.length > 0) {
      return (
        <ul className="dropdown__wrapper">
          {this.props.geocode.map((item, i) => (
            <li
              className={
                cursor === i
                  ? "dropdown__item hover-selected"
                  : "dropdown__item"
              }
              key={item.id}
              onClick={this.handleClick}
              data-city={item.text}
              onMouseEnter={this.handleMouse}
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

import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      date: ""
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }

  handleHover(e) {
    let target = e.target;
    console.log(Array.from(target.classList));
    
      target.classList.add("hover");
    
  }

  handleOut(e) {
    let target = e.target;
      target.classList.remove("hover");
  }

  componentDidMount() {
    this.props.edSheeranTour();
  }

  handleUpdate(property) {
    return e =>
      this.setState({
        [property]: e.target.value
      });
  }

  handleSubmit() {}

  render() {
    const { query, date } = this.state;

    return (
      <div className="search__wrapper">
        <form className="search__form" onSubmit={this.handleSubmit} onMouseOut={this.handleOut} onMouseOver={this.handleHover}>
        <div className="search__comp">
          <input
            onChange={this.handleUpdate("query")}
            value={query}
            type="text"
            placeholder="Search"
            className="search__input"
          />

          <button className="headerSearch__submit submit sc-ir" type="submit" />
          </div>
            <input type="date" value={date} onChange={this.handleUpdate("date")}/>
        </form>
      </div>
    );
  }
}

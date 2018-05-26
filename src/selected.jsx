import React from "react";

export default class Selected extends React.Component {
  constructor() {
    super();
    this.state = {
      place: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.state.place);
    this.setState({ place: nextProps.place });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.place !== this.state.place;
  }

  render() {
    if (Object.values(this.state.place).length > 0) {
      return (
        <div className="selected__wrapper fadeIn">
          <div className="selected__header__wrapper">
            <h2 className="selected__header">{this.state.place.name}</h2>
          </div>
          <div className="selected__content">
            <p className="selected__venue">{this.state.place.venue.name}</p>
            <p className="selected__venue">
              {this.state.place.venue.address.line1}
              <br />
              {this.state.place.venue.city.name},{" "}
              {this.state.place.venue.state.stateCode}
            </p>
            <p className="selected__venue">{this.state.place.time.time}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

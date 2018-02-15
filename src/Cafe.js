import React, { Component } from "react";
import PropTypes from "prop-types";

class Cafe extends Component {
  render() {
    return (
      <div className="Cafe">
        <div>name: {this.props.name}</div>
        <div>address: {this.props.address}</div>
        <div>rating: {this.props.rating}</div>
      </div>
    );
  }
}

Cafe.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  rating: PropTypes.number
};

export default Cafe;

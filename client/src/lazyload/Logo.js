import React from "react";
import osc from "../images/osc.png";
import "../style.css";

export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <img src={osc} id="logo"></img>
      </>
    );
  }
}

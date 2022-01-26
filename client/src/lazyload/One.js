import React from "react";
import pic from "../lazyload/blog/1.png";
import "../style.css";

export default class One extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <img src={pic}></img>
      </>
    );
  }
}

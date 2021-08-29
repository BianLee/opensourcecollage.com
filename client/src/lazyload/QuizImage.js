import React from "react";
import subjects from "../data/subjects.json";
import "../style.css";

export default class QuizImage extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: "Astronomy",
    };
  }
  render() {
    return (
      <>
        {subjects.map((sub) => {
          return (
            <>
              <img
                src={sub.img}
                id="logo"
                style={{
                  display: sub.title == this.state.topic ? "inline" : "none",
                }}
              ></img>
            </>
          );
        })}
      </>
    );
  }
}

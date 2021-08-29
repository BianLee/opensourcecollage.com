import React from "react";
import subjects from "./data/subjects.json";
import "./style.css";

export default class QuizDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: "Astronomy",
    };
  }
  render() {
    return (
      <>
        <div className="quizSettingDashboard">
          <span style={{ fontFamily: "Source Sans Pro" }}>
            {subjects.map((sub) => {
              return (
                <>
                  <div className="aligned">
                    <img
                      src={sub.img}
                      id="logo"
                      style={{
                        display:
                          sub.title == this.state.topic ? "inline" : "none",
                      }}
                    ></img>

                    <span
                      style={{
                        display:
                          sub.title == this.state.topic ? "inline" : "none",
                        fontFamily: "Source Sans Pro",
                        textAlign: "left",
                      }}
                    >
                      {sub.description}
                    </span>
                  </div>
                </>
              );
            })}
            <br />
            <br />
            <label
              style={{
                display: "flex",
                textDecorationThickness: "1.5px",
                fontFamily: "Source Sans Pro",
              }}
            >
              <input
                style={{
                  margin: "12px",
                  flexShrink: "0",
                }}
                type="radio"
                name="options"
              />
              Quick Practice - 12 Questions
            </label>
          </span>
        </div>
      </>
    );
  }
}

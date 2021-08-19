import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";
import OpportunitiesCategory from "./data/opportunitiesCategory.json";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleCat = this.handleCat.bind(this);
    this.state = {
      selectedCat: "",
    };
  }

  handleCat(e) {
    this.setState({
      selectedCat: e.target.id,
    });
  }

  render() {
    return (
      <>
        <h2>Post Opportunities</h2>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Title"
          className="loginBox"
          style={{
            outline: "currentcolor none medium",
          }}
          autoComplete="off"
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="URL"
          className="loginBox"
          style={{
            outline: "currentcolor none medium",
            marginTop: "20px",
          }}
          autoComplete="off"
        />
        <br /> <br />
        {OpportunitiesCategory.map((cat) => {
          return (
            <>
              <input
                key={cat.id}
                style={{
                  flexShrink: "0",
                  padding: "0.2rem",
                  marginLeft: "20px",
                  display: "inline-block",
                }}
                type="radio"
                id={cat.title}
                name="subject"
                onClick={this.handleCat}
              />{" "}
              <label
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "17px",
                  display: "inline-block",
                  marginTop: "5px",
                }}
                for={cat.title}
              >
                {cat.title}
              </label>
            </>
          );
        })}
      </>
    );
  }
}

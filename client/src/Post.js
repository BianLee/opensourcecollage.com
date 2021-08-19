import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";
import axios from "axios";
import OpportunitiesCategory from "./data/opportunitiesCategory.json";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleCat = this.handleCat.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      selectedCat: "",
      title: "",
      url: "",
      colorCode: "",
    };
  }

  handleCat(e) {
    var temp = "";
    if (e.target.id == "Math & CS") {
      temp = "physics";
    } else if (e.target.id == "Sciences") {
      temp = "math";
    } else if (e.target.id == "IT & Tech") {
      temp = "biology";
    } else if (e.target.id == "Humanities") {
      temp = "music";
    } else if (e.target.id == "Social Sciences") {
      temp = "engineering";
    } else if (e.target.id == "Art & Music") {
      temp = "other";
    }
    this.setState({
      selectedCat: e.target.id,
      colorCode: temp,
    });
  }
  handleTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  handleURL(e) {
    this.setState({
      url: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      selectedCat: this.state.selectedCat,
      title: this.state.title,
      url: this.state.url,
      colorCode: this.state.colorCode,
    };
    if (
      this.state.selectedCat.length > 0 &&
      this.state.title.length > 0 &&
      this.state.url.length > 0 &&
      this.state.colorCode.length > 0
    ) {
      axios.post("");
    } else {
      console.log("missing something");
    }
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
          onChange={this.handleTitle}
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
          onChange={this.handleURL}
        />
        <br /> <br />
        <div style={{ width: "60%" }}>
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
        </div>
        <button
          className="loginBox"
          style={{
            marginTop: "20px",
            cursor: "pointer",
            fontFamily: "Source Sans Pro",
          }}
          onClick={this.onSubmit}
        >
          Share
        </button>
        <br />
        <br />
        <p
          className="questionTitleInner"
          style={{
            marginBottom: "10px",
            fontFamily: "Source Sans Pro",
            width: "50%",
          }}
        >
          *Spam posts will result in permanent account & IP ban.
        </p>
      </>
    );
  }
}

import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";
import axios from "axios";
import OpportunitiesCategory from "./data/opportunitiesCategory.json";
import firebase from "firebase";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleCat = this.handleCat.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      category: "",
      title: "",
      link: "",
      colorcode: "",

      posts: [],
    };
  }

  componentDidMount = () => {
    this.getPost();
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log("what is going on");
          this.setState({ loggedIn: "yes" });
        } else {
          this.setState({ loggedIn: "no" });
        }
      }.bind(this)
    );
  };
  getPost = () => {
    // https://bianbackend.herokuapp.com/api/getMessage
    axios
      .get("https://server-bianlee.vercel.app/api/getPost")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("data has been received");
        //console.log(JSON.stringify(this.state.posts))
      })
      .catch(() => {
        alert("error retreving data!!");
      });
  };

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
      category: e.target.id,
      colorcode: temp,
    });
  }
  handleTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  handleURL(e) {
    this.setState({
      link: e.target.value,
    });
  }
  onSubmit(e) {
    const post = {
      category: this.state.category,
      title: this.state.title,
      link: this.state.link,
      colorcode: this.state.colorcode,
    };
    if (
      this.state.category.length > 0 &&
      this.state.title.length > 0 &&
      this.state.link.length > 0 &&
      this.state.colorcode.length > 0
    ) {
      axios
        .post("https://server-bianlee.vercel.app/api/postPost", post)
        .then(
          (res) => this.props.history.push("/"),
          console.log("page update?"),
          this.getPost(),
          this.componentDidMount()
        )
        .catch((error) => {
          console.log("Error!");
        });
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

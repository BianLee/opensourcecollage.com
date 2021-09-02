import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";
import blog1 from "./blog/1.md";
import blog2 from "./blog/2.md";
import blogundefined from "./blog/undefined.md";
import ReactMarkdown from "react-markdown";
import blog from "./data/blog.json";
import Markdown from "markdown-to-jsx";
import rehypeRaw from "rehype-raw";
import Disqus from "disqus-react";
import { thistle } from "color-name";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: "",
      page: "undefined",
      title: "",
    };
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    var int = JSON.stringify(window.location.href).slice(-2, -1);
    console.log(int);
    var pageToRender;
    const pages = [blog1, blog2];
    pageToRender = pages[int - 1];
    console.log(pageToRender);
    if (pageToRender == undefined) {
      pageToRender = blogundefined;
    } else {
      fetch(pageToRender)
        .then((response) => response.text())
        .then((text) => {
          this.setState({ terms: text, page: int });
        });
    }
    blog.map((b) => {
      if (b.id == int) {
        this.setState({
          title: b.title,
        });
      }
    });
  }

  goHome(e) {
    console.log("hello");
    this.props.history.push("/");
  }

  render() {
    const disqusShortname = "https-opensourcecollage-com";
    const disqusConfig = {
      url: "https://opensourcecollage.com",
      identifier: JSON.stringify(window.location.href).slice(-2, -1),
      title: this.state.title,
    };
    return (
      <>
        {this.state.page === "undefined" ? (
          <></>
        ) : (
          <>
            {" "}
            <center>
              <div className="dashboard">
                <p
                  className="questionTitleInner"
                  style={{ marginBottom: "10px" }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "2rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={this.goHome}
                  >
                    Home
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "2rem",
                    }}
                  >
                    {" "}
                    {">"}{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "2rem",
                    }}
                  >
                    Blog {this.state.page}
                  </span>
                </p>
                <ReactMarkdown
                  rehypePlugins={rehypeRaw}
                  className={style.reactMarkDown}
                  children={this.state.terms}
                ></ReactMarkdown>

                <br />
                <br />
                <Disqus.DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                  style={{ width: "90%" }}
                />
              </div>
            </center>
          </>
        )}
      </>
    );
  }
}

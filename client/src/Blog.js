import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";
import blog1 from "./blog/1.md";
import blog2 from "./blog/2.md";
import blog3 from "./blog/3.md";
import blog4 from "./blog/4.md";
import blogundefined from "./blog/undefined.md";
import ReactMarkdown from "react-markdown";
import blog from "./data/blog.json";
import Markdown from "markdown-to-jsx";
import rehypeRaw from "rehype-raw";
import Disqus from "disqus-react";
import { thistle } from "color-name";
import marked from "marked";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { bind } from "jest-each";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: "",
      page: "undefined",
      title: "",
      id: 0,
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    console.log(window.location.href);
    var int = JSON.stringify(window.location.href).slice(-2, -1);
    console.log(int);
    var pageToRender;
    const pages = [blog1, blog2, blog3, blog4];
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
          id: b.id,
        });
      }
    });
  }

  goHome(e) {
    console.log("hello");
    this.props.history.push("/");
  }

  render() {
    const disqusShortname = "opensourcecollage";
    const disqusConfig = {
      url: "https://opensourcecollage.com/blog/" + this.state.id,
      identifier: this.state.title,
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
              <div className="dashboardArticle">
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
                    Blog {">"} {this.state.page}
                  </span>
                </p>

                <div
                  className={style.reactMarkDown}
                  dangerouslySetInnerHTML={{ __html: marked(this.state.terms) }}
                ></div>

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

import React from "react";
import "./style.css";
import style from "./markdown-styles.module.css";

import blogundefined from "./blog/undefined.md";
import ReactMarkdown from "react-markdown";
// import blog from "./data/blog.json";
import Markdown from "markdown-to-jsx";
import rehypeRaw from "rehype-raw";
import Disqus from "disqus-react";
import { thistle } from "color-name";
import marked from "marked";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { withRouter } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Helmet } from "react-helmet";

import One from "./blogs/blog1";
import Two from "./blogs/blog2";
import Three from "./blogs/blog3";
import Four from "./blogs/blog4";
import Five from "./blogs/blog5";
import Six from "./blogs/blog6";
import Seven from "./blogs/blog7";
import Eight from "./blogs/blog8";
import Nine from "./blogs/blog9";

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
      page: props.page,
      title: props.title,
      id: props.page,
      description: props.description,
      content: "",
      markdown: "",
      d: props.propRender,
    };

    this.goToBlog = this.goToBlog.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    fetch(this.state.d)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({
          markdown: marked(text),
        });
      });

    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  goToBlog(e) {
    console.log("hello");
    this.props.history.push("/blog");
  }

  render() {
    const { markdown } = this.state;
    let blogToRender;
    if (this.state.id == "1") {
      blogToRender = <One />;
    } else if (this.state.id == "2") {
      blogToRender = <Two />;
    } else if (this.state.id == "3") {
      blogToRender = <Three />;
    } else if (this.state.id == "4") {
      blogToRender = <Four />;
    } else if (this.state.id == "5") {
      blogToRender = <Five />;
    } else if (this.state.id == "6") {
      blogToRender = <Six />;
    } else if (this.state.id == "7") {
      blogToRender = <Seven />;
    } else if (this.state.id == "8") {
      blogToRender = <Eight />;
    } else if (this.state.id == "9") {
      blogToRender = <Nine />;
    }

    const disqusShortname = "opensourcecollage";
    const disqusConfig = {
      url: "https://opensourcecollage.com/blog/" + this.state.id,
      identifier: this.state.title,
      title: this.state.title,
    };
    return (
      <>
        <>
          {" "}
          <MetaTags>
            <title>{this.state.title}</title>
            <meta
              id="meta-description"
              name="description"
              content={this.state.description}
            />
          </MetaTags>
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
                  }}
                  onClick={this.goToBlog}
                >
                  ← Return to blog
                </span>
                {/*
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
                 */}
              </p>

              <div className={style.reactMarkDown}>{blogToRender}</div>

              <br />
              <br />
              <ins
                class="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-9584425027469512"
                data-ad-slot="7942866447"
              ></ins>
              <br />
              <br />
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
                style={{ width: "90%" }}
              />
            </div>
            <Helmet>
              <script
                data-name="BMC-Widget"
                data-cfasync="false"
                src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
                data-id="bianleedev"
                data-description="Support me on Buy me a coffee!"
                data-message=""
                data-color="#FF5F5F"
                data-position="Right"
                data-x_margin="30"
                data-y_margin="30"
              />
            </Helmet>
          </center>
        </>
      </>
    );
  }
}

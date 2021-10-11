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
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { withRouter } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Helmet } from "react-helmet";

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
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
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

  goHome(e) {
    console.log("hello");
    this.props.history.push("/");
  }

  render() {
    const { markdown } = this.state;

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
                  onClick={this.goHome}
                >
                  ← Return Home
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

              <div
                className={style.reactMarkDown}
                dangerouslySetInnerHTML={{ __html: markdown }}
              ></div>

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

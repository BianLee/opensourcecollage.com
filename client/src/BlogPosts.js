import React, { useEffect, useState } from "react";
import blog from "./data/blog.json";
import instagram from "./data/instagram.json";
import "./style.css";
import organizations from "./data/organizations.json";
import BlogsCategory from "./data/blogsCategory.json";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default class BlogPosts extends React.Component {
  constructor() {
    super();
    this.handleBlogCat = this.handleBlogCat.bind(this);
    this.handleBlogsSearch = this.handleBlogsSearch.bind(this);
    this.state = {
      blogSearch: "",
      blogCat: ["News", "School", "Interview"],
      renderedPosts: [],
      renderedBlogs: blog,
      blogModeInstagram: true,
    };
    this.goHome = this.goHome.bind(this);
    this.handleNormalView = this.handleNormalView.bind(this);
    this.handleCompactView = this.handleCompactView.bind(this);
  }

  goHome(e) {
    console.log("hello");
    this.props.history.push("/");
  }

  handleOrg(e) {
    console.log(e.target.parentNode.id);
    if (this.state.selectedOrg === e.target.parentNode.id) {
      console.log("same same");
      this.setState({
        selectedOrg: "",
      });
    } else {
      // console.log(e.target.parentNode.id);
      this.setState({
        selectedOrg: e.target.parentNode.id,
      });
    }
  }

  handleBlogsSearch(e) {
    var temp = e.target.value.toLowerCase();
    if (temp.length != 0) {
      this.setState({
        blogCat: [],
      });
    } else {
      this.setState({
        blogCat: ["News", "School", "Interview"],
      });
    }

    this.setState(
      {
        blogSearch: temp,
      },
      () => {
        this.setState({
          renderedBlogs: blog.filter((opp) => {
            return opp.title
              .toLowerCase()
              .includes(this.state.blogSearch.toLowerCase());
          }),
        });
      }
    );
  }

  handleBlogCat(e) {
    var cc;
    cc = e.target.id;
    console.log(cc);
    if (this.state.blogCat.includes(cc)) {
      this.setState(
        {
          blogCat: this.state.blogCat.filter(function (a) {
            return a !== cc;
          }),
        },
        () => {
          console.log(this.state.blogCat);
          this.setState({
            renderedBlogs: blog.filter((a) => {
              return this.state.blogCat.includes(a.category);
            }),
          });
        }
      );
    } else {
      this.setState(
        {
          blogCat: [...this.state.blogCat, cc],
        },
        () => {
          console.log(this.state.blogCat);
          this.setState({
            renderedBlogs: blog.filter((a) => {
              return this.state.blogCat.includes(a.category);
            }),
          });
        }
      );
    }
  }

  handleNormalView(e) {
    this.setState({
      blogModeInstagram: true,
    });
  }
  handleCompactView(e) {
    this.setState({
      blogModeInstagram: false,
    });
  }

  render() {
    document.title = "Blog";
    return (
      <>
        <div
          className="dashboardBlog"
          style={{ marginTop: "15px", marginBottom: "30px" }}
        >
          <p
            className="questionTitleInner"
            id="questionTitle"
            style={{ fontSize: "18px", lineHeight: "2rem" }}
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
            <br />
            <input
              type="text"
              name="name"
              placeholder="Search Blog"
              className="dod-input"
              style={{
                float: "left",
                outline: "currentcolor none medium",
                fontFamily: "Source Sans Pro",
                marginTop: "15px",
              }}
              autoComplete="off"
              onChange={this.handleBlogsSearch}
            />
            <input
              style={{
                flexShrink: "0",
                padding: "0.2rem",

                marginTop: "15px",
                display: "inline-block",
              }}
              type="radio"
              name="subject"
              onClick={this.handleNormalView}
              id="normal"
              defaultChecked={this.state.blogModeInstagram}
            />{" "}
            <label
              style={{
                fontFamily: "Source Sans Pro",
                fontSize: "17px",
                marginTop: "15px",
                display: "inline-block",
              }}
              for="normal"
            >
              Normal
            </label>
            <input
              style={{
                flexShrink: "0",
                padding: "0.2rem",

                display: "inline-block",
              }}
              type="radio"
              name="subject"
              onClick={this.handleCompactView}
              id="compact"
            />{" "}
            <label
              style={{
                fontFamily: "Source Sans Pro",
                fontSize: "17px",
                display: "inline-block",
              }}
              for="compact"
            >
              Compact
            </label>
            {BlogsCategory.map((a) => {
              return (
                <>
                  <div
                    style={{
                      display:
                        this.state.blogSearch.length != 0
                          ? "none"
                          : "inline-block",
                    }}
                    onClick={this.handleBlogCat}
                  >
                    <input
                      key={a.id}
                      style={{
                        flexShrink: "0",
                        padding: "0.2rem",
                        marginLeft: "20px",
                      }}
                      type="checkbox"
                      defaultChecked="true"
                      id={a.title}
                    />{" "}
                    <label
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontSize: "17px",
                        display: "inline-block",
                        marginTop: "5px",
                      }}
                      for={a.title}
                    >
                      {a.title}
                    </label>
                  </div>
                </>
              );
            })}
            <div className="blog-media-grid" style={{ marginTop: "40px" }}>
              {this.state.blogModeInstagram ? (
                <>
                  {this.state.renderedBlogs.map((post) => {
                    return (
                      <>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          id={post.id}
                          to={"/blog/" + post.id}
                        >
                          <div
                            className="instagramPost"
                            id={post.category + "Button"}
                          >
                            <img src={post.img}></img>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {" "}
                  {this.state.renderedBlogs.map((entry) => {
                    return (
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        id={entry.id}
                        to={"/blog/" + entry.id}
                      >
                        <div
                          className="blogPost"
                          // onClick={this.handleClick}

                          id={entry.category + "Button"}
                          onMouseOver={this.handleHover}
                        >
                          {entry.title}
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </p>
        </div>
        <div className="dashboard" style={{ marginTop: "-28px" }}>
          <p
            className="questionTitleInner"
            id="questionTitle"
            style={{ fontSize: "18px", lineHeight: "2rem" }}
          ></p>
        </div>
      </>
    );
  }
}

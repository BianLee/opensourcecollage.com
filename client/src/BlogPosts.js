import React, { useEffect, useState } from "react";
import blog from "./data/blog.json";
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
    };
    this.goHome = this.goHome.bind(this);
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

  render() {
    document.title = "Blog";
    return (
      <>
        <div className="dashboardBlog" style={{ marginTop: "15px" }}>
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

            <div className="blog-media-grid" style={{ marginTop: "20px" }}>
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
                      >
                        {entry.title}
                      </div>
                    </Link>
                  );
                })}
              </>
            </div>
          </p>
        </div>
        <div className="dashboard" style={{ marginTop: "-28px" }}>
          <p
            className="questionTitleInner"
            id="questionTitle"
            style={{ fontSize: "18px", lineHeight: "2rem" }}
          >
            <span
              style={{
                paddingLeft: "20px",
                fontFamily: "Source Sans Pro",
                fontSize: "17px",
                display: "inline-block",
                marginTop: "5px",
              }}
            >
              Categories:
            </span>

            {BlogsCategory.map((a) => {
              return (
                <>
                  <div
                    style={{
                      display:
                        this.state.blogSearch.length != 0
                          ? "none"
                          : "inline-block",
                      marginBottom: "20px",
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
            <input
              type="text"
              name="name"
              placeholder="Search Blog"
              className="dod-input"
              style={{
                float: "left",
                outline: "currentcolor none medium",
                fontFamily: "Source Sans Pro",
                marginTop: "5px",
              }}
              autoComplete="off"
              onChange={this.handleBlogsSearch}
            />
          </p>
        </div>
      </>
    );
  }
}

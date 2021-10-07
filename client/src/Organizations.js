import React, { useEffect, useState } from "react";
import "./style.css";
import organizations from "./data/organizations.json";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default class Organizations extends React.Component {
  constructor() {
    super();
    this.state = {
      orgSearch: "",
      startOrgIndex: 0,
      renderedSearchOrganizations: [],
      selectedOrg: "",
    };
    this.goHome = this.goHome.bind(this);
    this.handleOrg = this.handleOrg.bind(this);
    this.handleOrgSearch = this.handleOrgSearch.bind(this);
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

  handleOrgSearch(e) {
    var temp = e.target.value.toLowerCase();
    this.setState(
      {
        orgSearch: temp,
        selectedOrg: "",
      },
      () => {
        this.setState({
          renderedSearchOrganizations: organizations.filter((org) => {
            return org.title
              .toLowerCase()
              .includes(this.state.orgSearch.toLowerCase());
          }),
        });
      }
    );
  }

  render() {
    document.title = "Organizations";
    return (
      <>
        <div className="dashboardArticle">
          <p className="questionTitleInner" style={{ marginBottom: "10px" }}>
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
          </p>
        </div>
        <center>
          <div className="dashboard" style={{ marginTop: -10 }}>
            <p
              className="questionTitleInner"
              id="questionTitle"
              style={{ fontSize: "18px", lineHeight: "2rem" }}
            >
              <center>
                {this.state.orgSearch.length != 0 ? (
                  <>
                    {this.state.renderedSearchOrganizations.map((org) => {
                      return (
                        <>
                          <div
                            className="featuredTwo"
                            id={org.title}
                            value={org.title}
                            onClick={this.handleOrg}
                            style={{
                              border:
                                this.state.selectedOrg == org.title
                                  ? "solid 2px #e3d6c8 "
                                  : "",
                              filter:
                                this.state.selectedOrg != ""
                                  ? this.state.selectedOrg == org.title
                                    ? ""
                                    : "opacity(30%)"
                                  : "",
                            }}
                          >
                            <img src={org.img}></img>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {" "}
                    {organizations.map((org) => {
                      return (
                        <>
                          <div
                            className="featuredTwo"
                            id={org.title}
                            value={org.title}
                            onClick={this.handleOrg}
                            style={{
                              border:
                                this.state.selectedOrg == org.title
                                  ? "solid 2px #e3d6c8 "
                                  : "",
                              filter:
                                this.state.selectedOrg != ""
                                  ? this.state.selectedOrg == org.title
                                    ? ""
                                    : "opacity(30%)"
                                  : "",
                            }}
                          >
                            <img src={org.img}></img>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </center>
              <br />

              <>
                {" "}
                {organizations.map((org) => {
                  return (
                    <>
                      {" "}
                      <div
                        style={{
                          backgroundColor: "#f7f7f7",
                          paddingLeft: "45px",
                          paddingRight: "40px",
                        }}
                      >
                        <p
                          style={{
                            display:
                              this.state.selectedOrg == org.title
                                ? "inline"
                                : "none",

                            fontFamily: "Source Sans Pro",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            <br />
                            {org.title}
                          </span>{" "}
                          •{" "}
                          <a
                            href={org.link}
                            target="_blank"
                            style={{
                              fontFamily: "Source Sans Pro",
                              overflowWrap: "break-word",
                            }}
                          >
                            {org.link}
                          </a>
                          <br />
                          {org.description}
                          <br />
                          <br />
                        </p>
                      </div>
                    </>
                  );
                })}
                <>
                  {/*
                  <center style={{ marginTop: "20px" }}>
                    <span
                      onClick={this.prevOrg}
                      style={{
                        fontFamily: "Source Sans Pro",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      ← Prev
                    </span>
                    <span
                      style={{
                        fontFamily: "Source Sans Pro",
                      }}
                    >
                      {this.state.startOrgIndex / 17 + 1} of{" "}
                      {this.state.orgSearch != 0
                        ? Math.ceil(
                            this.state.renderedSearchOrganizations.length / 17
                          ) == 0
                          ? 1
                          : Math.ceil(
                              this.state.renderedSearchOrganizations.length / 17
                            )
                        : Math.ceil(organizations.length / 17) == 0
                        ? 1
                        : Math.ceil(organizations.length / 17)}
                    </span>
                    <span
                      onClick={this.nextOrg}
                      style={{
                        fontFamily: "Source Sans Pro",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Next →
                    </span>
                  </center>
                  
                   */}
                  <br />
                  <input
                    type="text"
                    name="name"
                    placeholder="Search Organization"
                    className="dod-input"
                    style={{
                      outline: "currentcolor none medium",
                    }}
                    autoComplete="off"
                    onChange={this.handleOrgSearch}
                  />
                  <br />
                </>
              </>
            </p>
          </div>
        </center>
      </>
    );
  }
}

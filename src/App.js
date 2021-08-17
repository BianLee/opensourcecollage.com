import { everyLimit } from "async";
import React, { Component } from "react";
import Astronomy from "./data/astronomy.json";
import Biology from "./data/bio.json";
import osc from "./images/osc.png";
import leftBlog from "./data/leftBlog.json";
import rightBlog from "./data/rightBlog.json";
import category from "./data/category.json";
import organizations from "./data/organizations.json";
import LifeSciences from "./notes/LifeSciences.pdf";
import Notes from "./data/notes.json";
import Opportunities from "./data/opportunities.json";
import OpportunitiesCategory from "./data/opportunitiesCategory.json";
import "./style.css";
import Blog from "./Blog";
import { lowerCase, uniqBy } from "lodash";
// import ReactMarkdown from "react-markdown";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    // PostData = Astronomy;
    this.handleOrg = this.handleOrg.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOrgSearch = this.handleOrgSearch.bind(this);
    this.nextOrg = this.nextOrg.bind(this);
    this.prevOrg = this.prevOrg.bind(this);
    this.state = {
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
      accordion: "",
      selectedOrg: "",
      doubleClicked: false,
      orgSearch: "",
      startOrgIndex: 0,
    };
  }
  //  PostData = Astronomy;
  answerLetters = ["a", "b", "c", "d", "e"];
  subjects = [
    "Astronomy",
    "Biology",
    "Computer Science",
    "Cybersecurity",
    "Economics",
    "Java",
    "Javascript",
  ];

  exitQuiz = () => {
    this.setState({
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
      orgSearch: "",
    });
  };

  reviewQuestions = () => {
    this.setState({
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      orgSearch: "",
    });
  };

  setAnswer(event) {
    console.log(event.target.value);
    this.setState({
      chosenAnswer: event.target.value,
      checkStatus: true,
    });
  }

  showSolution() {
    console.log(this.state.Data[this.state.questionNum].correct);
    this.setState({
      isShowingAnswer: true,
      finalChosenAnswer: this.state.chosenAnswer,
    });
    if (
      this.state.chosenAnswer ===
      this.state.Data[this.state.questionNum].correct
    ) {
      this.setState({
        score: this.state.score + 1,
        statusArray: [...this.state.statusArray, "✓"],
      });
    } else {
      this.setState({
        statusArray: [...this.state.statusArray, "✕"],
      });
    }
  }

  chooseTopic(event) {
    console.log(event.target.value);
    this.setState({
      isSpecificTopicChosen: true,
      topic: event.target.value,
      Data: event.target.value,
    });
    if (event.target.value == "Astronomy") {
      this.setState({
        Data: Astronomy,
      });
    } else if (event.target.value == "Biology") {
      this.setState({
        Data: Biology,
      });
    }
  }

  nextQuestion = () => {
    this.setState({
      isShowingAnswer: false,
      chosenAnswer: "",
    });

    this.setState({
      answersArray: [...this.state.answersArray, this.state.chosenAnswer],
      chosenAnswer: "",
    });

    if (this.state.questionNum + 1 < this.state.Data.length) {
      this.setState({
        questionNum: this.state.questionNum + 1,
      });
    } else {
      this.setState({
        isEnd: true,
      });
    }
  };

  accordion(e) {
    console.log(e.target.parentNode.id);
    if (this.state.accordion !== e.target.parentNode.id) {
      this.setState({
        accordion: e.target.parentNode.id,
      });
    } else {
      if (this.state.accordion.length == 0) {
        this.setState({
          accordion: e.target.parentNode.id,
        });
      } else {
        this.setState({
          accordion: "",
        });
      }
    }
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

  handleClick(e) {
    console.log(e.target.parentNode.id);
    this.props.history.push("/blog/" + e.target.parentNode.id);
  }

  handleOrgSearch(e) {
    var temp = e.target.value.toLowerCase();
    this.setState({
      orgSearch: temp,
      selectedOrg: "",
    });
  }
  handleOpportunitiesSearch(e) {
    console.log(e.target.value);
  }
  nextOrg(e) {
    this.setState({
      selectedOrg: "",
    });
    console.log("clicked");
    if (this.state.startOrgIndex + 8 >= organizations.length) {
    } else {
      this.setState({
        startOrgIndex: this.state.startOrgIndex + 8,
      });
    }
  }
  prevOrg(e) {
    this.setState({
      selectedOrg: "",
    });
    if (this.state.startOrgIndex - 8 < 0) {
    } else {
      this.setState({
        startOrgIndex: this.state.startOrgIndex - 8,
      });
    }
  }

  render() {
    const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;
    if (!this.state.isSpecificTopicChosen) {
      return (
        <>
          <center>
            <div className="dashboard">
              {" "}
              <br />
              <h1>Open Source Collage</h1>
              {/* <button className="loginButton">Login</button> */}
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <br />
                <div className="aligned">
                  <img src={osc} id="logo"></img>

                  <span style={{ fontSize: "17px", lineHeight: "1.9rem" }}>
                    Open Source Collage is a user-friendly platform designed to
                    help students develop their passion and discover new
                    opportunities through providing a search mechanism for
                    events, lectures, scholarships, competitions, and
                    organizations you can get involved with. It also allows you
                    to share your own events upon creating an account, which
                    will help you and your organization connect with thousands
                    of others in all parts of the country. OSC leads an effort
                    on its own to bring useful resources to students through
                    facilitating new connections between students and
                    organizations.
                  </span>
                </div>

                <br />
              </p>
            </div>

            <div className="dashboard">
              <center>
                <b>Notes</b> - Why waste time taking notes when these exist?
              </center>
              <br />
              {Notes.map((sub) => {
                return (
                  <>
                    <a href={sub.url} target="_blank">
                      <button
                        key={sub.id}
                        className="noteButton"
                        id={sub.colorcode}
                      >
                        {sub.title}
                      </button>
                    </a>
                  </>
                );
              })}
            </div>
            <div className="dashboard">
              <center>
                <b>Quizzes</b> - Test your knowledge!
              </center>
              <br />
              {this.subjects.map((sub) => {
                return (
                  <button
                    value={sub}
                    className="subjectButton"
                    id={lowerCase(sub) + "Button"}
                    onClick={this.chooseTopic.bind(this)}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            <div className="dashboard">
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <br />
                <center>
                  <b>Opportunities</b> - Browse extracurriculars based on your
                  interests
                </center>
                <br />

                {/*
                {category.map((opp, index) => {
                  if (opp.colorcode === this.state.accordion) {
                  }
  
                  return (
                    <>
                      <div
                        className="subject"
                        id={opp.colorcode}
                        value="asdf"
                        onClick={(e) => this.accordion(e)}
                      >
                        <div
                          className="descriptionContainer"
                          style={{
                            cursor: "pointer",
                            padding: "12px",
                          }}
                          id={opp.colorcode}
                          onClick={(e) => this.accordion(e)}
                        >
                          <center
                            style={{
                              fontSize: "20px",
                              fontFamily: "Source Sans Pro",
                            }}
                          >
                            {opp.title}
                          </center>
                          <div
                            style={{
                              display:
                                opp.colorcode === this.state.accordion
                                  ? "inline"
                                  : "none",
                            }}
                          >
                            <div
                              className="description"
                              style={{
                                fontSize: "16px",
                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              {opp.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })} */}

                <div className="dod-media-grid dod-stack-15">
                  {Opportunities.map((opp) => {
                    return (
                      <>
                        <a
                          href={opp.link}
                          target="_blank"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="oppPost" id={opp.colorcode}>
                            {opp.organization}: {opp.title}
                          </div>
                        </a>
                      </>
                    );
                  })}
                </div>
                <br />
                {OpportunitiesCategory.map((cat) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "inline-block",
                          marginBottom: "20px",
                        }}
                      >
                        <input
                          key={cat.id}
                          style={{
                            flexShrink: "0",
                            padding: "0.2rem",
                            marginLeft: "20px",
                          }}
                          type="radio"
                        />{" "}
                        <label
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "17px",
                            display: "inline-block",
                            marginTop: "5px",
                          }}
                        >
                          {cat.title}
                        </label>
                      </div>
                    </>
                  );
                })}
                <input
                  type="text"
                  name="name"
                  placeholder="Search Opportunities"
                  className="dod-input"
                  style={{
                    outline: "currentcolor none medium",
                  }}
                  autoComplete="off"
                  onChange={this.handleOpportunitiesSearch}
                />
              </p>
            </div>

            <div className="dashboard" style={{ marginTop: -10 }}>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <center>
                  <br />
                  <b>Organizations</b> - Find student-run organizations
                  <br />
                  <br />
                  {this.state.orgSearch.length != 0 ? (
                    <>
                      {organizations.map((org) => {
                        return (
                          <>
                            <div
                              className="featured"
                              id={org.title}
                              value={org.title}
                              onClick={this.handleOrg}
                              style={{
                                display: org.title
                                  .toLowerCase()
                                  .includes(this.state.orgSearch)
                                  ? "inline-block"
                                  : "none",
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
                      {organizations
                        .slice(
                          this.state.startOrgIndex,
                          this.state.startOrgIndex + 8
                        )
                        .map((org) => {
                          return (
                            <>
                              <div
                                className="featured"
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
                    <center style={{ marginTop: "20px" }}>
                      <span
                        onClick={this.prevOrg}
                        style={{
                          fontFamily: "Source Sans Pro",
                          marginRight: "20px",
                          cursor: "pointer",
                          display:
                            this.state.orgSearch.length == 0
                              ? "inline"
                              : "none",
                        }}
                      >
                        ← Prev
                      </span>
                      <span
                        style={{
                          fontFamily: "Source Sans Pro",
                          display:
                            this.state.orgSearch.length == 0
                              ? "inline"
                              : "none",
                        }}
                      >
                        {this.state.startOrgIndex / 8 + 1}
                      </span>
                      <span
                        onClick={this.nextOrg}
                        style={{
                          fontFamily: "Source Sans Pro",
                          marginLeft: "20px",
                          cursor: "pointer",
                          display:
                            this.state.orgSearch.length == 0
                              ? "inline"
                              : "none",
                        }}
                      >
                        Next →
                      </span>
                    </center>
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
            <div className="dashboard" style={{ marginTop: -10 }}>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <center>
                  <br />
                  <b>Blog</b> - All things students can relate to!
                </center>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="column">
                    {leftBlog.map((entry) => {
                      return (
                        <>
                          <div
                            key={entry.id}
                            id={entry.id}
                            className="blogText"
                            style={{
                              fontFamily: "Source Sans Pro",
                              marginTop: "12px",
                            }}
                            onClick={this.handleClick}
                          >
                            <div style={{ fontFamily: "Source Sans Pro" }}>
                              • {entry.title}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="column">
                    {rightBlog.map((entry) => {
                      return (
                        <>
                          <div
                            key={entry.id}
                            id={entry.id}
                            className="blogText"
                            style={{
                              fontFamily: "Source Sans Pro",
                              marginTop: "12px",
                            }}
                            onClick={this.handleClick}
                          >
                            <div style={{ fontFamily: "Source Sans Pro" }}>
                              • {entry.title}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </p>
            </div>

            <div className="dashboard">
              <hr></hr>

              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <br />
                <center>
                  <a
                    href="https://instagram.com/opensourcecollage"
                    target="_blank"
                  >
                    <ion-icon name="logo-instagram" id="social"></ion-icon>
                  </a>
                  <a href="https://facebook.com" target="_blank">
                    <ion-icon name="logo-facebook" id="social"></ion-icon>
                  </a>
                  <a href="https://linkedin.com" target="_blank">
                    <ion-icon name="logo-linkedin" id="social"></ion-icon>
                  </a>
                  <a href="https://github.com" target="_blank">
                    <ion-icon name="logo-github" id="social"></ion-icon>
                  </a>
                </center>
              </p>
            </div>
          </center>
        </>
      );
    } else {
      return (
        <>
          <center>
            <h3 style={{ marginTop: "25px", fontFamily: "Source Sans Pro" }}>
              Quiz - {this.state.topic}
            </h3>
            {this.state.isEnd ? (
              <>
                <div className="questionBox">
                  <p>
                    Score: {this.state.score} / {this.state.Data.length}
                  </p>
                  <p>
                    Percentage:{" "}
                    {Math.round(
                      (
                        (this.state.score / this.state.Data.length) *
                        100
                      ).toFixed(2)
                    )}
                    %
                  </p>
                  {this.state.statusArray.map((answer, index) => {
                    return (
                      <span>
                        {index + 1}. {answer} &nbsp;&nbsp;
                      </span>
                    );
                  })}
                  <br />
                  <br />
                </div>
                <span
                  span
                  id="buttonDesign"
                  style={{ position: "relative", top: "40px" }}
                  onClick={(e) => this.reviewQuestions()}
                >
                  Take quiz again
                </span>
                <p></p>
              </>
            ) : (
              <>
                <div className="questionBox">
                  {/* {PostData.map((postDetail, index) => {
                return <p>{postDetail.title}</p>;
              })}  */}
                  <p
                    className="questionTitleInner"
                    id="questionTitle"
                    style={{
                      marginBottom: "20px",
                      fontFamily: "Source Sans Pro",
                      fontSize: "1.2rem",
                    }}
                  >
                    {this.state.questionNum + 1}.&nbsp;
                    {this.state.Data[this.state.questionNum].title}
                  </p>

                  {this.state.Data[this.state.questionNum].choices.map(
                    (option, index) => {
                      return (
                        <div key={index}>
                          <label>
                            <div
                              className="questionBoxInner"
                              style={{
                                backgroundColor: this.state.isShowingAnswer
                                  ? this.answerLetters[index] ===
                                    this.state.Data[this.state.questionNum]
                                      .correct
                                    ? "#00ff00"
                                    : this.state.finalChosenAnswer ===
                                      this.answerLetters[index]
                                    ? "#fff0de"
                                    : ""
                                  : this.state.chosenAnswer ===
                                    this.answerLetters[index]
                                  ? "#fff0de"
                                  : "",
                                padding: "15px",
                              }}
                              htmlFor={this.answerLetters[index]}
                            >
                              {/* {this.answerLetters[index]}. */}
                              <label
                                className="optionText"
                                style={{
                                  /* }
                                  textDecorationLine:
                                    this.state.isShowingAnswer &&
                                    this.answerLetters[index] !==
                                      this.state.Data[this.state.questionNum]
                                        .correct
                                      ? "line-through"
                                : "none", */
                                  display: "flex",
                                  textDecorationThickness: "1.5px",
                                  fontFamily: "Source Sans Pro",
                                }}
                              >
                                <input
                                  style={{
                                    margin: "12px",
                                    flexShrink: "0",
                                  }}
                                  className="optionInput"
                                  onChange={this.setAnswer.bind(this)}
                                  type="radio"
                                  id={this.answerLetters[index]}
                                  value={this.answerLetters[index]}
                                  name="options"
                                  checked={
                                    !this.state.isShowingAnswer &&
                                    this.state.chosenAnswer ===
                                      this.answerLetters[index]
                                  }
                                />
                                {option}
                              </label>
                            </div>
                          </label>
                        </div>
                      );
                    }
                  )}

                  <p></p>
                </div>
                {this.state.isShowingAnswer &&
                this.state.Data[this.state.questionNum].solution.length != 0 ? (
                  <>
                    <div className="instructions" style={{ marginTop: "15px" }}>
                      <p
                        className="questionTitleInner"
                        id="questionTitle"
                        style={{
                          fontSize: "1.1rem",
                          lineHeight: "2rem",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        {/* • Difficulty:{" "}
                        {this.state.Data[this.state.questionNum].difficulty}
                        <br />• Topics:&nbsp;
                        {this.state.Data[this.state.questionNum].category.map(
                          (cat, index) => {
                            return (
                              <span
                                style={{ fontSize: "18px", lineHeight: "2rem" }}
                              >
                                {index ? ", " : ""}
                                {cat}
                              </span>
                            );
                          }
                        )}
                        <br />➞ Explanation:{" "} */}
                        {this.state.statusArray[this.state.questionNum] ===
                        "✓" ? (
                          <span
                            style={{
                              color: "#04d904",
                              fontWeight: "bold",
                              fontFamily: "Source Sans Pro",
                            }}
                          >
                            ✓ Correct
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontFamily: "Source Sans Pro",
                            }}
                          >
                            ✕ Incorrect
                          </span>
                        )}
                        <br />•{" "}
                        {this.state.Data[this.state.questionNum].solution}
                      </p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <span id="exitButton" onClick={(e) => this.exitQuiz()}>
                  ← Exit
                </span>

                {this.state.isShowingAnswer ? (
                  <>
                    <span id="nextButton" onClick={(e) => this.nextQuestion()}>
                      Next →
                    </span>
                  </>
                ) : (
                  <>
                    <span id="nextButton" onClick={(e) => this.showSolution()}>
                      Check
                    </span>
                  </>
                )}
                <br />
              </>
            )}
          </center>
        </>
      );
    }
  }
}

export default App;

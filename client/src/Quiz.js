import React, { Component, Suspense } from "react";
import subjects from "./data/subjects.json";
import "./style.css";
import App from "./App";
import osc from "./images/osc.png";
import Astronomy from "./data/astronomy.json";
import Biology from "./data/bio.json";
import ITF from "./data/itf.json";
import Economics from "./data/economics.json";
import Business from "./data/business.json";
import Networking from "./data/networking.json";

export default class Quiz extends App {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.state.questionNum);
    console.log(this.state.startQuiz);
    console.log(this.props.history.location.pathname);
    if (this.props.history.location.pathname.includes("astronomy")) {
      this.setState({
        topic: "Astronomy",
        Data: Astronomy,
      });
    } else if (this.props.history.location.pathname.includes("biology")) {
      this.setState({
        topic: "Biology",
        Data: Biology,
      });
    } else if (this.props.history.location.pathname.includes("business")) {
      this.setState({
        topic: "Business",
        Data: Business,
      });
    } else if (this.props.history.location.pathname.includes("economics")) {
      this.setState({
        topic: "Economics",
        Data: Economics,
      });
    } else if (this.props.history.location.pathname.includes("itf")) {
      this.setState({
        topic: "IT Fundamentals",
        Data: ITF,
      });
    } else if (this.props.history.location.pathname.includes("networking")) {
      this.setState({
        topic: "Computer Networking",
        Data: Networking,
      });
    }
  }

  beginQuiz() {
    this.setState(
      {
        startQuiz: true,
      },
      () => {
        console.log(this.state.startQuiz);
      }
    );
  }

  goHome(e) {
    console.log("hello");
    this.props.history.push("/");
  }

  render() {
    return (
      <>
        <center>
          <br />
          {this.state.startQuiz == true ? (
            <>
              {this.state.isEnd ? (
                <>
                  <div className="questionBox">
                    <p>
                      Score: {this.state.score} / {this.state.Data.length}
                    </p>
                    <p>
                      <br />
                      Percentage:{" "}
                      {Math.round(
                        (
                          (this.state.score / this.state.Data.length) *
                          100
                        ).toFixed(2)
                      )}
                      %
                    </p>
                    <br />
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
                    <p
                      className="questionTitleInner"
                      id="questionTitle"
                      style={{
                        marginBottom: "20px",
                        fontFamily: "Source Sans Pro",
                        fontSize: "1.1rem",
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
                                <label
                                  className="optionText"
                                  style={{
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
                                  {/* {this.answerLetters[index]}. */} {option}
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
                  this.state.Data[this.state.questionNum].solution.length !=
                    0 ? (
                    <>
                      <div
                        className="instructions"
                        style={{
                          marginTop: "10px",
                          paddingBottom: "30px",
                          borderRadius: "17px",
                          border:
                            this.state.statusArray[this.state.questionNum] !=
                              "✓" &&
                            this.state.statusArray[this.state.questionNum] !=
                              "✕"
                              ? "transparent 2px solid"
                              : this.state.statusArray[
                                  this.state.questionNum
                                ] === "✓"
                              ? "#04d904 2px solid"
                              : "lightgray 2px solid",
                        }}
                      >
                        <p
                          className="questionTitleInner"
                          id="questionTitle"
                          style={{
                            fontSize: "1.1rem",
                            lineHeight: "2rem",
                            fontFamily: "Source Sans Pro",
                          }}
                        >
                          {this.state.statusArray[this.state.questionNum] ===
                          "✓" ? (
                            <span
                              style={{
                                color: "#04d904",

                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              ✓ Correct
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              ✕ Incorrect
                            </span>
                          )}{" "}
                          <br />•{" "}
                          {this.state.Data[this.state.questionNum].solution}
                          <br />
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <center>
                    <span
                      style={{
                        fonFamily: "Source Sans Pro",
                        color: "red",
                      }}
                    >
                      {this.state.emptyAnswerWarning}
                    </span>
                  </center>
                  <span id="exitButton" onClick={(e) => this.exitQuiz()}>
                    ← Exit
                  </span>

                  {this.state.isShowingAnswer ? (
                    <>
                      <span
                        id="nextButton"
                        onClick={(e) => this.nextQuestion()}
                      >
                        Next →
                      </span>
                      <span>
                        <br />
                        <br />
                        <br />
                        <br />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        id="nextButton"
                        onClick={(e) => this.showSolution()}
                      >
                        Check
                      </span>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <h3>Quiz - {this.state.topic}</h3>
              <div className="quizSettingDashboard">
                <span style={{ fontFamily: "Source Sans Pro" }}>
                  <div className="aligned">
                    {subjects.map((sub) => {
                      return (
                        <>
                          <div className="lazyloadImgParent">
                            <img
                              src={"/" + sub.img}
                              id="logo"
                              style={{
                                display:
                                  sub.title == this.state.topic
                                    ? "inline"
                                    : "none",

                                marginTop: "10px",
                                marginRight: "48px",
                              }}
                            ></img>
                          </div>
                        </>
                      );
                    })}

                    {subjects.map((sub) => {
                      return (
                        <>
                          <span
                            className="logoDescription"
                            style={{
                              display:
                                sub.title == this.state.topic
                                  ? "inline"
                                  : "none",
                              fontFamily: "Source Sans Pro",
                              textAlign: "left",
                            }}
                          >
                            {sub.description}
                          </span>
                        </>
                      );
                    })}
                  </div>
                  <br />
                  {subjects.map((sub) => {
                    return (
                      <>
                        <div
                          className="quizInfo"
                          style={{
                            display:
                              sub.title == this.state.topic ? "" : "none",
                            fontFamily: "Source Sans Pro",
                          }}
                        >
                          Question Author: {sub.questionAuthor}
                          <br />
                          Number of Questions: {sub.numberOfQuestions}
                        </div>
                      </>
                    );
                  })}
                  <br />
                  <button
                    onClick={(e) => this.goHome(e)}
                    className="subjectButton"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={(e) => this.beginQuiz(e)}
                    className="subjectButton"
                  >
                    Start Quiz
                  </button>
                  {/*
                    <label
                      style={{
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
                        onChange={this.setAnswer.bind(this)}
                        type="radio"
                        name="options"
                      />
                      Quick Practice - 12 Questions
                    </label>  */}
                </span>
              </div>
            </>
          )}
        </center>
      </>
    );
  }
}

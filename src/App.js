import { everyLimit } from "async";
import React, { Component } from "react";
import Astronomy from "./data/astronomy.json";
import Biology from "./data/bio.json";
import interstem from "./images/interstem.png";
import ocbiology from "./images/ocbiology.png";
import modulus from "./images/modulus.png";
import osc from "./images/osc.png";
import "./style.css";
import { lowerCase, uniqBy } from "lodash";
class App extends Component {
  constructor() {
    super();
    // PostData = Astronomy;
    this.state = {
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      difficultyArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
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
      difficultyArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
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
      difficultyArray: [],
      score: 0,
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
  render() {
    if (!this.state.isSpecificTopicChosen) {
      return (
        <>
          <center>
            <div className="dashboard">
              {" "}
              <br />
              <h1>Open Source Collage</h1>
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
                <b>Quizzes</b> - Test your knowledge and prepare for tests!
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
                  <b>Opportunities</b> - Events & Extracurriculars!
                </center>
                <br />
                <div className="subject" id="math">
                  <center>Mathematics & Computer Science</center>
                </div>
                <div className="subject" id="physics">
                  <center>Sciences (Physics, Chemistry, Biology)</center>
                </div>
                <div className="subject" id="biology">
                  <center>Engineering</center>
                </div>
                <br />
                <div className="subject" id="music">
                  <center>Humanities (English, History)</center>
                </div>
                <div className="subject" id="engineering">
                  <center>Social Sciences (Economics, Psychology, etc)</center>
                </div>
                <div className="subject" id="other">
                  <center>Art (Design, Music)</center>
                </div>
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
                  <b>Organizations</b> - Student-run Nonprofits!
                  <br />
                  <br />
                  <div className="featured">
                    <img src={osc}></img>
                  </div>
                  <div className="featured">
                    <img src={interstem}></img>
                  </div>
                  <div className="featured">
                    <img src={modulus}></img>
                  </div>
                  <div className="featured">
                    <img src={ocbiology}></img>
                  </div>
                </center>
              </p>
            </div>

            <br />
            <div className="dashboard">
              <hr></hr>

              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <br />
                <center>Open Source Collage 2021</center>
              </p>
            </div>
          </center>
        </>
      );
    } else {
      return (
        <>
          <center>
            <br />
            <h2>{this.state.topic}</h2>
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
                  <p className="questionTitleInner" id="questionTitle">
                    {this.state.questionNum + 1}.&nbsp;
                    {this.state.Data[this.state.questionNum].title}
                  </p>
                  <br />
                  <hr></hr>

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
                                    ? "#ffebee"
                                    : ""
                                  : this.state.chosenAnswer ===
                                    this.answerLetters[index]
                                  ? "#ffebee"
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
                                  display: "inline",
                                  textDecorationThickness: "1.5px",
                                }}
                              >
                                <input
                                  style={{
                                    marginRight: "12px",
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
                    <div className="instructions">
                      <p
                        className="questionTitleInner"
                        id="questionTitle"
                        style={{ fontSize: "18px", lineHeight: "2rem" }}
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
                            style={{ color: "#04d904", fontWeight: "bold" }}
                          >
                            ✓ Correct
                          </span>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
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
                &nbsp;&nbsp; &nbsp;&nbsp;
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
              </>
            )}
          </center>
        </>
      );
    }
  }
}

export default App;

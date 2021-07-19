import { everyLimit } from "async";
import React, { Component } from "react";
import Astronomy from "./data/astronomy.json";
import Biology from "./data/bio.json";
import "./style.css";
class App extends Component {
  constructor() {
    super();
    // PostData = Astronomy;
    this.state = {
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
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

  exitQuiz = () => {
    this.setState({
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
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
    });
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
    });
    if (this.state.isShowingAnswer) {
      this.setState({
        statusArray: [...this.state.statusArray, "✕"],
      });
    } else {
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
            <h2>BOSTONLOBSTER ACADEMY</h2>
            <div className="dashboardTopics">
              <button
                value="Astronomy"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Astronomy
              </button>
              <button
                value="Business"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Business
              </button>
              <button
                value="Biology"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Biology
              </button>
              <button
                value="Cryptography"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Cryptography
              </button>
              <button
                value="Economics"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Economics
              </button>
              <button
                value="Linux"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Linux
              </button>
            </div>

            <div className="dashboard">
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                This platform aims to educate students on various subjects
                through problem solving. It features core academic disciplines,
                as well as topics students normally wouldn't encounter in
                typical class settings. With thorough explanations and detailed
                score report, students can recognize their strengths, and better
                understand areas on which they need to improve. If you wish to
                contribute, please visit{" "}
                <a
                  href="https://github.com/BianLee/edu"
                  target="_blank"
                  style={{ textDecoration: "none", fontSize: "1.1rem" }}
                >
                  GitHub
                </a>
                &nbsp;page and refer to the README.
                <br />
              </p>
            </div>
          </center>
        </>
      );
    } else {
      return (
        <>
          <center>
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
                                    : ""
                                  : this.state.chosenAnswer ===
                                    this.answerLetters[index]
                                  ? "pink"
                                  : "",
                                padding: "15px",
                              }}
                              htmlFor={this.answerLetters[index]}
                            >
                              {/* {this.answerLetters[index]}. */}
                              <label
                                className="optionText"
                                style={{
                                  textDecorationLine:
                                    this.state.isShowingAnswer &&
                                    this.answerLetters[index] !==
                                      this.state.Data[this.state.questionNum]
                                        .correct
                                      ? "line-through"
                                      : "none",
                                  display: "flex",
                                  textDecorationThickness: "1.5px",
                                }}
                              >
                                <input
                                  style={{
                                    marginRight: "12px",
                                    flexShrink: "0",
                                  }}
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
                &nbsp;&nbsp;
                <span
                  id="revealAnswerButton"
                  onClick={(e) => this.showSolution()}
                >
                  Reveal Answer
                </span>
                &nbsp;&nbsp;
                <span id="nextButton" onClick={(e) => this.nextQuestion()}>
                  Next →
                </span>
              </>
            )}
          </center>
          <br /> <br />
          <br /> <br />
        </>
      );
    }
  }
}

export default App;

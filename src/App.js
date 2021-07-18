import React, { Component } from "react";
import PostData from "./data/astronomy.json";
import "./style.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      answersArray: [],
      statusArray: [],
      difficultyArray: [],
      score: 0,
    };
  }

  answerLetters = ["a", "b", "c", "d", "e"];

  exitQuiz = () => {};

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
    console.log(PostData[this.state.questionNum].correct);
    this.setState({
      isShowingAnswer: true,
    });
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
        this.state.chosenAnswer === PostData[this.state.questionNum].correct
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

    if (this.state.questionNum + 1 < PostData.length) {
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
    return (
      <>
        <center>
          <h2>General Astronomy</h2>
          {this.state.isEnd ? (
            <>
              <div className="questionBox">
                <p>
                  Score: {this.state.score} / {PostData.length}
                </p>
                <p>
                  Percentage:{" "}
                  {Math.round(
                    ((this.state.score / PostData.length) * 100).toFixed(2)
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
                  {PostData[this.state.questionNum].title}
                </p>
                <hr></hr>

                {PostData[this.state.questionNum].choices.map(
                  (option, index) => {
                    return (
                      <div key={index}>
                        <label>
                          <div
                            className="questionBoxInner"
                            style={{
                              backgroundColor: this.state.isShowingAnswer
                                ? this.answerLetters[index] ===
                                  PostData[this.state.questionNum].correct
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
                                    PostData[this.state.questionNum].correct
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

export default App;

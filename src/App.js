import React, { Component } from "react";
import PostData from "./data/astronomy.json";
import "./style.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      questionNum: 0,
      isEnd: false,
      chosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
    };
  }

  answerLetters = ["a", "b", "c", "d", "e"];

  setAnswer(event) {
    console.log(event.target.value);
    this.setState({
      chosenAnswer: event.target.value,
      checkStatus: true,
    });
  }

  nextQuestion = () => {
    if (this.state.chosenAnswer === PostData[this.state.questionNum].correct) {
      this.setState({
        score: this.state.score + 1,
        statusArray: [...this.state.statusArray, "Correct"],
      });
    } else {
      this.setState({
        statusArray: [...this.state.statusArray, "Incorrect"],
      });
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
          <h1>General Astronomy</h1>
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
                    <p>
                      {index + 1}. {answer}
                    </p>
                  );
                })}
              </div>
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
                              backgroundColor:
                                this.state.chosenAnswer ===
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
                              style={{ display: "flex" }}
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
              <span
                id="nextButton"
                style={{ position: "relative", top: "20px" }}
                onClick={(e) => this.nextQuestion()}
              >
                NEXT
              </span>
            </>
          )}
        </center>
      </>
    );
  }
}

export default App;

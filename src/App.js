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
            <h3>Lobster Institute of Technology (LIT)</h3>
            <div className="dashboardTopics">
              <button
                value="Astronomy"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Astronomy
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
                Java
              </button>
              <button
                value="Linux"
                className="subjectButton"
                onClick={this.chooseTopic.bind(this)}
              >
                Javascript
              </button>
            </div>

            <div className="dashboard">
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                Welcome to Lobster Institute of Technology (LIT)!
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus.
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
                        style={{ fontSize: "1.1rem", lineHeight: "2rem" }}
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

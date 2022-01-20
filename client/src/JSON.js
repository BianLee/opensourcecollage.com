import React from "react";
import "./style.css";
import axios from "axios";

export default class JSON extends React.Component {
  constructor(props) {
    super(props);
    this.handleVar = this.handleVar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      solution: "",
      correct: "",
    };
  }

  handleVar(e) {
    if (e.target.id == "1") {
      this.setState({
        title: e.target.value,
      });
    } else if (e.target.id == "2") {
      this.setState({
        optionA: e.target.value,
      });
    } else if (e.target.id == "3") {
      this.setState({
        optionB: e.target.value,
      });
    } else if (e.target.id == "4") {
      this.setState({
        optionC: e.target.value,
      });
    } else if (e.target.id == "5") {
      this.setState({
        optionD: e.target.value,
      });
    } else if (e.target.id == "6") {
      this.setState({
        correct: e.target.value,
      });
    } else if (e.target.id == "7") {
      this.setState({
        solution: e.target.value,
      });
    }
  }

  onSubmit(e) {
    const jsonpost = {
      title: this.state.title,
      choices: [
        this.state.optionA,
        this.state.optionB,
        this.state.optionC,
        this.state.optionD,
      ],
      correct: this.state.correct,
      solution: this.state.solution,
    };

    axios
      .post("https://server-bianlee.vercel.app/api/postJsonPost", jsonpost)
      .then((res) => console.log("page update?"), this.props.history.push("/"))
      .catch((error) => {
        this.props.history.push("/");
        console.log("Error!");
      });
  }

  render() {
    const placeholders = [
      "Who was the first President of the United States?",
      "Ronald Reagan",
      "Donald Trump",
      "Thomas Jefferson",
      "George Washington",
      "d",
      "George Washington was an American soldier, statesman, and Founding Father.",
    ];

    return (
      <>
        <br />
        <div className="dashboard">
          {placeholders.map((placeholder, i) => {
            i++;
            return (
              <>
                <input
                  id={i}
                  placeholder={placeholder}
                  className="jsonBox"
                  style={{
                    outline: "currentcolor none medium",
                    marginRight: "20px",
                    fontSize: "18px",
                    lineHeight: "1.9rem",
                    fontFamily: "Source Sans Pro",
                    width: "70%",
                    marginBottom: "10px",
                    paddingLeft: "5px",
                  }}
                  autoComplete="off"
                  onChange={this.handleVar}
                />
                <br />
              </>
            );
          })}
          <button
            style={{
              fontSize: "18px",
              lineHeight: "1.9rem",
              fontFamily: "Source Sans Pro",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </>
    );
  }
}

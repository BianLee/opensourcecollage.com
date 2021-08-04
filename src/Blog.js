import React from "react";
import "./style.css";
import one from "./blog/one.md";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

const markdown = `A paragraph with *emphasis* and **strong importance**.`;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: "",
      page: 0,
    };
  }

  componentWillMount() {
    var int = JSON.stringify(window.location.href).slice(-2, -1);
    console.log(int);

    fetch(one)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        this.setState({ terms: text, page: int });
      });
  }

  render() {
    return (
      <>
        {" "}
        <center>
          <ReactMarkdown>{this.state.terms}</ReactMarkdown>
          <Markdown>{this.state.terms}</Markdown>
        </center>
      </>
    );
  }
}

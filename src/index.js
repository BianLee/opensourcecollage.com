import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Blog from "./Blog";

const input = "# This is a header\n\nAnd this is a paragraph";

ReactDOM.render(
  <Router>
    <Route path="/blog" component={Blog} />
    <Route exact path="/" component={App} />
  </Router>,
  document.getElementById("root")
);

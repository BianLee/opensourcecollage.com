import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Blog from "./Blog";
import Login from "./Login";
import Quiz from "./Quiz";
import LifeSciences from "./notes/LifeSciences.pdf";

ReactDOM.render(
  <Router>
    <Route path="/blog" component={Blog} />
    <Route exact path="/quiz/astronomy" component={Quiz} />
    <Route exact path="/quiz/biology" component={Quiz} />
    <Route exact path="/quiz/business" component={Quiz} />
    <Route exact path="/quiz/economics" component={Quiz} />
    <Route exact path="/quiz/itf" component={Quiz} />
    <Route exact path="/quiz/networking" component={Quiz} />
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={Login} />
  </Router>,
  document.getElementById("root")
);

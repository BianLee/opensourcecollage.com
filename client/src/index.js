import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Blog from "./Blog";
import Login from "./Login";
import blog1 from "./blog/1.md";
import blog2 from "./blog/2.md";
import blog3 from "./blog/3.md";
import blog4 from "./blog/4.md";
import blog5 from "./blog/5.md";
import Quiz from "./Quiz";
import LifeSciences from "./notes/LifeSciences.pdf";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route exact path="/quiz/astronomy" component={Quiz} />
    <Route exact path="/quiz/biology" component={Quiz} />
    <Route exact path="/quiz/business" component={Quiz} />
    <Route exact path="/quiz/economics" component={Quiz} />
    <Route exact path="/quiz/itf" component={Quiz} />
    <Route exact path="/quiz/networking" component={Quiz} />
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={Login} />
    <Route
      exact
      path="/blog/1"
      render={(props) => (
        <Blog
          {...props}
          propRender={blog1}
          page="1"
          title="The Development Journey of Open Source Collage"
          isAuthed={true}
        />
      )}
    />
    <Route
      exact
      path="/blog/2"
      render={(props) => (
        <Blog
          {...props}
          propRender={blog2}
          page="2"
          title="From Cloud Computing to Audio Engineering: Tao's Ventures in the World of Business and Technology"
          isAuthed={true}
        />
      )}
    />
    <Route
      exact
      path="/blog/3"
      render={(props) => (
        <Blog
          {...props}
          propRender={blog3}
          page="3"
          title="The Single Best Decision I Made in High School"
          isAuthed={true}
        />
      )}
    />
    <Route
      exact
      path="/blog/4"
      render={(props) => (
        <Blog
          {...props}
          propRender={blog4}
          page="4"
          title="Ellen Xu: A Driven, Optimistic Innovator With Unique Approach to Today's Technology and Research"
          isAuthed={true}
        />
      )}
    />
    <Route
      exact
      path="/blog/5"
      render={(props) => (
        <Blog
          {...props}
          propRender={blog5}
          page="5"
          title="Is Dual Enrollment Worth it? Ranking and Evaluating Every Community College Class I Took So Far"
          isAuthed={true}
        />
      )}
    />
  </Router>,
  document.getElementById("root")
);

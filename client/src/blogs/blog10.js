import React from "react";
import "../style.css";
import "../markdown-styles.module.css";
import axios from "axios";

import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default class blog10 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Advantages of Sports Participation Throughout High School</h1>
        <div style={{ marginTop: "12px" }}>
          Abrar Alzabin • January 24, 2022 •{" "}
          <i>Should you play sports in high school?</i>
        </div>
        <br />
        <p>
          Sports can help you achieve better overall health. Physical activity
          has been found to have significant benefits for mental health. Sports
          and other forms of physical activity might help you relax and feel
          more content. Whether you're playing sports, going for a walk, or
          working out at the gym, physical exercise produces brain chemicals
          that help you feel calmer and happier. Team sports provide a healthy
          and positive challenge as well as an opportunity to unwind. They also
          provide social benefits since they allow you to socialize with your
          teammates.
          <br />
          <br />
          Students who participate in athletics in high school acquire a strong
          work ethic. To achieve their objectives, they must devote a
          significant amount of time and effort. This will also help with the
          development of time management skills in athletics and in the
          classroom. Through high school athletic students learn leadership
          skills and are driven to work together to achieve success.
          <br />
          <br />
          Sports help high school students because they drive them to do well in
          school, gain important life skills, and boost their chances of earning
          a scholarship. Sports participation can assist individuals to improve
          their grades and attendance. In addition, sports teaches students to
          work together as a team. This improves collaboration which allows
          students to accomplish more. These skills may be used in a variety of
          facets of a student's life, including their employment. Sports provide
          students with more than just the potential to win a game; sports teach
          students valuable skills and inspire them.
          <br />
          <br />I decided to take up badminton and tennis during my junior year
          of high school. My stress level began to decrease as I focused my
          attention on something else, which improved my mood. I noticed that I
          was doing better in school since my mind was more focused on the tasks
          that I was completing. Through my participation in sports, I was able
          to form strong friendships with other members of the team. Sports also
          taught me how to balance my schedule on a regular basis, which helped
          me build better time management skills and minimize procrastination.
          <br />
          <br />
          Taking part in sports throughout high school provides a number of
          benefits. A high school student's participation in a sport helps them
          develop important life skills that will benefit them in the long term.
          Because sports allow people's minds to develop, they are beneficial
          for physical, and mental health. Many skills, such as timeliness,
          patience, discipline, collaboration, and devotion, may be gained
          through sports and athletics. Sports may aid in the development and
          enhancement of our self-esteem. Regularly participating in sports
          enables us to be more active and it prevents illnesses including
          arthritis, obesity, heart disease, and diabetes. In our daily lives,
          sports teaches us to be more disciplined and patient. It shows how to
          improve our lives by reducing defects. By reducing the frequency of
          stress and rage through sports, it increases our confidence and gives
          us a sense of success.
        </p>
      </>
    );
  }
}

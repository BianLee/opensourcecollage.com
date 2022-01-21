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

export default class blog5 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Life After High School: Austin’s Student Life at Yale!</h1>
        <div style={{ marginTop: "12px" }}>
          Bian Lee • October 16, 2021 •{" "}
          <i>
            Interview with Austin Wang, a first-year student at Yale University
          </i>
        </div>
        <br />
        <p>
          This week I interviewed Austin Wang, a first-year student at Yale
          University. He graduated from Northwood High School last year (class
          of 2021). I’d gotten to know him through orchestra and MUSE (Musicians
          United for Service and Entertainment; a school club dedicated to
          bringing music to community members through performances). I’ve been
          in the same senior center performances during my freshman and
          sophomore year. I also recall some of the most interesting
          presentations he gave during the club meetings last year, one of which
          was using machine learning libraries to create sound and music, and
          the process of doing so through python code on Codelabs. A brilliant
          violinist, programmer and an entrepreneur, he is extremely talented in
          many areas including in physics and computer science. Throughout high
          school, I’ve asked him several times about academics &amp;
          extracurriculars, and I can say that he is undoubtedly one of the most
          inspiring people. He is now a Yale student, taking on various subjects
          and studies. After recently seeing his Instagram stories and posts of
          the campus during the midterm season, I wondered what his life was
          like as a college student and how he felt about the college
          experience. I decided to reach out to him to find out!
          <br /> <br />
          <b>Bian Lee</b>: What are you currently majoring in?
          <br /> <br />
          <b>Austin Wang</b>: I'm a first-year at Yale University in Berkeley
          College, one of Yale's twelve residential colleges in the system, and
          I'm thinking about double majoring in Mathematics and Physics &amp;
          Computer Science and Economics (or maybe Statistics &amp; Data
          Science). To be honest, I'm not completely sure yet, so I'm definitely
          taking some time to explore a bunch of different fields and hopefully
          figure it out sometime before my junior year.
          <br /> <br />
          <b>Bian</b>: What are some of your interests at the moment?
          <br /> <br />
          <b>Austin</b>: I'm still very interested in astronomy and astrophysics
          as I was in high school, and I'm taking a first-year-seminar called
          "Expanding Ideas in Time and Space" with a fantastic professor in a
          class of 15 students. Yale has these cool small "seminar" classes of
          varying fields and focuses, and I've really enjoyed my time debating
          about how we perceive time, dabbling through Einstein's equations,
          Lorentz Transformations, tensors, and all that fun stuff! Lately, I've
          been very interested in exoplanet search, and there's a lab that I'm
          hoping to join soon! Asteroid mining is also intriguing to me because
          there's an economic argument that can be made -- can we hypothetically
          crash certain sectors of the market of natural resources if we figured
          out how to extract resources from asteroids?
          <br /> <br />
          Another one of my classes, Game Theory, has really changed how I
          perceive social and physical phenomena in the world -- did you know
          lots of theories in political science, biology, extraterrestrial life,
          war, poker, and more can be explained and analyzed with game theory?
          Learning stuff like the Prisoners' Dilemma, where I learned that Yale
          students are evil, Median Voter Theorem, and Partnership Games, I'm
          just very fascinated about how models can attempt to explain the world
          and how it works. Starting with simple models and then making them
          more detailed and complicated to improve their accuracy is really the
          way to go! But unlike mathematics, you can't always prove things will
          work out rigorously. I'd say that my proof-based Linear Algebra class
          has been very challenging but rewarding. The problem sets have been
          notoriously difficult and long (as it's all proofs!) and the
          spontaneous Putnam problems have really incited me and many of my
          classmates to rush office hours, begging TA's for hints and answers.
          Honestly, it really cultivates a different sense of community when
          you're all struggling together (this is a good thing)!
          <br /> <br />
          But besides academics and research, I've developed a newfound
          appreciation for the emphasis on the arts. I'm currently a violinist
          in the Yale Symphony Orchestra, and I'm especially looking forward to
          some of the cool events like the YSO Halloween Show, where members of
          the orchestra can act for a pre-recorded film and play alongside the
          film in-person in front of hundreds of students all dressed up in
          costumes. We actually have a concert on 10/16, and it'll be
          live-streamed directly on YSO's Youtube Channel!
          <br /> <br />
          <b>Bian</b>: What do you find different about college from high school
          and what do you like the best about college?
          <br /> <br />
          <b>Austin</b>: The main difference is that college makes you more
          independent. You have a lot more freedom to do whatever you want to
          do, explore new passions, make new friends, go to hangouts, and choose
          classes. In college, there is a lot less structured time (you can even
          skip classes if you want -- but not recommended!), so you can budget
          time to do other things. However, this freedom also comes with
          responsibility. You're now in charge of cleaning your room, doing
          laundry every week, taking out the trash, and a lot more logistical
          housekeeping things on top of your coursework and social life -- you
          make your own schedule. It's actually been very fun becoming more
          independent as I can now spend less time on things that don't interest
          me and more on those that I'm passionate about.
          <br /> <br />
          Academically, college emphasizes a lot more on the concept of "office
          hours." You're really expected to go to office hours if you need
          support or help on anything, or if you just want to collaborate with
          your peers on problem-sets. This makes it very easy for students to
          approach them for office hours and research lab opportunities. I'd
          also say that college has a lot less busy work than high school, and
          everything you do in a class is essentially meaningful in preparing
          you for the next step. On that note, I'd say that the academic rigor
          at Yale as of now is definitely on the tougher end of the spectrum, so
          I'm trying my best to adjust -- for example, I've never been
          challenged at the level of taking a mentally rigorous four and a half
          hour midterm in-person at an auditorium full of people. (I promise
          that it doesn't sound as bad as it seems!) But overall, I'd say that
          if you're up for the challenge, you'll find these classes to be very
          rewarding!
          <br /> <br />
          My favorite thing about college so far are the social connections that
          I've made. Yale has an unique residential college system in which it
          matches students into one of 14 residential colleges, and I think that
          it really fosters a community of collaboration and inclusiveness.
          Within these residential colleges, each dorm has a common room that
          really encourages students to socialize, work together on projects, or
          study through midterms, and this has created a unique sense of bonding
          for me. At least, my suitemates are all pretty close with each other,
          and we regularly chip in to play a bunch of games and other stuff, if
          we're not too busy. And, it's also super cool that I can sit at a
          random table in one of our residential dining halls and talk to other
          students about some random subjects that they're studying -- I find
          these discussions to be very intellectually stimulating, and you
          always learn something new talking to someone studying a field totally
          foreign to you (like Russian Literature or Ethnicity, Race, and
          Migration). I'd say that one really cool thing about Yale is that most
          residential colleges have game rooms with pool tables, ping-pong
          tables, foosball, pin-ball machines, arcade machines, even an indoor,
          underground basketball court and movie theater. It's really nice to
          hang out in these common areas and play a few games with friends to
          relieve the stress of classes. Also, there's a "buttery" thing at Yale
          that allows you to get food for a cheap price from 11PM to 1AM. I find
          this very helpful when I decide that I'm going to stay up and need a
          late night snack (although I don't recommend staying up too late).
          <br /> <br />I also really enjoy the personalized attention and size
          of classes at Yale, which has been very helpful as I figure out my
          schedules, majors, classes, and life. Freshman seminars and smaller
          discussion sections for classes have really allowed me to learn better
          and bond better with my peers. I'd say that Yale is very undergraduate
          learning focused, so the professors are all expected to teach and to
          help facilitate the learning process even while continuing with their
          research endeavors -- as a result, they're all very approachable and
          friendly towards students.
          <br /> <br />
          <b>Bian</b>: What are some goals you have for the next few years?
          <br /> <br />
          <b>Austin</b>: I'd love to find out what I want to do with my life. I
          also know that this is a really hard question, and I'll hopefully have
          a fraction of the answer by graduation. Some goals in mind are to
          obtain a well-rounded education, get my degree, make some new friends,
          run a marathon, create something cool (very vague), and keep pursuing
          my interests to the fullest extent. It'd be fun to really explore the
          East Coast and also decide where I want to live or work in the future.
          As for a career, I'll hopefully be trying out a bunch of different
          options to figure it out. Maybe I'll go to grad school. As for now, I
          just really want to have fun and live the four years of my life that
          I'll never get back! Lastly, if anyone has any additional questions
          for me or if you want to learn more about Yale, feel free to reach
          out!
        </p>
      </>
    );
  }
}

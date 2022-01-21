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

export default class blog1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>The Development Journey of Open Source Collage</h1>
        <div style={{ marginTop: "12px" }}>
          Bian Lee • August 22, 2021 •{" "}
          <i>
            The story behind how and why OSC was built, and what the future
            holds for the platform.{" "}
          </i>
        </div>
        <br />
        <p>
          Over the course of my high school years, I've gotten to work in
          numerous school clubs and regional organizations, and I came across a
          lot of other ones that my peers were involved in. It didn't take long
          to see how so many new student-run groups were constantly forming
          every year, all of which essentially having the same goals (changing
          the education system, aiding the underprivileged communities, etc).
          While a handful of them seemed to know what they were doing and had
          pretty impressive accomplishments, too many of the so-called
          "nonprofits" were nothing more than fancy board titles and pretty
          social media promotions.
          <br />
          <br />
          It's become too difficult to find meaningful organizations amidst all
          the other useless ones. It's easy for anyone to sign up to be in one
          of these groups and claim their leadership ability through these board
          positions, yet it is difficult to tell whether they achieved anything
          notable from it. To me, it seemed like students could easily waste
          time on useless extracurriculars doing useless things that really
          benefit no one. To address these issues, I built Open Source Collage.
          While this platform has undergone many changes over time, the main
          goal has always remained the same: To help high school students
          succeed. From the very beginning, I strived to build something that
          students could actually find useful. Thinking that I recognized a
          problem to be solved (too many people starting groups, but not so many
          willing to volunteer), I first thought to provide service through
          which students can more easily find extracurricular activities,
          enabling better interaction between students and organizations.
          However, at this point in time, it's evolved into something greater
          and I've been working to establish it as an educational platform to
          aid students in <i>every way</i> it can. This project has kept me
          occupied this year (minus 2 month of hiatus in June-July), and it has
          certainly been an interesting journey. This is the development story
          of Open Source Collage, and what I envision the future for this app.
          <br />
          <br />
          Around February, I began prototyping the model. I also got my brother
          Ian and my friend Pranav to help with the development of the project.
          Pranav and I wrote codes (primarily in Javascript), and I had my
          brother handle the logistical side. After working on it for a while,
          we released the project some time around the end of March. The main
          functionality was allowing users to browse events and extracurricular
          opportunities, and if they signed up for an account, they could share
          their own as well. We entered our project in a business ideathon
          competition, where the project placed 3rd, winning a small monetary
          fund and mentorship from a business consultant.
          <br />
          <br />I had written the code not long after learning ReactJS and MERN
          stack for the first time, and with poor design and repetitive lines,
          the codebase soon became unmanageable with a jumble of spaghetti
          codes. The app didn’t have anything special either; there wasn’t any
          unique functionality that another similar website didn’t have. I
          realized there wasn’t much potential. I quickly lost the motivation to
          continue on with the project, and I moved on to doing other things,
          leaving Open Source Collage at an announced hiatus.
          <br />
          <br />I would have abandoned the project entirely if it hadn’t been
          for some business classes I was taking over the summer. I was inspired
          to create something on my own, and manage it. I wanted to get back
          into the fun of developing web applications, and I decided I would
          pursue this platform again, this time with all seriousness. I had not
          gotten far last time, and I decided I would change things up a little
          bit this time. While the existing feature could be useful, there were
          too many similar websites that accomplished the same functionality far
          better than what I had implemented. I also realized that for my
          application to succeed, I should focus on content possibly even more
          so than the technicality. As an amateur developer, the code is
          admittedly pretty bad, and there is a limit to what I can accomplish
          through code. Yet, even if it follows horrible software design and has
          a bad interface, users could still return and continue using the site,
          if the content is worth the bad user experience.
          <br />
          <br />I didn’t want Open Source Collage to be completely different
          from what it was previously, so I thought to turn it into an
          educational platform. Essentially, it would be a web space where high
          school students could learn new materials, test their knowledge,
          discover new interests, find organizations, and read blogs like this
          for advice and entertainment. Having taken numerous classes at high
          school and from dual enrollment program, I had enough notes and
          question sets to contribute for the platform. I developed the quiz
          function independently one weekend, then I later integrated it into
          the rest of the newly built site. I ensured that the new layout was
          mobile-friendly and responsive on all devices.
          <br />
          <br />
          After about a week of intense, focused work, I was able to push for
          early release. I announced the release date of this app on my
          Instagram few days ago, and today, on August 22, I am finally bringing
          back the second generation of Open Source Collage, after it was
          originally launched back in March. While it is at its beta state, with
          room for plenty of improvements, I am still happy about this release,
          and I plan to continue pushing this project further. Let's all have a
          great school year!! 😎
        </p>
      </>
    );
  }
}

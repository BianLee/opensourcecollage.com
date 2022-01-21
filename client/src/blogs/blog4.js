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

export default class blog4 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>
          Ellen Xu: A Driven, Optimistic Innovator With Unique Approach to
          Today's Technology and Research
        </h1>
        <div style={{ marginTop: "12px" }}>
          Bian Lee • September 9, 2021 •{" "}
          <i>
            Interview with Ellen Xu, a 2x ISEF Finalist, CyberPatriot national
            champion, and a researcher at UCSD Kawasaki Disease Research Center.{" "}
          </i>
        </div>

        <p>
          <br />
          This is the story of Ellen Xu, a high school student from San Diego
          who is a 2x ISEF finalist, Cyberpatriot XIII National Champion, and a
          current researcher at UCSD Kawasaki Disease Research Center. She is
          involved with various other initiatives of her own, including her own{" "}
          <a href="https://newsletter.deltaxpod.com/" target="_blank">
            blog
          </a>{" "}
          and{" "}
          <a
            href="https://www.itspmagazine.com/delta-x-podcast"
            target="_blank"
          >
            podcast
          </a>
          . I had the chance to interview her this week about her achievements,
          and what it took to become such an accomplished young innovator
          incorporating various fields of computing, cybersecurity, medical
          technology, and entrepreneurship.
          <br /> <br />
          <b>Bian Lee</b>: How did you first get into exploring technology, and
          how did you develop your skills over time?
          <br /> <br />
          <b>Ellen Xu</b>: One of my earliest exposures to exploring technology
          was creating games in Scratch and tinkering with electrical
          engineering circuitry when I was in elementary school. I remember
          creating a crossy road-type game to raise awareness for the impact of
          roads on turtles and presented it at a local fair - seeing other
          children and parents play with it and enjoy something of my own
          creation was very meaningful to me, and I'm still exploring different
          facets of technology and various other fields today to try and find
          things that rekindle that same feeling within me.
          <br /> <br />
          <b>Bian</b>: I heard that you won the National Champion in the
          Cyberpatriot Competition. What do you specialize in (Windows, Linux or
          Networking), and what did it take to reach the top to win the title?
          <br /> <br />
          <i>
            If you aren’t aware of what CyberPatriot is, it is the world’s
            largest cybersecurity competition (for middle school to high school
            students) in which teams are tasked to secure operating systems
            (Windows &amp; Linux) and networks. If you wish to know more about
            what the competition is about, you can read my latest{" "}
            <a href="https://opensourcecollage.com/blog/3" target="_blank">
              blog
            </a>
            , on which I talk about my experience in the cybersecurity club.
            Having personally participated in this competition myself, I find it
            really impressive that Ellen won the first place and even more
            fascinating that I got to interview her!
          </i>
          <br /> <br />
          <b>Ellen</b>: I participated in CyberPatriot for 4 years and
          specialized in Windows and Networking! I'm really grateful to have had
          such an incredible team and had the opportunity not only to
          participate in the national finals (despite the last 2 years not being
          in person), and eventually becoming the CyberPatriot XIII National
          Champion team. To answer your question, I'd credit the hard work and
          dedication of all of the members of the team to how we were able to
          get to the top. We were always seeking to learn more, build from first
          principles, and dive deeper into rabbit holes to find new leads. One
          important thing about developing understanding is that you can't just
          know how it works theoretically or memorize security concepts, but you
          actually need to know how to reconstruct it from the ground up and get
          hands-on with your knowledge.
          <br /> <br />
          <b>Bian</b>: I think it's also really cool that you were a finalist at
          ISEF (International Science and Engineering Fair) for two years. Could
          you describe what your projects were, and your motivation behind it?
          <br /> <br />
          <b>Ellen</b>: My project was inspired by a personal experience
          affecting my younger sister, who had Kawasaki disease when she was
          younger and was initially misdiagnosed. It's a problem very close to
          my heart, as there are many children like my sister who get
          misdiagnosed each year and face the risk of developing more serious
          coronary complications with late treatment. I wanted to develop a
          differential diagnosis system to help assist doctors in the diagnosis
          of Kawasaki disease, which I continued through two years of ISEF.
          <br /> <br />
          <b>Bian</b>: Wow, I find it truly inspiring to see how you were able
          to turn personal experience to something you specialize in, and I'm
          moved by how you were able to help others through your project. I saw
          that you are also currently conducting research at the UCSD Kawasaki
          Disease Research Center -- How were you able to get the research
          position, and what work do you do?
          <br /> <br />
          <b>Ellen</b>: I'm super grateful to have the support of so many on my
          project journey! I was able to get my current research position in a
          less common way than how others may traditionally approach getting
          opportunities - I started off researching and just being
          curious/exploring the problem on my own, and later wanted to get
          medical feedback from doctors and Kawasaki disease experts. That led
          me to reaching out to the same doctors who helped treat and save my
          sister's life! They were so unbelievably gracious and helpful in not
          only providing feedback, but allowing me to work at their center to
          improve my algorithm and discuss its applications.
          <br /> <br />
          <b>Bian</b>: Besides research, you are involved with lots of different
          projects and initiatives -- What are some that you are currently
          working on?
          <br /> <br />
          <b>Ellen</b>: I am working on Zipline Theory, a non-profit
          organization re-engineering education with early exposure to
          nontraditional fields (
          <a href="https://ziplinetheory.com/" target="_blank">
            ziplinetheory.com
          </a>
          ). As someone who developed early interests in technology, I'm super
          passionate about creating fun educational opportunities for others to
          kindle interests in fields not often taught! We've been funded by the
          Department of Defense and National Center for Women in Technology in
          the past for our cybersecurity event, which included cash prizes,
          Capture the Flags, and digital forensics activities - the next event
          currently open to sign-ups is a game development event, free of cost!
          Besides that, I also have a lot of fun hosting Delta X podcast which
          gets 200+ downloads/episode, where I talk with entrepreneurs,
          professors, and the coolest teenagers on the Internet about all things
          tech, startups, and innovation (subscribe at{" "}
          <a href="https://newsletter.deltaxpod.com/" target="_blank">
            newsletter.deltaxpod.com
          </a>
          )!
          <br /> <br />
          <b>Bian</b>: Are there any other certain hobbies that you enjoy?
          <br /> <br />
          <b>Ellen</b>: Some of my hobbies include competitive saber fencing,
          creative writing, photography -- I'm in no way good at this haha but I
          enjoy it! And reading reading reading! I used to play cello and piano
          too!
          <br /> <br />
          <b>Bian</b>: You are obviously a very accomplished high school
          student, in many ways. What advice would you give to other high school
          students?
          <br /> <br />
          <b>Ellen</b>: Thank you so much! My biggest advice would be that
          society is always trying to push you on a path to convergence, and to
          try and find your own voice/interests among the noise. You're
          constantly told to try and play a game better than everyone else,
          optimize for things that others around you are optimizing for, and it
          took me a long time to start questioning what really matters to me --
          and I'm still working on doing this better. It's ok to stop things if
          you don't like it or if it doesn't bring you fulfillment. And
          similarly, it's ok to do things that you enjoy that might not matter
          as much in the eyes of others as long as it is important to you (not
          me justifying reading way too long everyday - just kidding... not
          really though... haha!). You have so many choices, so many
          possibilities for different things that you can explore and try to
          investigate. Don't fall into the trap of trying to become like
          everyone else and try to find your own interests irrespective of that,
          life is your own playing field!
          <br /> <br />
          <b>Bian</b>: I want to wrap up this interview by asking you a fun
          question -- What is your favorite song?
          <br /> <br />
          <i>
            As a music nerd who's always interested in knowing what music other
            people listen to, I couldn't resist asking this question. My goal is
            to ask this question to every person I interview -- I think it's a
            fun way to get to know someone.
          </i>
          <br /> <br />
          <b>Ellen</b>: Haha that's a great question. I don't really have a
          favorite song at the moment, but I like <i>Checkmate</i> and{" "}
          <i>Hindenburg Lover</i>.
          <br /> <br />
          It was a great talk, and I had a lot of fun interviewing Ellen about
          her accomplishments and discussing technology in general. Aside from
          what was included on this blog, I also had a chance to give her few
          book recommendations (given that she really enjoyed reading) and
          exchange favorite songs. :) What I found inspirational about her was
          her constant drive and limitless goals to pursue what she's truly
          passionate about, which is how I believe she was able to accomplish so
          many things successfully and stand apart as a unique, talented
          innovator at a young age. Like Ellen phrased it,{" "}
          <i>life is your own playing field</i> and I think it's important to
          remind ourselves what truly matters and reflect on whether we are
          making our own individual choices to live to the fullest. I have the
          best wishes for Ellen and her future endeavors, and I'm confident that
          she will continue to achieve great things. I want to thank Ellen once
          again for allowing me to conduct this interview and share her story.
        </p>
      </>
    );
  }
}

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
        <h1>
          Life Updates from 12 High School Alumni (Current College Students)!
        </h1>
        <div style={{ marginTop: "12px" }}>
          Bian Lee • October 18, 2021 •{" "}
          <i>What is life really like after high school?</i>
        </div>
        <br />
        <p>
          As a senior, I’ve become more curious about life after high school.
          It’s weird knowing that I’ll be an adult in several months, and that
          I’ll be out of high school. The past three years, I had the chance to
          get to know many then-juniors and seniors, who are now graduated and
          currently on their path to achieving their own individual goals and
          dreams. My active club involvement and various other extracurricular
          activities have opened up many opportunities to talk to new people. I
          especially like connecting with those who are a year or two older,
          since it’s interesting to hear from their experiences in school and
          life that I didn’t yet get to experience. High school made me realize
          the importance of being social and knowing more people; It really does
          provide you with greater insights to many different things, and of
          course it’s always nice to be able to call one more person your{" "}
          <i>friend</i>. I’m very grateful to have several great alumni friends,
          some of whom I talk to almost daily, and it’s been especially helpful
          lately with all the advice I got regarding college applications. This
          blog is a compilation of life updates from 12 high school alumni /
          college freshmen. If you are a current student at Northwood (or even
          if you are an alum), I’m certain you’ll enjoy this one.
          <br />
          <br />
          <b>Luke Li</b>: I’m majoring in Engineering Physics at University of
          Illinois Urbana-Champaign. My interests include coding, tennis,
          tabletop games, and video games. The classes I’m currently taking are
          physics mechanics, macroeconomics, multivariable calculus, general
          chemistry, and introduction to computer science. There are several
          things which I find different about college in comparison to high
          school -- First, there’s a lot more walking involved, but also a lot
          of new people to meet. Learning is a bit harder, as you can’t talk to
          your professor as much. What I like the best about college is that
          everything is more flexible; you can really just schedule your classes
          whenever you want, and if you really want to you could even have it so
          that you have long breaks between classes. As for goals I want to get
          an internship somewhere and maybe try to double major in CS as well.
          <br />
          <br />
          <br />
          <b>Sydney Duong</b>: I go to Cal Poly Pomona. I'm majoring in Business
          Administration with an emphasis in Computer Information Systems (CIS).
          Within my major, I've chosen to follow the information security and
          forensics subplan. Right now, I'm focusing on learning more about
          incident response and threat hunting, so the "blue" side of
          cybersecurity. I also want to explore more about scripting for
          automated tasks (programming has never been my strong suit)... and of
          course penetration testing sounds really interesting. I could go on
          and on about all the things I want to learn, haha.
          <br />
          <br />
          For me, the biggest difference between college and high school is
          having the freedom to choose what you want to study. I think the
          biggest obstacle students face transitioning from high school to
          college is choosing and committing to a major of study/field. But
          after you're able to figure that out, studying for classes becomes
          easier because you have clearer goals to work towards. This leads me
          to the things I like best about my college so far. I've asked my
          advisors literally everything about the courses I should take, how to
          look for internship/job opportunities, what goals/benchmarks I should
          set for myself, how to prepare for career fairs, etc., and they've
          been able to answer it all. Additionally, the clubs I've joined are a
          great community of people who are dedicated to helping other students
          reach their goals, including holding weekly workshops and CTFs,
          advising with resumes and LinkedIn profiles, hosting study sessions
          for certs, and providing a large network of alumni to connect with. As
          opposed to high school, in college you can surround yourself
          completely with people who share your same interests, and for me
          that's been such a cool and eye-opening experience.
          <br />
          <br />
          My overall goal is to secure a job in infosec before I graduate. Of
          course, that entails the sub-goals of getting internships around my
          sophomore and junior year, obtaining certifications, doing well in
          competitions, and actually graduating. I also want to be a club
          president in the future! Eventually, I want to give back and help
          other students through their doubts and struggles.
          <br />
          <br />
          <br />
          <b>Joy Kim</b>: I am a sociology and psychology major, currently at
          Syracuse University. My interests are mainly in psychology, but I’m
          specifically focused on how trauma relates to larger social issues, or
          more so how it is affected by the latter. Outside of academics, I’m
          currently involved in sailing, studying for my EMT exam, and am part
          of a christian club! I’m hoping to expand my horizons and join a
          formula sae club, just for fun!!
          <br />
          <br />
          <br />
          <b>Annabel Yang</b>: I attend University of Maryland - College Park,
          and I’m majoring in Computer Science. Regarding college life, I would
          say it’s a nice change of pace to actually take classes that you want
          to take, outside of general education. I don't like being this far
          away from home (others may differ) but it's otherwise perhaps a better
          experience in being independent when you don't have the option to go
          back home every weekend. The next few years I'm hoping to get an
          internship (I need one related to cybersecurity to pass my honors
          college requirements) and possibly do some research. I'm planning on
          graduating in 3 years and going into the industry but if I get a
          change of heart I may pursue graduate school. This depends on whether
          I find research opportunities interesting enough for me that will also
          take me, and what opportunities I find outside of immediate academics.
          <br />
          <br />
          <br />
          <b>Brandon Mark</b>: I'm majoring in Computer Science at San Francisco
          State University. I'm currently taking 5 classes: Fundamentals of Oral
          communication, Pre-Calculus, Computer Programming, Introduction to
          Software Lab, and of course, English. In regards to the differences
          between college and high school, it basically comes down to increased
          workload, your ability to choose your own schedule, and that teachers
          aren’t there to constantly tell you to do your work -- they could care
          less about that. What I like about college is that my spending habits
          on buying unnecessary things has gone down and living on your own
          provides a whole different environment for both learning and other
          aspects of life. For the next few years, I'm looking forward to
          learning more about computers and the code. A few goals I have include
          finding a job, getting used to living in San Francisco, buying a car
          and maybe a house as well. But, these goals can change later down the
          line.
          <br />
          <br />
          <br />
          <b>Sarah Bauer</b>: I’m currently a freshman at UC Berkeley, and I’m
          double majoring in Applied Mathematics and Astrophysics. As of now,
          I’m quite interested in political theory, geography, theoretical
          physics, and philosophy. I am also a member of Berkeley’s marching
          band, where I play bass drum. I’d say that one of the biggest
          differences between high school and college is the extent of one’s
          independence in day-to-day life. Personally, my transition to college
          life was difficult because I was not used to being responsible for my
          own food, finances, transportation, etc.
          <br />
          <br />
          My favorite thing about college is definitely the flexibility of
          academics—it’s nice to be able to choose any class from hundreds of
          options, as well as design a schedule to fit your personal needs. For
          instance, because I have marching band practice from 5-7 every day, I
          designed my schedule so that all of my classes take place in the
          morning. In the future, I’m hoping to take full advantage of
          internship opportunities in the Bay Area, study abroad in Berlin, and
          eventually attend graduate school for physics. Outside of my
          occupational and academic goals, it is a dream of mine to travel to
          (almost) every country in the world.
          <br />
          <br />
          <br />
          <b>Brian Yu</b>: I am attending University of California, Irvine. My
          major is currently undeclared in ICS (School of Information and
          Computer Sciences). Some of my interests are cybersecurity, premed,
          and anime. College is pretty free; you can choose what class you want
          to attend (which can be a good or bad) and etc. What I like the best
          about college is that there is a lot to do, so sometimes you may end
          up staying at school pretty late into the night. My goals for the next
          few years are doing well on the MCAT, finding an internship, making
          some new friends, and networking a bit.
          <br />
          <br />
          <br />
          <b>Andrea Huang</b>: I attend the University of Michigan Ann Arbor,
          and I'm majoring in Molecular, Cellular, and Developmental Biology
          (MCDB). Currently, some of my career interests are in the medical
          field, biological research field, and computer science. College is
          very different from high school- being an out-of-state student, I had
          to adapt to living on my own very quickly, learning how to plan my
          time and be proactive about my responsibilities myself. What I like
          most about college so far is the amount of opportunity available. As a
          student at a very large university, there are so many fellow students,
          knowledgeable faculty, and organizations around to collaborate with.
          While it might feel overwhelming at first, reaching out and trying new
          things is so much easier here. Though I haven't decided exactly what
          my career path will be, I currently hope to obtain some professional
          degree, either on an MD or MD/PhD track. However, no matter what, I
          hope that I will get to try lots of new things, meet lots of new
          people, and form many new friendships in the future at Michigan.
          <br />
          <br />
          <br />
          <b>Amine Adlouni</b>: I’m majoring in biochemistry at UCLA, on the
          premed track. Currently, I’m interested in exploring the intersection
          of business and health; both disciplines overlap in numerous
          industries, offering countless opportunities and paths to
          revolutionize healthcare. Furthermore, I am also interested in viral
          research, more specifically bacteriophages and their potential in
          creating a new kind of antibiotic. College and high school certainly
          have their similarities and differences; for one, living on campus is
          a completely different experience than going home after the school day
          is over. Being in a dorm means you’re constantly surrounded by fellow
          students with a wide variety of passions and experiences, culminating
          in a unique social environment that provides you with many new friends
          and connections. Furthermore, the academic aspect of college is
          starkly different: especially at a large school such as UCLA, the
          classroom sizes are massive. Each of my classes have over 200
          students, meaning that the potential for more personal, one on one
          learning is limited. As such, it becomes your own responsibility as a
          student to pursue other academic resources, such as office hours with
          your professors.
          <br />
          <br />
          There is no more hand holding on your academic journey. At the moment,
          what I love most about college is the freedom and flexibility it
          provides; being able to choose your classes also means that you have
          the ability to organize your day around times that best suit you. If
          you always struggled to wake up early in high school, you can choose
          to have afternoon classes so you can get that extra sleep.
          Furthermore, classes simply take up less time of the day in college.
          While you will probably have to study much more in college, you also
          have more free time to do so.
          <br />
          <br />
          In the next few years, I hope to maintain a high GPA (hopefully OChem
          doesn’t ruin that goal) while also getting a research position with a
          professor in the field of bacteriophage antibiotics. On a more
          personal level, I hope to maintain my physical and mental health while
          also making the most of my college years: making lifelong memories
          with friends, exploring new activities, and meeting new people.
          <br />
          <br />
          <br />
          <b>Kendrick Pham</b>: I’m currently a freshman who is attending UCI
          trying to double major in Educational Sciences and Environmental
          Engineering -- an odd combination, I know. Out of high school, I did
          not know what I wanted to do in the future, but through intensive
          research I did over the summer, I decided on those two majors. Some
          things that interest me at the time are music, nature, education and
          psychology. The main difference between high school and college is the
          responsibility and independence you have as a student. Everyone is
          taking their own paths, so your friends might never be in the same
          class. My goal in the next few years is to gain experience in both the
          engineering and education world to hopefully create my own project
          that can provide help for others.
          <br />
          <br />
          <br />
          <b>David Tran</b>: I’m a first-year majoring in Computer Science at UC
          San Diego. My academic interests at the moment are statistics, machine
          learning, and software engineering. In my free time, I enjoy watching
          anime of many genres and reading fiction and current events. I also
          started playing Genshin recently. The one major difference between
          high school and college is definitely the responsibilities you have as
          a student. Even before classes start, you have to take initiative and
          reach out to academic advising if you need help with planning your
          schedule. With the quarter system, classes are much faster paced, and
          the workload is borderline manageable even with four classes. My
          favorite part of college is being able to have a flexible schedule.
          For me, this means spreading my classes apart from 8 am to 2 pm and
          having gaps to study or take breaks around campus. Over the next few
          years, I hope to get an internship, possibly minor in math, and thrive
          in my CS courses.
          <br />
          <br />
          <br />
          <b>Austin Wang* </b>: I'm a first-year at Yale University in Berkeley
          College, one of Yale's twelve residential colleges in the system, and
          I'm thinking about double majoring in Mathematics and Physics &
          Computer Science and Economics (or maybe Statistics & Data Science).
          I'm still very interested in astronomy and astrophysics as I was in
          high school, and I'm taking a first-year-seminar called "Expanding
          Ideas in Time and Space" with a fantastic professor in a class of 15
          students. Yale has these cool small "seminar" classes of varying
          fields and focuses, and I've really enjoyed my time debating about how
          we perceive time, dabbling through Einstein's equations, Lorentz
          Transformations, tensors, and all that fun stuff! Lately, I've been
          very interested in exoplanet search, and there's a lab that I'm hoping
          to join soon! Besides academics and research, I've developed a
          newfound appreciation for the emphasis on the arts.
          <br />
          <br />
          My favorite thing about college so far are the social connections that
          I've made. Yale has an unique residential college system in which it
          matches students into one of 14 residential colleges, and I think that
          it really fosters a community of collaboration and inclusiveness. Some
          goals in mind are to obtain a well-rounded education, get my degree,
          make some new friends, run a marathon, create something cool (very
          vague), and keep pursuing my interests to the fullest extent. As for
          now, I just really want to have fun and live the four years of my life
          that I'll never get back!
          <br />
          <br />
          <i>
            *Read full interview with Austin here:{" "}
            <a href="https://opensourcecollage.com/blog/8" target="_blank">
              https://opensourcecollage.com/blog/8
            </a>
          </i>
        </p>
      </>
    );
  }
}

import { everyLimit } from "async";
import React, { Component, Suspense } from "react";
// import LazyLoad from "react-lazyload";
import subjects from "./data/subjects.json";
import Astronomy from "./data/astronomy.json";
import Biology from "./data/bio.json";
import ITF from "./data/itf.json";
import Economics from "./data/economics.json";
import Business from "./data/business.json";
import Networking from "./data/networking.json";
import osc from "./images/osc.png";
import blog from "./data/blog.json";
import category from "./data/category.json";
import organizations from "./data/organizations.json";
import LifeSciences from "./notes/LifeSciences.pdf";
import Notes from "./data/notes.json";
// import Opportunities from "./data/opportunities.json";
import OpportunitiesCategory from "./data/opportunitiesCategory.json";
import BlogsCategory from "./data/blogsCategory.json";
import Checkbox from "react-three-state-checkbox";
import "./style.css";
import Blog from "./Blog";
import { lowerCase, uniqBy } from "lodash";
import axios from "axios";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import instagram from "./data/instagram.json";

// import ReactMarkdown from "react-markdown";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const Logo = React.lazy(() => import("./lazyload/Logo"));
const QuizImage = React.lazy(() => import("./lazyload/QuizImage"));

class App extends Component {
  constructor() {
    super();
    // PostData = Astronomy;
    this.handleOrg = this.handleOrg.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOrgSearch = this.handleOrgSearch.bind(this);
    this.nextOrg = this.nextOrg.bind(this);
    this.prevOrg = this.prevOrg.bind(this);
    this.handleOppCat = this.handleOppCat.bind(this);
    this.handleBlogCat = this.handleBlogCat.bind(this);
    this.nextOpp = this.nextOpp.bind(this);
    this.prevOpp = this.prevOpp.bind(this);
    this.handleOpportunitiesSearch = this.handleOpportunitiesSearch.bind(this);
    this.handleBlogsSearch = this.handleBlogsSearch.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.gotoOrgs = this.gotoOrgs.bind(this);
    this.gotoBlog = this.gotoBlog.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleNormalView = this.handleNormalView.bind(this);
    this.handleCompactView = this.handleCompactView.bind(this);
    this.state = {
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
      accordion: "",
      selectedOrg: "",
      doubleClicked: false,
      orgSearch: "",
      startOrgIndex: 0,
      oppCat: [
        "Math & CS",
        "Sciences",
        "IT & Tech",
        "Humanities",
        "Social Sciences",
        "Art & Music",
      ],
      blogCat: ["News", "School", "Interview"],
      oppSearch: "",
      Opportunities: [],
      oppLength: 0,
      startOppIndex: 0,
      renderedPosts: [],
      renderedBlogs: blog,
      renderedSearchPosts: [],
      renderedSearchOrganizations: [],
      emptyAnswerWarning: "",
      quizSetting: "",
      selectedSettingTopic: "",
      childTopic: "Astronomy",
      startQuiz: false,
      blogSearch: "",
      moveOn: true,
      blogModeInstagram: true,
    };
  }

  //  PostData = Astronomy;
  answerLetters = ["a", "b", "c", "d", "e"];
  /* 
  subjects = [
    "Astronomy",
    "Biology",
    "Business",
    "Economics",
    "IT Fundamentals",
    "Computer Networking",
  ];
  */ z;
  handleCat(e) {
    console.log("hello world");
  }

  componentDidMount = () => {
    axios
      .get("https://server-bianlee.vercel.app/api/getPost")
      .then((response) => {
        const data = response.data;
        this.setState({
          Opportunities: data.reverse(),
          renderedPosts: data,
          oppLength: data.length,
        });
        console.log("data has been received");
        //console.log(JSON.stringify(this.state.posts))
      })
      .catch(() => {
        alert("error retreving data!!");
      });
    document.title = "Open Source Collage";
  };

  getPost = () => {
    // https://bianbackend.herokuapp.com/api/getMessage
    axios
      .get("https://server-bianlee.vercel.app/api/getPost")
      .then((response) => {
        const data = response.data;
        this.setState({
          Opportunities: data,
          renderedPosts: data,
          oppLength: data.length,
        });
        console.log("data has been received");
        //console.log(JSON.stringify(this.state.posts))
      })
      .catch(() => {
        alert("error retreving data!!");
      });
  };

  exitQuiz = () => {
    this.props.history.push("/");
    console.log("steph");
    this.setState({
      startQuiz: false,
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      isSpecificTopicChosen: false,
      topic: "",
      Data: "",
      orgSearch: "",
    });
  };

  reviewQuestions = () => {
    this.setState({
      questionNum: 0,
      isEnd: false,
      isShowingAnswer: false,
      chosenAnswer: "",
      finalChosenAnswer: "",
      answersArray: [],
      statusArray: [],
      score: 0,
      orgSearch: "",
    });
  };

  setAnswer(event) {
    if (this.state.isShowingAnswer) {
    } else {
      console.log(event.target.value);
      this.setState({
        chosenAnswer: event.target.value,
        checkStatus: true,
      });
    }
  }

  showSolution() {
    if (this.state.chosenAnswer.length == 0) {
      console.log("empty answer");
      this.setState({
        emptyAnswerWarning: "Please select an answer!",
      });
    } else {
      console.log(this.state.Data[this.state.questionNum].correct);
      this.setState({
        emptyAnswerWarning: "",
        isShowingAnswer: true,
        finalChosenAnswer: this.state.chosenAnswer,
        moveOn: true,
      });
      if (
        this.state.chosenAnswer ===
        this.state.Data[this.state.questionNum].correct
      ) {
        this.setState({
          score: this.state.score + 1,
          statusArray: [...this.state.statusArray, "✓"],
        });
      } else {
        this.setState({
          statusArray: [...this.state.statusArray, "✕"],
        });
      }
    }
  }

  gotoOrgs() {
    this.props.history.push("/organizations");
  }
  gotoBlog() {
    this.props.history.push("/blog");
  }

  chooseTopic(event) {
    console.log(event.target.value);
    console.log(this.props.history.location.pathname);
    this.setState({
      isSpecificTopicChosen: true,
      topic: event.target.value,
      Data: event.target.value,
      selectedSettingTopic: subjects,
      childTopic: event.target.value,
    });
    if (event.target.value == "Astronomy") {
      this.setState({
        Data: Astronomy,
      });
    } else if (event.target.value == "Biology") {
      this.setState({
        Data: Biology,
      });
    } else if (event.target.value == "IT Fundamentals") {
      this.setState({
        Data: ITF,
      });
    } else if (event.target.value == "Economics") {
      this.setState({
        Data: Economics,
      });
    } else if (event.target.value == "Business") {
      this.setState({
        Data: Business,
      });
    } else if (event.target.value == "Computer Networking") {
      this.setState({
        Data: Networking,
      });
    }
    this.props.history.push("/quiz/" + event.target.value.toLowerCase());
  }

  nextQuestion = () => {
    this.setState({
      isShowingAnswer: false,
      chosenAnswer: "",
      emptyAnswerWarning: "",
    });

    this.setState({
      answersArray: [...this.state.answersArray, this.state.chosenAnswer],
      chosenAnswer: "",
    });

    if (this.state.questionNum + 1 < this.state.Data.length) {
      this.setState({
        questionNum: this.state.questionNum + 1,
      });
    } else {
      this.setState({
        isEnd: true,
      });
    }
  };

  accordion(e) {
    console.log(e.target.parentNode.id);
    if (this.state.accordion !== e.target.parentNode.id) {
      this.setState({
        accordion: e.target.parentNode.id,
      });
    } else {
      if (this.state.accordion.length == 0) {
        this.setState({
          accordion: e.target.parentNode.id,
        });
      } else {
        this.setState({
          accordion: "",
        });
      }
    }
  }

  handleOrg(e) {
    console.log(e.target.parentNode.id);
    if (this.state.selectedOrg === e.target.parentNode.id) {
      console.log("same same");
      this.setState({
        selectedOrg: "",
      });
    } else {
      // console.log(e.target.parentNode.id);
      this.setState({
        selectedOrg: e.target.parentNode.id,
      });
    }
  }

  handleHover(e) {
    console.log("hovering over a blog post");
    console.log(e.target.parentNode.id);
  }

  handleClick(e) {
    console.log(e.target.parentNode.id);
    this.props.history.push("/blog/" + e.target.parentNode.id);
  }

  handleOrgSearch(e) {
    var temp = e.target.value.toLowerCase();
    this.setState(
      {
        orgSearch: temp,
        selectedOrg: "",
      },
      () => {
        this.setState({
          renderedSearchOrganizations: organizations.filter((org) => {
            return org.title
              .toLowerCase()
              .includes(this.state.orgSearch.toLowerCase());
          }),
        });
      }
    );
  }

  handleOpportunitiesSearch(e) {
    var temp = e.target.value.toLowerCase();
    if (temp.length != 0) {
      this.setState({
        oppCat: [],
      });
    } else {
      this.setState({
        oppCat: [
          "Math & CS",
          "Sciences",
          "IT & Tech",
          "Humanities",
          "Social Sciences",
          "Art & Music",
        ],
      });
    }
    this.setState(
      {
        oppSearch: temp,
      },
      () => {
        this.setState({
          renderedSearchPosts: this.state.Opportunities.filter((opp) => {
            return opp.title
              .toLowerCase()
              .includes(this.state.oppSearch.toLowerCase());
          }),
        });
      }
    );
    var counter = 0;
    this.state.Opportunities.filter((opp) => {
      if (opp.title.toLowerCase().includes(temp.toLowerCase())) {
        counter++;
      }
    });
    this.setState({
      oppLength: counter,
    });
    console.log(e.target.value);
  }

  handleBlogsSearch(e) {
    var temp = e.target.value.toLowerCase();
    if (temp.length != 0) {
      this.setState({
        blogCat: [],
      });
    } else {
      this.setState({
        blogCat: ["News", "School", "Interview"],
      });
    }
    this.setState(
      {
        blogSearch: temp,
      },
      () => {
        this.setState({
          renderedBlogs: blog.filter((opp) => {
            return opp.title
              .toLowerCase()
              .includes(this.state.blogSearch.toLowerCase());
          }),
        });
      }
    );
    /* 
    var counter = 0;
    this.state.Opportunities.filter((opp) => {
      if (opp.title.toLowerCase().includes(temp.toLowerCase())) {
        counter++;
      }
    });
    this.setState({
      oppLength: counter,
    });
    console.log(e.target.value); */
  }

  nextOrg(e) {
    this.setState({
      selectedOrg: "",
    });
    console.log("clicked");
    if (this.state.startOrgIndex + 17 >= organizations.length) {
    } else {
      this.setState({
        startOrgIndex: this.state.startOrgIndex + 17,
      });
    }
  }
  prevOrg(e) {
    this.setState({
      selectedOrg: "",
    });
    if (this.state.startOrgIndex - 17 < 0) {
    } else {
      this.setState({
        startOrgIndex: this.state.startOrgIndex - 17,
      });
    }
  }

  handleBlogCat(e) {
    var cc;
    cc = e.target.id;
    console.log(cc);
    if (this.state.blogCat.includes(cc)) {
      this.setState(
        {
          blogCat: this.state.blogCat.filter(function (a) {
            return a !== cc;
          }),
        },
        () => {
          console.log(this.state.blogCat);
          this.setState({
            renderedBlogs: blog.filter((a) => {
              return this.state.blogCat.includes(a.category);
            }),
          });
        }
      );
    } else {
      this.setState(
        {
          blogCat: [...this.state.blogCat, cc],
        },
        () => {
          console.log(this.state.blogCat);
          this.setState({
            renderedBlogs: blog.filter((a) => {
              return this.state.blogCat.includes(a.category);
            }),
          });
        }
      );
    }
  }

  handleOppCat(e) {
    var cc;
    cc = e.target.id;
    if (this.state.oppCat.includes(cc)) {
      this.setState(
        {
          oppCat: this.state.oppCat.filter(function (opp) {
            return opp !== cc;
          }),
        },
        () => {
          this.setState({
            renderedPosts: this.state.Opportunities.filter((opp) => {
              return this.state.oppCat.includes(opp.category);
            }),
          });

          var counter = 0;
          this.state.Opportunities.filter((opp) => {
            if (this.state.oppCat.includes(opp.category)) {
              counter++;
            }
          });
          this.setState({
            oppLength: counter,
          });
        }
      );
    } else {
      this.setState(
        {
          oppCat: [...this.state.oppCat, cc],
        },
        () => {
          this.setState({
            renderedPosts: this.state.Opportunities.filter((opp) => {
              return this.state.oppCat.includes(opp.category);
            }),
          });

          var counter = 0;
          var elseCounter = 0;
          this.state.Opportunities.filter((opp) => {
            if (this.state.oppCat.includes(opp.category)) {
              counter++;
            }
          });
          console.log("elsecounter");
          console.log(counter);
          this.setState({
            oppLength: counter,
          });
        }
      );
    }
    console.log(this.state.startOppIndex);
  }
  nextOpp(e) {
    if (this.state.startOppIndex + 16 >= this.state.oppLength) {
    } else {
      if (this.state.startOppIndex < 16) {
        this.setState({
          startOppIndex: this.state.startOppIndex + 16,
        });
      } else {
        this.setState({
          startOppIndex: this.state.startOppIndex + 16,
        });
      }
    }
  }
  prevOpp(e) {
    if (this.state.startOppIndex - 16 < 0) {
    } else {
      if (this.state.startOppIndex < 32) {
        this.setState({
          startOppIndex: this.state.startOppIndex - 16,
        });
      }
      this.setState({
        startOppIndex: this.state.startOppIndex - 16,
      });
    }
  }
  handleLogin(e) {
    this.props.history.push("/login");
  }

  handleNormalView(e) {
    this.setState({
      blogModeInstagram: true,
    });
  }
  handleCompactView(e) {
    this.setState({
      blogModeInstagram: false,
    });
  }

  render() {
    const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;
    if (
      !this.state.isSpecificTopicChosen &&
      this.props.history.location.pathname != "/quiz"
    ) {
      return (
        <>
          <center>
            <div className="dashboard">
              {" "}
              <br />
              {/*  <span className="orangeTitle">Source</span> */}
              <h1>Open Source Collage</h1>
              <button className="loginButton" onClick={this.handleLogin}>
                Login
              </button>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <br />
                <div className="aligned">
                  {/*
                  <Suspense
                    fallback={
                      <div className="lazyloadImgParent">
                        <div className="lazyloadImg"></div>
                      </div>
                    }
                  >
                    <Logo />
                  </Suspense> */}
                  <img src={osc} id="logo"></img>{" "}
                  <button
                    className="mobileLoginButton"
                    onClick={this.handleLogin}
                  >
                    Login
                  </button>
                  <a
                    className="onlyMobile"
                    href="https://discord.com/invite/tKfMtXBsPR"
                    target="_blank"
                  >
                    <button
                      className="mobileLoginButton"
                      style={{
                        backgroundColor: "#e67a27",
                        borderColor: "#e67a27",
                        color: "white",
                        marginTop: "-15px",
                      }}
                    >
                      Discord
                    </button>
                  </a>
                  <span
                    className="logoDescription"
                    id="landingpage"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.9rem",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    Open Source Collage is a platform designed to help high
                    school students develop passion and discover new
                    opportunities by providing access to growing database of
                    extracurricular activities & student-run organizations, with
                    a convenient search mechanism. It allows organizations to
                    register on the site and share opportunities they offer upon
                    account creation. OSC leads an effort on its own to bring
                    useful resources to students by providing academic notes &
                    quizzes on various subjects, as well as blog posts on all
                    things students can relate to, and get inspired by.{" "}
                    {/* 
                    <span className="discordText">
                      <a
                        href="https://discord.com/invite/tKfMtXBsPR"
                        target="_blank"
                        style={{
                          fontSize: "17px",
                          color: "#5865F2",
                          lineHeight: "1.9rem",
                        }}
                      >
                        Join Discord Server!
                      </a>
                    </span>
                    */}
                  </span>
                </div>
              </p>
            </div>
            <div className="dashboard">
              <center
                style={{
                  fontSize: "18px",
                  lineHeight: "1.9rem",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Free access to notes to help you cruise through the school year.{" "}
                <span
                  style={{
                    color: "#e67a27",
                    fontSize: "18px",
                    lineHeight: "1.9rem",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  Use them any way you like!
                </span>
              </center>
              <br />
              {Notes.map((sub) => {
                return (
                  <>
                    <a href={sub.url} target="_blank">
                      <button
                        key={sub.id}
                        className="noteButton"
                        id={sub.colorcode}
                        style={{
                          color: "black",
                        }}
                      >
                        {sub.title}
                      </button>
                    </a>
                  </>
                );
              })}
            </div>
            <div className="dashboard">
              <center>
                <p
                  className="questionTitleInner"
                  id="questionTitle"
                  style={{ fontSize: "18px", lineHeight: "2rem" }}
                >
                  <center
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.9rem",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    <span
                      style={{
                        color: "#5865F2",
                        fontSize: "18px",
                        lineHeight: "1.9rem",
                        fontFamily: "Source Sans Pro",
                      }}
                    >
                      Learn by solving problems.
                    </span>{" "}
                    Prepare for quizzes & tests!
                    <br />
                    <br />{" "}
                    {subjects.map((sub) => {
                      return (
                        <>
                          <button
                            value={sub.path}
                            className="quizButton"
                            id={lowerCase(sub.title) + "Button"}
                            onClick={this.chooseTopic.bind(this)}
                            style={{
                              fontFamily: "Source Sans Pro",
                            }}
                          >
                            <img
                              src={sub.img}
                              id="subjectLogo"
                              style={{ pointerEvents: "none" }}
                            ></img>
                            <span
                              style={{
                                fontSize: "18px",
                                lineHeight: "1.9rem",
                                fontFamily: "Source Sans Pro",
                              }}
                              id="subjectDescription"
                            >
                              {sub.subtitle}
                            </span>
                          </button>
                        </>
                      );
                    })}
                  </center>
                </p>
              </center>
            </div>
            <div className="dashboard">
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <center
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9rem",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  <span
                    style={{
                      color: "#e67a27",
                      fontSize: "18px",
                      lineHeight: "1.9rem",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    Browse extracurriculars opportunities
                  </span>{" "}
                  based on your interests
                </center>
                <br />
                <div className="dod-media-grid dod-stack-15">
                  {this.state.oppSearch == 0 ? (
                    <>
                      {" "}
                      {this.state.renderedPosts
                        .slice(
                          this.state.startOppIndex,
                          this.state.startOppIndex + 16
                        )
                        .map((opp) => {
                          return (
                            <>
                              <a
                                href={opp.link}
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  display:
                                    this.state.oppSearch.length != 0 &&
                                    opp.title
                                      .toLowerCase()
                                      .includes(this.state.oppSearch)
                                      ? "inline-block"
                                      : this.state.oppCat.includes(opp.category)
                                      ? "inline-block"
                                      : "none",
                                }}
                              >
                                <div
                                  style={{ wordWrap: "break-word" }}
                                  className="oppPost"
                                  id={opp.colorcode}
                                >
                                  {opp.title}
                                </div>
                              </a>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {this.state.renderedSearchPosts
                        .slice(
                          this.state.startOppIndex,
                          this.state.startOppIndex + 16
                        )
                        .map((opp) => {
                          return (
                            <>
                              <a
                                href={opp.link}
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <div className="oppPost" id={opp.colorcode}>
                                  {opp.title}
                                </div>
                              </a>
                            </>
                          );
                        })}
                    </>
                  )}
                  <Link
                    to="/login"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      display: "inline-block",
                    }}
                  >
                    <center>
                      <div
                        style={{
                          wordWrap: "break-word",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "35px",
                        }}
                        className="oppPost"
                      >
                        +
                      </div>
                    </center>
                  </Link>
                </div>
                <center style={{ marginTop: "40px" }}>
                  <span
                    onClick={this.prevOpp}
                    style={{
                      fontFamily: "Source Sans Pro",
                      marginRight: "20px",
                      cursor: "pointer",
                      display:
                        this.state.orgSearch.length == 0 ? "inline" : "none",
                    }}
                  >
                    ← Prev
                  </span>
                  <span
                    style={{
                      fontFamily: "Source Sans Pro",
                      display:
                        this.state.orgSearch.length == 0 ? "inline" : "none",
                    }}
                  >
                    {this.state.startOppIndex / 16 + 1} of{" "}
                    {Math.ceil(this.state.oppLength / 16) == 0
                      ? 1
                      : Math.ceil(this.state.oppLength / 16)}
                  </span>
                  <span
                    onClick={this.nextOpp}
                    style={{
                      fontFamily: "Source Sans Pro",
                      marginLeft: "20px",
                      cursor: "pointer",
                      display:
                        this.state.orgSearch.length == 0 ? "inline" : "none",
                    }}
                  >
                    Next →
                  </span>
                </center>
                <br />
                {OpportunitiesCategory.map((cat) => {
                  return (
                    <>
                      <div
                        style={{
                          display:
                            this.state.oppSearch.length != 0
                              ? "none"
                              : "inline-block",
                          marginBottom: "20px",
                        }}
                        onClick={this.handleOppCat}
                      >
                        <input
                          key={cat.id}
                          style={{
                            flexShrink: "0",
                            padding: "0.2rem",
                            marginLeft: "20px",
                          }}
                          type="checkbox"
                          defaultChecked="true"
                          id={cat.title}
                        />{" "}
                        <label
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "17px",
                            display: "inline-block",
                            marginTop: "5px",
                          }}
                          for={cat.title}
                        >
                          {cat.title}
                        </label>
                      </div>
                    </>
                  );
                })}
                <br />
                <input
                  type="text"
                  name="name"
                  placeholder="Search Opportunities"
                  className="dod-input"
                  style={{
                    outline: "currentcolor none medium",
                    fontFamily: "Source Sans Pro",
                  }}
                  autoComplete="off"
                  onChange={this.handleOpportunitiesSearch}
                />
              </p>
            </div>

            <div className="dashboard" style={{ marginTop: -10 }}>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <center
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9rem",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  <br />
                  Find student-run organizations, and{" "}
                  <span
                    style={{
                      color: "#5865F2",
                      fontSize: "18px",
                      lineHeight: "1.9rem",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    register yours today!
                  </span>
                  <br />
                  <br />
                  {this.state.orgSearch.length != 0 ? (
                    <>
                      {this.state.renderedSearchOrganizations
                        .slice(
                          this.state.startOrgIndex,
                          this.state.startOrgIndex + 17
                        )
                        .map((org) => {
                          return (
                            <>
                              <div
                                className="featured"
                                id={org.title}
                                value={org.title}
                                onClick={this.handleOrg}
                                style={{
                                  border:
                                    this.state.selectedOrg == org.title
                                      ? "solid 2px #e3d6c8 "
                                      : "",
                                  filter:
                                    this.state.selectedOrg != ""
                                      ? this.state.selectedOrg == org.title
                                        ? ""
                                        : "opacity(30%)"
                                      : "",
                                }}
                              >
                                <img src={org.img}></img>
                              </div>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {organizations
                        .slice(
                          this.state.startOrgIndex,
                          this.state.startOrgIndex + 17
                        )
                        .map((org) => {
                          return (
                            <>
                              <div
                                className="featured"
                                id={org.title}
                                value={org.title}
                                onClick={this.handleOrg}
                                style={{
                                  border:
                                    this.state.selectedOrg == org.title
                                      ? "solid 2px #e3d6c8 "
                                      : "",
                                  filter:
                                    this.state.selectedOrg != ""
                                      ? this.state.selectedOrg == org.title
                                        ? ""
                                        : "opacity(30%)"
                                      : "",
                                }}
                              >
                                <img src={org.img}></img>
                              </div>
                            </>
                          );
                        })}
                    </>
                  )}
                </center>
                <br />

                <>
                  {" "}
                  {organizations.map((org) => {
                    return (
                      <>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#f7f7f7",
                            paddingLeft: "45px",
                            paddingRight: "40px",
                          }}
                        >
                          <p
                            style={{
                              display:
                                this.state.selectedOrg == org.title
                                  ? "inline"
                                  : "none",

                              fontFamily: "Source Sans Pro",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              <br />
                              {org.title}
                            </span>{" "}
                            •{" "}
                            <a
                              href={org.link}
                              target="_blank"
                              style={{
                                fontFamily: "Source Sans Pro",
                                overflowWrap: "break-word",
                              }}
                            >
                              {org.link}
                            </a>
                            <br />
                            <span
                              style={{
                                fontSize: "18px",
                                lineHeight: "1.9rem",
                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              {org.description}
                            </span>
                            <br />
                            <br />
                          </p>
                        </div>
                        <br
                          style={{
                            display:
                              this.state.selectedOrg == org.title
                                ? "inline"
                                : "none",
                          }}
                        />
                      </>
                    );
                  })}
                  <>
                    {/* 
                    <center style={{ marginTop: "20px" }}>
                      <span
                        onClick={this.prevOrg}
                        style={{
                          fontFamily: "Source Sans Pro",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ← Prev
                      </span>
                      <span
                        style={{
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        {this.state.startOrgIndex / 17 + 1} of{" "}
                        {this.state.orgSearch != 0
                          ? Math.ceil(
                              this.state.renderedSearchOrganizations.length / 17
                            ) == 0
                            ? 1
                            : Math.ceil(
                                this.state.renderedSearchOrganizations.length /
                                  17
                              )
                          : Math.ceil(organizations.length / 17) == 0
                          ? 1
                          : Math.ceil(organizations.length / 17)}
                      </span>
                      <span
                        onClick={this.nextOrg}
                        style={{
                          fontFamily: "Source Sans Pro",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Next →
                      </span>
                    </center>
                    <br />
                    
                    <input
                      type="text"
                      name="name"
                      placeholder="Search Organization"
                      className="dod-input"
                      style={{
                        outline: "currentcolor none medium",
                      }}
                      autoComplete="off"
                      onChange={this.handleOrgSearch}
                    />
                    <br />*/}

                    <span
                      onClick={this.gotoOrgs}
                      style={{
                        float: "right",
                        fontFamily: "Source Sans Pro",
                        marginLeft: "20px",
                        cursor: "pointer",
                        fontSize: "18px",
                        backgroundColor: "#e7e7e7",
                        borderRadius: "12px",
                        color: "black",
                        padding: "6px 20px",
                      }}
                    >
                      See All Organizations →
                    </span>
                    <br />
                  </>
                </>
              </p>
            </div>

            <div className="dashboardBlog">
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <center
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9rem",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  <span
                    style={{
                      color: "#e67a27",
                      fontSize: "18px",
                      lineHeight: "1.9rem",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    Relatable & inspiring
                  </span>{" "}
                  stories for high school students, from high school students
                </center>
                <br />

                <div className="blog-media-grid">
                  {this.state.blogModeInstagram ? (
                    <>
                      {blog.slice(0, 3).map((post) => {
                        return (
                          <>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              id={post.id}
                              to={"/blog/" + post.id}
                            >
                              <Suspense
                                fallback={
                                  <div
                                    className="instagramPost"
                                    id={post.category + "Button"}
                                  ></div>
                                }
                              >
                                <div
                                  className="instagramPost"
                                  id={post.category + "Button"}
                                >
                                  <img src={post.img}></img>
                                </div>
                              </Suspense>
                            </Link>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {this.state.renderedBlogs.slice(0, 6).map((entry) => {
                        return (
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            id={entry.id}
                            to={"/blog/" + entry.id}
                          >
                            <div
                              className="blogPost"
                              // onClick={this.handleClick}

                              id={entry.category + "Button"}
                              onMouseOver={this.handleHover}
                            >
                              {entry.title}
                            </div>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              </p>
            </div>

            {/* 
            <div className="dashboardBlog" style={{ overflow: "auto" }}>
              <center>
                <b>Blog</b> - All things students can relate to!
              </center>
              <br />
              {this.state.renderedBlogs.map((entry) => {
                return (
                  <>
                    <span
                      className="questionTitleInner"
                      style={{ fontSize: "18px" }}
                      id={entry.id}
                    >
                      <button
                        key={entry.id}
                        id={entry.category + "Button"}
                        style={{
                          fontFamily: "Source Sans Pro",
                          display: "inline-block",
                          float: "left",
                        }}
                        className="blogButton"
                        onClick={this.handleClick}
                      >
                        {entry.title}
                      </button>
                    </span>
                  </>
                );
              })}
            </div>
            */}

            <div className="dashboard" style={{ marginTop: "-28px" }}>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                <input
                  style={{
                    flexShrink: "0",
                    padding: "0.2rem",
                    marginLeft: "20px",
                    display: "inline-block",
                  }}
                  type="radio"
                  name="subject"
                  onClick={this.handleNormalView}
                  id="normal"
                  defaultChecked={this.state.blogModeInstagram}
                />{" "}
                <label
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "17px",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                  for="normal"
                >
                  Normal
                </label>
                <input
                  style={{
                    flexShrink: "0",
                    padding: "0.2rem",
                    marginLeft: "20px",
                    display: "inline-block",
                  }}
                  type="radio"
                  name="subject"
                  onClick={this.handleCompactView}
                  id="compact"
                />{" "}
                <label
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "17px",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                  for="compact"
                >
                  Compact
                </label>
                <span
                  className="gotoBlogButton"
                  onClick={this.gotoBlog}
                  style={{
                    float: "right",
                    fontFamily: "Source Sans Pro",
                    marginLeft: "20px",
                    cursor: "pointer",
                    fontSize: "18px",
                    backgroundColor: "#e7e7e7",
                    borderRadius: "12px",
                    color: "black",
                    padding: "6px 20px",
                  }}
                >
                  See All Blog Posts →
                </span>
              </p>
            </div>
            <br />
            <br />
            {/* id="socialSection" */}
            <div className="dashboard" style={{ width: "100%" }}>
              <p
                className="questionTitleInner"
                id="questionTitle"
                style={{ fontSize: "18px", lineHeight: "2rem" }}
              >
                {" "}
                <br />
                <center>
                  <a href="https://discord.gg/tKfMtXBsPR" target="_blank">
                    <ion-icon name="logo-discord" id="social"></ion-icon>
                  </a>
                  <a
                    href="https://instagram.com/opensourcecollage"
                    target="_blank"
                  >
                    <ion-icon name="logo-instagram" id="social"></ion-icon>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/opensourcecollage"
                    target="_blank"
                  >
                    <ion-icon name="logo-linkedin" id="social"></ion-icon>
                  </a>
                  <a
                    href="https://github.com/BianLee/opensourcecollage.com"
                    target="_blank"
                  >
                    <ion-icon name="logo-github" id="social"></ion-icon>
                  </a>
                  <a
                    href="https://www.facebook.com/opensourcecollage"
                    target="_blank"
                  >
                    <ion-icon name="logo-facebook" id="social"></ion-icon>
                  </a>
                  <a href="https://twitter.com/OSCollage" target="_blank">
                    <ion-icon name="logo-twitter" id="social"></ion-icon>
                  </a>
                </center>
              </p>
            </div>
          </center>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default App;

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: {
      posts: posts,
    },
  };
}

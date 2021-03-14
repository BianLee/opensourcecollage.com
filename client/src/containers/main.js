import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "firebase";
import ReactLoading from "react-loading";
import github from "../images/github.png";
export default class HomeMainComponent extends React.Component {
    constructor() {
        super();
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: new Date(),
            titleLimit: 40,
            descriptionLimit: 500,
            titleText: "",
            dateText: "",
            zoomLink: "",
            chkbox: true,
            description: "",
            categoryCount: 0,
            category: [],
            disabled: false,
            alert: false,
            posts: [],
            showMessage: false,
            message: "Apply filter",

            selectedDate: "",
            selectedDescription: "",
            selectedTitle: "",
            selectedCategory: "",
            selectedZoom: "",

            permDate: "",
            permDescription: "",
            permTitle: "",
            permCategory: "",
            permID: "",
            permZoom: "",

            amountOfPages: 0,
            currentAmount: 16,
            currentPlace: 1,
        };
    }

    _showMessage = (bool, e) => {
        this.setState({
            showMessage: bool,
        });
        if (bool) {
            this.setState({
                message: "Collapse filter",
            });
        } else {
            this.setState({
                message: "Apply filter",
            });
        }
    };

    scrollPrev = (e) => {
        console.log("Hello");
        if (this.state.currentPlace > 1) {
            this.setState({
                currentAmount: this.state.currentAmount - 16,
                currentPlace: this.state.currentPlace - 1,
            });
        }
    };

    scrollNext = (e) => {
        if (this.state.currentPlace < this.state.amountOfPages) {
            this.setState({
                currentAmount: this.state.currentAmount + 16,
                currentPlace: this.state.currentPlace + 1,
            });
        }
    };

    componentDidMount = () => {
        this.getPost();
    };

    getPost = () => {
        // https://bianbackend.herokuapp.com/api/getMessage
        axios
            .get("https://server-r8ug5ernl-bianlee.vercel.app/api/getMessage")
            .then((response) => {
                const data = response.data.reverse();
                this.setState({ posts: data });
                console.log("data has been received");
                const n = Math.ceil(this.state.posts.length / 16);
                this.setState({
                    amountOfPages: n,
                });
                //console.log(JSON.stringify(this.state.posts))
            })
            .catch(() => {
                alert("error retreving data!!");
            });
    };

    handleSelectItem = (e) => {
        //console.log(e.target.dataset.description)
        //console.log(e.target.dataset.title)
        console.log(e.target.dataset.date);
        console.log(e.target.dataset.zoom);

        this.setState({
            selectedDescription: e.target.dataset.description,
            selectedTitle: e.target.dataset.title,
            selectedCategory: e.target.dataset.category,
            selectedDate: e.target.dataset.date,
            selectedZoom: e.target.dataset.zoom,
        });
    };

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    handlePerm = (e) => {
        if (
            this.state.permTitle != "" &&
            e.target.dataset.id == this.state.permID
        ) {
            this.setState({
                permDescription: "",
                permTitle: "",
                permID: "",
                permDate: "",
                permCategory: "",
                permZoom: "",
            });
        } else {
            // console.log(e.target.dataset.zoomLink)
            this.setState({
                permDescription: e.target.dataset.description,
                permTitle: e.target.dataset.title,
                permID: e.target.dataset.id,
                permDate: e.target.dataset.date,
                permCategory: e.target.dataset.category,
                permZoom: e.target.dataset.zoom,
            });
        }
    };

    handleTitleLimit = (e) => {
        this.setState({
            titleLimit: 40 - e.target.value.length,
            titleText: e.target.value,
        });
    };
    handleDescriptionLimit = (e) => {
        this.setState({
            descriptionLimit: 500 - e.target.value.length,
            description: e.target.value,
        });
    };

    handleStartTime = (e) => {
        this.setState({ startTime: e.target.value });
    };
    handleEndTime = (e) => {
        this.setState({ endTime: e.target.value });
    };

    handleZoomLink = (e) => {
        this.setState({ zoomLink: e.target.value });
    };

    handleEst = (e) => {
        if (e.target.value == "on") {
            this.setState({ chkbox: false, timeZone: "EST" });
        } else {
            this.setState({ chkbox: true, timeZone: "EST" });
        }
    };
    handlePst = (e) => {
        if (e.target.value == "on") {
            this.setState({ chkbox: true, timeZone: "PST" });
        } else {
            this.setState({ chkbox: false, timeZone: "PST" });
        }
    };
    handleDiscardItem = (e) => {
        this.setState({
            selectedDescription: "",
            selectedTitle: "",
            selectedCategory: "",
            selectedDate: "",
            selectedZoom: "",
        });
    };
    handleCategoryCount = (e) => {
        // console.log(this.state.category);
        if (this.state.categoryCount == 2) {
            this.setState({ alert: false });
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 1) {
                e.preventDefault();
                this.setState({ alert: true });
            } else {
                this.setState({ categoryCount: this.state.categoryCount + 1 });
                this.setState(
                    {
                        category: [
                            ...this.state.category,
                            e.target.dataset.name,
                        ],
                    },
                    function () {
                        // console.log(this.state.category);
                    }
                );
            }
        } else {
            this.setState({ categoryCount: this.state.categoryCount - 1 });
            this.setState(
                {
                    category: this.state.category.filter(
                        (item) => item !== e.target.dataset.name
                    ),
                },
                function () {
                    // console.log(this.state.category);
                }
            );
        }

        {
            /*
        console.log(this.state.category); 
        if (this.state.categoryCount == 3) {
           this.setState({alert: false}) 
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 2) {
                e.preventDefault(); 
                this.setState({alert: true}) 
            }
            else {
                this.setState({categoryCount: this.state.categoryCount + 1})
                this.setState({ category: [...this.state.category, e.target.id] }, function () {
                    console.log(this.state.category);
                });
            }
        }
        else {
            this.setState({categoryCount: this.state.categoryCount - 1})
            this.setState({category: this.state.category.filter(item => item !== e.target.id)}, function() {
                console.log(this.state.category); 
            })

        }
        */
        }
    };

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state.category)
        const message = {
            title: this.state.titleText,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            timeZone: this.state.timeZone,
            zoomLink: this.state.zoomLink,
            description: this.state.description,
            category: this.state.category,
        };
        // console.log(message);
        //  const path = '/api/postMessage';
        // https://bianbackend.herokuapp.com/api/postMessage
        axios
            .post(
                "https://server-r8ug5ernl-bianlee.vercel.app/api/postMessage",
                message
            )
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.log("Error!");
            });

        this.getPost();
        console.log("page update?");
    }
    render() {
        return (
            <>
                <div>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>Bian</title>
                    <link rel="alternate icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="styles.css" />
                    <section className="dod-layout-default">
                        <header
                            data-grid-area="header"
                            className="dod-space-between-responsive"
                        >
                            <div>
                                <h1
                                    className="dod-heading-1 dod-stack-4 logo"
                                    style={{ justifyContent: "trie" }}
                                >
                                    <Link to="/">osc+</Link>
                                </h1>
                                <p className="dod-heading-3 dod-stack-16 logoDesc">
                                    open source collage: assemblage of
                                    opportunities and resources for high school
                                    students
                                </p>
                            </div>
                            <p></p>
                            <Link to="/about" style={{ marginLeft: "18px" }}>
                                About
                            </Link>
                            <Link to="/blog" style={{ marginLeft: "10px" }}>
                                Blog
                            </Link>
                            <a
                                href="https://discord.gg/zPyjsCJ5Sn"
                                target="_blank"
                                style={{ marginLeft: "10px" }}
                            >
                                Discord
                            </a>
                            <Link to="/frq" style={{ marginLeft: "10px" }}>
                                FRQ
                            </Link>
                            <Link
                                to="/post"
                                className="dod-button"
                                style={{ marginLeft: "10px" }}
                            >
                                Post
                            </Link>
                        </header>
                        {/* 
                {this.state.posts.slice(0).reverse().map(post => {
                   return post.category.includes("science") ?
                        <p key={post.id}>science</p>
                    :
                    <p>Hello</p>
                })}
                */}
                        {this.state.posts != "" ? (
                            <main data-grid-area="main">
                                {/* <h2 className="dod-heading-2 dod-stack-24">Upcoming events!</h2> */}

                                <>
                                    <div className="dod-media-grid dod-stack-15">
                                        {this.state.posts
                                            .slice(
                                                this.state.currentAmount - 16,
                                                this.state.currentAmount
                                            )
                                            .map((post) => {
                                                return (
                                                    <>
                                                        <div
                                                            href="/dogs/frieda/"
                                                            style={{
                                                                borderStyle:
                                                                    this.state
                                                                        .permID ==
                                                                    post._id
                                                                        ? "dotted"
                                                                        : "",
                                                                borderWidth:
                                                                    this.state
                                                                        .permID ==
                                                                    post._id
                                                                        ? "2.5px"
                                                                        : "",
                                                                borderColor:
                                                                    this.state
                                                                        .permID ==
                                                                    post._id
                                                                        ? "black"
                                                                        : "",
                                                            }}
                                                            key={post._id}
                                                            data-category={
                                                                post.category
                                                            }
                                                            data-date={
                                                                post.date
                                                            }
                                                            data-id={post._id}
                                                            data-description={
                                                                post.description
                                                            }
                                                            data-title={
                                                                post.title
                                                            }
                                                            data-zoom={
                                                                post.zoomLink
                                                            }
                                                            className="dod-card"
                                                            id={`${post.category}`}
                                                            onMouseLeave={
                                                                this
                                                                    .handleDiscardItem
                                                            }
                                                            onMouseEnter={
                                                                this
                                                                    .handleSelectItem
                                                            }
                                                            onClick={
                                                                this.handlePerm
                                                            }
                                                        >
                                                            <p
                                                                className="dod-heading-3 dod-stack-16"
                                                                data-zoom={
                                                                    post.zoomLink
                                                                }
                                                                data-description={
                                                                    post.description
                                                                }
                                                                data-date={
                                                                    post.date
                                                                }
                                                                data-id={
                                                                    post._id
                                                                }
                                                                data-title={
                                                                    post.title
                                                                }
                                                                data-category={
                                                                    post.category
                                                                }
                                                            >
                                                                {post.title}
                                                            </p>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </>

                                {/* Pagination here*/}

                                <br />
                                <a
                                    style={{
                                        cursor: "pointer",
                                        color: "purple",
                                    }}
                                    onClick={this.scrollPrev}
                                >
                                    <b>← Prev</b>
                                </a>
                                <a
                                    style={{
                                        marginLeft: "20px",
                                        cursor: "pointer",
                                        color: "purple",
                                    }}
                                    onClick={this.scrollNext}
                                >
                                    <b>Next →</b>
                                </a>
                                <p
                                    style={{
                                        marginLeft: "20px",
                                        display: "inline",
                                    }}
                                >
                                
                                </p>
                                <a style={{cursor: "pointer", display: "inline"}} onClick={this._showMessage.bind(null, ! this.state.showMessage)}>{this.state.message}</a>
                                {this.state.showMessage ? (
                                    <>
                                        <br></br><br></br>
                                        <input id ="mathButton" type="checkbox"/>
                                        <label htmlFor="mathButton">
                                                Math
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="physicsButton" type="checkbox"/>
                                        <label htmlFor="physicssButton">
                                                Physics
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="chemistryButton" type="checkbox"/>
                                        <label htmlFor="chemistryButton">
                                                Chemistry
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="biologyButton" type="checkbox"/>
                                        <label htmlFor="biologyButton">
                                                Biology
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="csButton" type="checkbox"/>
                                        <label htmlFor="csButton">
                                                CS
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="engineeringButton" type="checkbox"/>
                                        <label htmlFor="engineeringButton">
                                                Engineering
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="humanitiesButton" type="checkbox"/>
                                        <label htmlFor="humanitiesButton">
                                                Humanities
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input  id="musicButton" type="checkbox"/>
                                        <label htmlFor="musicButton">
                                                Music
                                        </label>
                                        {"\u00A0"}
                                        {"\u00A0"}
                                        <input id="otherButton" type="checkbox"/>
                                        <label htmlFor="otherButton">
                                                Other
                                        </label>
                                    </> 
                                ) : (
                                    <>
                                        <p></p>
                                    </>
                                )}
                            </main>
                        ) : (
                            <>
                                <main data-grid-area="main">
                                    <div className="dod-media-grid dod-stack-15">
                                        <ReactLoading
                                            type={"spin"}
                                            color={"gray"}
                                            height={70}
                                            width={70}
                                        />
                                    </div>
                                </main>
                            </>
                        )}

                        {this.state.permTitle != "" &&
                        this.state.permCategory != "" ? (
                            <>
                                <main
                                    className="eventdesc"
                                    data-grid-area="main"
                                >
                                    <b>
                                        <p
                                            style={{
                                                fontSize: "1.5rem",
                                                fontWeight: "lighter",
                                                lineHeight: "30px",
                                                fontFamiliy: "Giga Sans Light",
                                            }}
                                        >
                                            {this.state.permTitle}
                                            {"\u00A0"}
                                            <span
                                                id={this.state.permCategory}
                                                style={{ fontSize: "20px" }}
                                            >
                                                {"\u00A0"}
                                                {this.state.permCategory}
                                                {"\u00A0"}
                                            </span>
                                        </p>
                                    </b>

                                    <br></br>
                                    <a
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "lighter",
                                            lineHeight: "25px",
                                            marginBottom: "10px",
                                            fontFamiliy: "Giga Sans Light",
                                        }}
                                        href={this.state.permZoom}
                                        target="_blank"
                                        style={{ color: "purple" }}
                                    >
                                        {this.state.permZoom}
                                    </a>
                                    <p
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "lighter",
                                            lineHeight: "25px",
                                            marginBottom: "10px",
                                            fontFamiliy: "Giga Sans Light",
                                        }}
                                    >
                                        {this.state.permDate}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "lighter",
                                            lineHeight: "25px",
                                            marginBottom: "10px",
                                            fontFamiliy: "Giga Sans Light",
                                        }}
                                    >
                                        {this.state.permDescription}
                                    </p>
                                </main>
                            </>
                        ) : (
                            <main className="eventdesc" data-grid-area="main">
                                <p
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "lighter",
                                        lineHeight: "30px",
                                        marginBottom: "10px",
                                        fontFamiliy: "Giga Sans Light",
                                    }}
                                >
                                    What is <i>Open Source Collage</i> and how
                                    do I use this platform?
                                </p>
                                <p
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "lighter",
                                        lineHeight: "25px",
                                        marginBottom: "10px",
                                        fontFamiliy: "Giga Sans Light",
                                    }}
                                >
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa
                                    quae ab illo inventore veritatis et quasi
                                    architecto beatae vitae dicta sunt
                                    explicabo. Nemo enim ipsam veritatis o
                                    inventore. Et harum quidem rerum facilis est
                                    et expedita distinctio. Nam libero tempore
                                    soluta nobis est eligendi optio cumque nihil
                                    impedit quo minus id quod m<br></br>
                                    <br></br>quae ab illo inventore veritatis et
                                    quasi architecto beatae vitae dicta sunt
                                    explicabo. Nemo enim ipsam voluptatem qu et
                                    quasi architecto beatae vitae. quae ab illo
                                    inventore veritatis et quasi ar. beatae
                                    vitae dicta sunt explicabo. Nemo enim ipsam.
                                </p>
                            </main>
                        )}
                        {/* 
               <>
                  <b><p style={{fontSize: "2rem", fontWeight: "lighter",  lineHeight: "40px"}}>{this.state.selectedTitle}{'\u00A0'}
                  <span id={this.state.selectedCategory} style={{fontSize: "20px"}}>{'\u00A0'}{this.state.selectedCategory}{'\u00A0'}</span>
                  </p></b>
                  
                  <br></br><a href={this.state.permZoom} target="_blank" style={{color: "purple"}}>{this.state.selectedZoom}</a>
                  <br></br><p>{this.state.selectedDate}</p>
            <br></br><p>{this.state.selectedDescription}</p>
               </> */}
                        {/* 
                {this.state.posts.map(post => {
                    return post.id == this.state.selectedID ?
                        <p key={post.id}>{post.description}</p>
                        :
                        <p></p>
                })}   
                */}

                        <main
                            className="featuredOrg"
                            data-grid-area="main"
                            style={{ marginTop: "18px" }}
                        >
                            <br></br>
                            <div className="sponsor">
                                <img src={github}></img>
                            </div>
                            <p
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "lighter",
                                    lineHeight: "30px",
                                    marginBottom: "10px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                GitHub - Featured Organization of The Month
                            </p>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "10px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                GitHub, Inc. is a provider of Internet hosting
                                for software development and version control
                                using Git. It offers the distributed version
                                control and source code management (SCM)
                                functionality of Git, plus its own features. It
                                provides access control and several
                                collaboration features such as bug tracking,
                                feature requests, task management, continuous
                                integration and wikis for every project.[3]
                                Headquartered in California, it has been a
                                subsidiary of Microsoft since 2018
                                <br></br>
                                <br></br>
                                The GitHub service was developed by Chris
                                Wanstrath, P. J. Hyett, Tom Preston-Werner and
                                Scott Chacon using Ruby on Rails, and started in
                                February 2008. The company, GitHub, Inc., has
                                existed since 2007 and is located in San
                                Francisco.[14]
                            </p>
                        </main>
                        <footer data-grid-area="footer"></footer>
                    </section>
                </div>
            </>
        );
    }
}

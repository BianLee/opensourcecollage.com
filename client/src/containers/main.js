import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "firebase";
import ReactLoading from "react-loading";
import github from "../images/github.png";
import logo from "../images/logo.png";
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

            permDate: "",
            permDescription: "",
            permTitle: "",
            permCategory: "",
            permID: "",
            permZoom: "",

            amountOfPages: 0,
            // amount of posts per page
            currentAmount: 16,
            // current page number (1 = first page)
            currentPlace: 1,
        };
    }

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

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    /**
     * Modify the perm* variables to make the selected event either show a black dotted border
     * or to clear the border if it had been previously selected
     * @param e The event that happened
     */
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

    onUnselected = () => {
        this.setState({
            permDescription: "",
            permTitle: "",
            permID: "",
            permDate: "",
            permCategory: "",
            permZoom: "",
        });
    };
    onSelected = (id, title, category, date, link, description) => {
        // console.log(e.target.dataset.zoomLink)
        this.setState({
            permDescription: description,
            permTitle: title,
            permDate: date,
            permId: id,
            permCategory: category,
            permZoom: link,
        });
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
                        <NavBar />
                        {/* 
                {this.state.posts.slice(0).reverse().map(post => {
                   return post.category.includes("science") ?
                        <p key={post.id}>science</p>
                    :
                    <p>Hello</p>
                })}
                */}

                        <PostDisplay
                            posts={this.state.posts}
                            onSelected={this.onSelected}
                            onUnselected={this.onUnselected}
                        />
                        {this.state.permTitle != "" &&
                        this.state.permCategory != "" ? (
                            <PostExtraInfo
                                title={this.state.permTitle}
                                category={this.state.permCategory}
                                link={this.state.permZoom}
                                date={this.state.permDate}
                                description={this.state.permDescription}
                            />
                        ) : (
                            <AboutUsBox />
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
                        <FeaturedOrg />
                        <footer data-grid-area="footer"></footer>
                    </section>
                </div>
            </>
        );
    }
}
/**
 * The navigation bar and logo at the top of the page
 */
function NavBar(props) {
    return (
        <>
            <header
                data-grid-area="header"
                className="dod-space-between-responsive"
            >
                <div>
                    <h1
                        className="dod-heading-1 dod-stack-4 logo"
                        style={{ justifyContent: "trie" }}
                    >
                        <Link to="/">
                            <div className="sponsor">
                                <img id="logo" src={logo}></img>
                            </div>
                        </Link>
                        <p className="dod-heading-3 dod-stack-16 logoDesc">
                            <br />
                            <br />
                            Open Source Collage - gain free access to high
                            school student resources
                        </p>
                    </h1>
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
        </>
    );
}

/**
 * The extra info about a specific post at the bottom of the page
 * @param {{
 *  title: string,
 *  category: string,
 *  link: string,
 *  date: string,
 *  description: string
 * }} props the info about the post, including the title of the event, the category that
 * the event is in, the link to the event, the date of the event, and the description of the
 * event
 */
function PostExtraInfo(props) {
    return (
        <>
            <main className="eventdesc" data-grid-area="main">
                <b>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "lighter",
                            lineHeight: "30px",
                            fontFamiliy: "Giga Sans Light",
                        }}
                    >
                        {props.title}
                        {"\u00A0"}
                        <span id={props.category} style={{ fontSize: "20px" }}>
                            {"\u00A0"}
                            {props.category}
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
                    href={props.link}
                    target="_blank"
                    style={{ color: "purple" }}
                >
                    {props.link}
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
                    {props.date}
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
                    {props.description}
                </p>
            </main>
        </>
    );
}

/**
 * The box at the bottom of the page with information about the organization
 * that shows up when no event is selected
 */
function AboutUsBox(props) {
    return (
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
                What is <i>Open Source Collage</i> and how do I use this
                platform?
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam veritatis o
                inventore. Et harum quidem rerum facilis est et expedita
                distinctio. Nam libero tempore soluta nobis est eligendi optio
                cumque nihil impedit quo minus id quod m<br></br>
                <br></br>quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem qu
                et quasi architecto beatae vitae. quae ab illo inventore
                veritatis et quasi ar. beatae vitae dicta sunt explicabo. Nemo
                enim ipsam.
            </p>
        </main>
    );
}

/**
 * The Featured Organization box at the bottom of the page
 */
function FeaturedOrg(props) {
    return (
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
                GitHub, Inc. is a provider of Internet hosting for software
                development and version control using Git. It offers the
                distributed version control and source code management (SCM)
                functionality of Git, plus its own features. It provides access
                control and several collaboration features such as bug tracking,
                feature requests, task management, continuous integration and
                wikis for every project.[3] Headquartered in California, it has
                been a subsidiary of Microsoft since 2018
                <br></br>
                <br></br>
                The GitHub service was developed by Chris Wanstrath, P. J.
                Hyett, Tom Preston-Werner and Scott Chacon using Ruby on Rails,
                and started in February 2008. The company, GitHub, Inc., has
                existed since 2007 and is located in San Francisco.[14]
            </p>
        </main>
    );
}

/**
 * The grid of posts at the top of the page, including the Prev and Next buttons, but not the filtering
 * props passed in are:
 *  posts: the list of posts to display
 *  selectedId: id of the selected post
 *  onClick: a function called whenever a post is clicked
 */
class PostGrid extends React.Component {
    constructor() {
        super();
        console.log("constructor", this.props);
        this.state = {
            currentAmount: 16,
            // current page number (1 = first page)
            currentPlace: 1,
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.posts.length !== prevProps.posts.length) {
            // number of posts changed, probably because one of the filters changed, so we should
            // move back to the first page

            this.setState({
                currentAmount: 16,
                currentPlace: 1,
            });
        }
    }

    scrollPrev = (e) => {
        if (this.state.currentPlace > 1) {
            this.setState({
                currentAmount: this.state.currentAmount - 16,
                currentPlace: this.state.currentPlace - 1,
            });
        }
    };

    scrollNext = (e) => {
        const amountOfPages = Math.ceil(this.props.posts.length / 16);
        if (this.state.currentPlace < amountOfPages) {
            this.setState({
                currentAmount: this.state.currentAmount + 16,
                currentPlace: this.state.currentPlace + 1,
            });
        }
    };
    // TODO: fix unique key property console error
    render() {
        const { posts, selectedId, onClick } = this.props;
        console.log(this.state, this.props);
        return (
            <>
                <div className="dod-media-grid dod-stack-15">
                    {posts
                        .slice(
                            this.state.currentAmount - 16,
                            this.state.currentAmount
                        )
                        .map((post) => (
                            <Post
                                post={post}
                                selected={selectedId == post._id}
                                onClick={onClick}
                            />
                        ))}
                </div>
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
            </>
        );
    }
}

/**
 * The display for all the posts, including the grid of posts, the Next and Prev buttons, and
 * the filtering logic
 *
 * takes the functions `onUnselected` and `onPostSelected` in props
 * `onUnselected()` is called when the user unselects any event, leaving no events selected
 * `onSelected(id, title, category, date, link, description)` is called when the user selects on
 * a new post
 */
class PostDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            showMessage: false,
            message: "Apply filter",

            permId: "",

            // categories selected in the filtering
            categories: [],
            // if any filter checkboxes are currently selected
            filteringEnabled: false,
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

    unselectPost() {
        this.props.onUnselected();
        this.setState({
            permID: "",
        });
    }

    /**
     * Modify the perm* variables to make the selected event either show a black dotted border
     * or to clear the border if it had been previously selected
     * @param e The event that happened
     */
    handlePerm = (e) => {
        if (
            this.state.permTitle != "" &&
            e.target.dataset.id == this.state.permID
        ) {
            this.unselectPost();
        } else {
            const postInfo = e.target.dataset;
            this.props.onSelected(
                postInfo.id,
                postInfo.title,
                postInfo.category,
                postInfo.date,
                postInfo.zoom,
                postInfo.description
            );
            this.setState({ permID: postInfo.id });
        }
    };

    filterChanged = (e) => {
        // don't keep posts selected after filters change because then a post might
        // be selected that isn't being shown
        this.unselectPost();

        // go back to the first page - if we don't do this, people might see just a blank
        // screen after changing the filters if they weren't originally on the first page
        this.setState({
            currentAmount: 16,
            currentPlace: 1,
        });

        const id = e.target.id;
        const category = id.replace("Button", "");
        if (document.getElementById(id).checked) {
            // someone checks a new category
            this.setState({
                categories: this.state.categories.concat([category]),
                filteringEnabled: true,
            });
        } else {
            if (this.state.categories.length === 1) {
                // categories is about to become empty
                this.setState({
                    filteringEnabled: false,
                });
            }
            this.setState({
                categories: this.state.categories.filter(
                    (item) => item !== category
                ),
            });
        }
    };

    /**
     * Whether to show the given post
     */
    shouldInclude = (post) => {
        if (!this.state.filteringEnabled) {
            // if filtering is not enabled, include everything
            return true;
        }
        return this.state.categories.some((category) =>
            post.category.includes(category)
        );
    };

    render() {
        return this.props.posts != "" ? (
            <main data-grid-area="main">
                {/* <h2 className="dod-heading-2 dod-stack-24">Upcoming events!</h2> */}

                <PostGrid
                    posts={this.props.posts.filter(this.shouldInclude)}
                    selectedId={this.state.permID}
                    onClick={this.handlePerm}
                />

                <p
                    style={{
                        marginLeft: "20px",
                        display: "inline",
                    }}
                ></p>
                <a
                    style={{
                        cursor: "pointer",
                        display: "inline",
                    }}
                    onClick={this._showMessage.bind(
                        null,
                        !this.state.showMessage
                    )}
                >
                    {this.state.message}
                </a>
                <>
                    <div
                        style={{
                            display: this.state.showMessage ? "inline" : "none",
                        }}
                    >
                        <br></br>
                        <br></br>
                        <FilterBoxes onChange={this.filterChanged} />
                    </div>
                </>
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
        );
    }
}

/**
 * The list of checkboxes that control what is being filtered
 */
class FilterBoxes extends React.Component {
    render() {
        return (
            <>
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="mathButton"
                    text="Math"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="physicsButton"
                    text="Physics"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="chemistryButton"
                    text="Chemistry"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="biologyButton"
                    text="Biology"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="csButton"
                    text="CS"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="engineeringButton"
                    text="Engineering"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="humanitiesButton"
                    text="Humanities"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="musicButton"
                    text="Music"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="otherButton"
                    text="Other"
                />
            </>
        );
    }
}

/**
 * Display a checkbox with text next to it, which is used in the filter UI
 * @param {{
 *  id: string,
 *  text: string
 *  onChange: any
 * }} props `id` is the id of the checkbox, `text` is the text displayed for the checkbox,
 * and `onChange` is called whenever the checkbox's state changes
 */
function FilterCheckbox(props) {
    return (
        <>
            <input id={props.id} type="checkbox" onChange={props.onChange} />
            <label htmlFor={props.id}>{props.text}</label>
            {"\u00A0"}
            {"\u00A0"}
        </>
    );
}

/**
 * A box representing a post in the grid at the top of the page
 * @param props The properties passed to the element, which are:
 *  post: the information about the post
 *  selected: whether the post has been selected by the user
 * onClick: a function called when a post is clicked
 */
function Post({ post, selected, onClick }) {
    let style = {};
    if (selected) {
        style = {
            borderStyle: "dotted",
            borderWidth: "2.5px",
            borderColor: "black",
        };
    }
    return (
        <>
            <div
                href="/dogs/frieda/"
                style={style}
                key={post._id}
                data-category={post.category}
                data-date={post.date}
                data-id={post._id}
                data-description={post.description}
                data-title={post.title}
                data-zoom={post.zoomLink}
                className="dod-card"
                id={`${post.category}`}
                onClick={onClick}
            >
                <p
                    className="dod-heading-3 dod-stack-16"
                    data-zoom={post.zoomLink}
                    data-description={post.description}
                    data-date={post.date}
                    data-id={post._id}
                    data-title={post.title}
                    data-category={post.category}
                >
                    {post.title}
                </p>
            </div>
        </>
    );
}

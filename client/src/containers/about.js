import React from "react";
import "../styles/styles.css";
import BianLee from "../images/bianlee.jpeg";
import AnthonyFoo from "../images/anthonyfoo.png";
import NoPic from "../images/no.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../images/logo.png";
export default class AboutComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
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
                                    <Link to="/">
                                        <div className="sponsor">
                                            <img id="logo" src={logo}></img>
                                        </div>
                                    </Link>
                                    <p className="dod-heading-3 dod-stack-16 logoDesc">
                                        <br />
                                        <br />
                                        Open Source Collage - gain free access
                                        to high school student resources
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
                        <main data-grid-area="main">
                            <div className="bio">
                                <img src={BianLee}></img>
                            </div>
                            <h1 className="bio-heading">
                                Bian Lee - Chief Executive Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Bian is a Junior at Northwood High school. He is
                                passionate about computer engineering and
                                information technology. He believes in the
                                importance of general education, and developed
                                this platform for high school students to more
                                easily access resources and opportunities in
                                various fields of study. He aims to help
                                students find their passion and connect them
                                with numerous non-profits and other student
                                organizations. He enjoys listening to music,
                                watching musicals, and holds strong political
                                beliefs. <br />
                                <br />
                            </p>

                            <div className="bio">
                                <img src={NoPic}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Ian Lee - Chief Operating Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Ian is a Junior at Northwood High school who
                                aspires to be a logical and an independent
                                thinker. He engages in various activities such
                                as playing cello and participating in MUN
                                conferences, and hopes to make it easier for
                                students to explore and further their passions
                                through this platform. In his free time, Ian
                                enjoys reading well-written books, as well as
                                watching all types of Youtube videos. <br />
                                <br /> <br />
                            </p>

                            <div className="bio">
                                <img src={NoPic}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Pranav Rajpal - Chief Technology Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Pranav is a Senior at Northwood High school.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.{" "}
                                <br />
                                <br />
                            </p>

                            <div className="bio">
                                <img src={NoPic}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Rutvij Holay - Chief Business Development
                                Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Rutvij is a sophomore at Northwood High school.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.{" "}
                                <br />
                                <br />
                            </p>

                            <div className="bio">
                                <img src={AnthonyFoo}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Anthony Foo - Chief Marketing Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Anthony is a sophomore at Northwood High school.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.{" "}
                                <br />
                                <br />
                            </p>
                        </main>

                        <footer data-grid-area="footer"></footer>
                    </section>
                </div>
            </>
        );
    }
}

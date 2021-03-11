import React, { useEffect, useState } from "react";
import firebase from "firebase";
import firebaseApp from "../firebaseApp";

export function Hero(props) {
    const { handleLogout } = props;
    const [username, setUsername] = useState("");
    const [welcome, setWelcome] = useState("");
    const [uid, setUid] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            firebase
                .database()
                .ref("users/" + user.uid)
                .on("value", (snapshot) => {
                    setUsername(snapshot.val().username);
                    setUid(user.uid);
                    setEmail(user.email);
                    setWelcome("Welcome, ");
                });
        });
    }, []);

    return (
        <>
            <div>
                <p>{welcome}</p>
                <h1>{username}</h1>
                <br></br>
                <p>{email}</p>
                <p>{uid}</p>
                <br></br>
                <button className="showMe" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    );
}

/* 

export class Hero extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUser: this.props.currentUser,
            handleLogout: this.props.handleLogout
        }
    }

    render() {
        return (
            <section className="hero">
                <nav>
                    <h2>   
                        <p>Welcome, ~!</p>
                        <button className="showMe" onClick={this.state.handleLogout}>Logout</button>
                    </h2>
                </nav>
            </section>
        )
    }
}
*/

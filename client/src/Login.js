import React, { useEffect, useState } from "react";
import firebaseApp from "./firebaseapp";
import firebase from "firebase";
import { useHistory } from "react-router";
import Post from "./Post";

export default function Login() {
  var currentUser = "";

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const history = useHistory();
  const goHome = (e) => {
    console.log("hello");
    history.push({
      pathname: "/",
    });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
  };

  const handleLogin = () => {
    clearErrors();
    // clearInputs();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError("Email not found");
            break;
          case "auth/wrong-password":
            setPasswordError("Wrong password");
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    // clearInputs();
    console.log(username);
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (data) {
        console.log("uid", data.user.uid);
        firebase
          .database()
          .ref("users/" + data.user.uid)
          .set({
            id: data.user.uid,
            username: username,
            email: email,
          });
      })
      .catch((err) => {
        console.log("error occured");
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError("Invalid email");
            break;
          case "auth/weak-password":
            setPasswordError("Weak password");
            break;
        }
      });
  };

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    localStorage.clear();
    localStorage.setItem("user", "");
  };

  const authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        localStorage.setItem("user", user);
        console.log(username);
        console.log(user.uid);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) {
    return (
      <>
        <center>
          <br />
          <div className="dashboard">
            <p className="questionTitleInner" style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "16px",
                  lineHeight: "2rem",
                  cursor: "pointer",
                }}
                onClick={goHome}
              >
                ← Back
              </span>
            </p>
            <h2>Dashboard</h2>
            <p style={{ fontFamily: "Source Sans Pro" }}>Email: {user.email}</p>
            <button
              className="loginBox"
              style={{
                marginTop: "20px",
                cursor: "pointer",
                fontFamily: "Source Sans Pro",
              }}
              onClick={handleLogout}
            >
              Log Out
            </button>
            <br />
            <br />
            <br />
            <br />
            <Post history={history} />
          </div>
        </center>
      </>
    );
  } else {
    return (
      <>
        <>
          <center>
            <br />

            <div className="dashboard">
              <p
                className="questionTitleInner"
                style={{ marginBottom: "10px" }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "2rem",
                    cursor: "pointer",
                  }}
                  onClick={goHome}
                >
                  ← Back
                </span>
              </p>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Email"
                className="loginBox"
                style={{
                  outline: "currentcolor none medium",
                }}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="text"
                name="name"
                placeholder="Password"
                className="loginBox"
                style={{
                  outline: "currentcolor none medium",
                  marginTop: "20px",
                }}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                className="loginBox"
                style={{ marginTop: "20px", cursor: "pointer" }}
                onClick={handleLogin}
              >
                Submit
              </button>
              <br /> <br />
              <br />
              <p
                className="questionTitleInner"
                style={{ marginBottom: "10px", fontFamily: "Source Sans Pro" }}
              >
                Accounts are only given to partnered organizations. To form a
                partnership with OSC, please fill out and submit the following
                application. Allow up to a week for this form to be processed
                and get your organization approved for a partnership.{" "}
                <a
                  href="https://forms.gle/99WtnQkzcJBA73sbA"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    overflowWrap: "break-word",
                  }}
                >
                  https://forms.gle/99WtnQkzcJBA73sbA
                </a>
              </p>
            </div>
          </center>
        </>
      </>
    );
  }
}

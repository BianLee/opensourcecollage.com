import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyACf-i7d_b8dj6eWNDbzt3yN1NutXF985w",
  authDomain: "osc2-c8b60.firebaseapp.com",
  projectId: "osc2-c8b60",
  storageBucket: "osc2-c8b60.appspot.com",
  messagingSenderId: "258300313532",
  appId: "1:258300313532:web:8bf9ea1f056fab89c8f5b9",
  measurementId: "G-G0QJHTPFX5",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp;

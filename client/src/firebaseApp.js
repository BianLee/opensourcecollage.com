import firebase from "firebase"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyAUYEs-yrtOcWIUNAz7UKYxJT0NgHAIf3c",
authDomain: "bian-4589f.firebaseapp.com",
projectId: "bian-4589f",
storageBucket: "bian-4589f.appspot.com",
messagingSenderId: "926151468863",
appId: "1:926151468863:web:773f16bb0c6b64e0b8d58a",
measurementId: "G-J0BN5FL25S"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp; 
// import firebase from 'firebase'
// ES Modules:
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDVoth7PJSPbkeM1J-iiRCjXuMER56xrg4",
  authDomain: "codetapacademy.firebaseapp.com",
  databaseURL: "https://codetapacademy.firebaseio.com",
  projectId: "codetapacademy",
  storageBucket: "codetapacademy.appspot.com",
  messagingSenderId: "792521818081",
  appId: "1:792521818081:web:88438c5edacb7231"
};

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const storage = firebase.storage()
export const ts = firebase.firestore.FieldValue.serverTimestamp();
export const auth = firebase.auth();
export const GitHubProvider = new firebase.auth.GithubAuthProvider()

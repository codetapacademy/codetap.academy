import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD1tgumvFXB77I3TsPppXJX35nd3jENOLg",
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
export const ts = new firebase.firestore.FieldValue.serverTimestamp();
export const auth = firebase.auth();
export const GitHubProvider = new firebase.auth.GithubAuthProvider()

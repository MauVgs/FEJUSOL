import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBA4_RYhsJLgiDQV8xi8VOz6hywuRbXYYQ",
  authDomain: "fejusol-a791d.firebaseapp.com",
  databaseURL: "https://fejusol-a791d.firebaseio.com",
  projectId: "fejusol-a791d",
  storageBucket: "fejusol-a791d.appspot.com",
  messagingSenderId: "682801871946"
};

const fire = firebase.initializeApp(config);
export default fire;
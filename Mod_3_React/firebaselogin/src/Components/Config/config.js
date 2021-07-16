import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyAtgDQPHhq0jMj9hOCBK1qH7qqEb_hiAzA",
    authDomain: "loginapp-e19f5.firebaseapp.com",
    projectId: "loginapp-e19f5",
    storageBucket: "loginapp-e19f5.appspot.com",
    messagingSenderId: "936059820725",
    appId: "1:936059820725:web:cbf4006c586d79fb35fcfc",
    measurementId: "G-BEJN19JZD2"
  };
let firebaseinitialise= firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseinitialise.auth();

export default firebaseAuth;
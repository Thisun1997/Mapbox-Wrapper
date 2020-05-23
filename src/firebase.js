import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyClo_2UJZpzNMNoIHfBSuxziAaQlEro7e0",
    authDomain: "sem5proj-4c149.firebaseapp.com",
    databaseURL: "https://sem5proj-4c149.firebaseio.com",
    projectId: "sem5proj-4c149",
    storageBucket: "sem5proj-4c149.appspot.com",
    messagingSenderId: "792762055309",
    appId: "1:792762055309:web:69b832440e9db7f7dfc0c4",
    measurementId: "G-MBGTH3F91M"
  };

firebase.initializeApp(config);
export const databaseRef = firebase.firestore();


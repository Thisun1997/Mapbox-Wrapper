import * as firebase from 'firebase';

const firebaseConfig = {
    
  }; //insert firebase config

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();


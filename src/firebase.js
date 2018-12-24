import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDV_bd3CglO_7eyMYw8Jn29EpRd1hLtWA0",
  authDomain: "slack18-e0a96.firebaseapp.com",
  databaseURL: "https://slack18-e0a96.firebaseio.com",
  projectId: "slack18-e0a96",
  storageBucket: "slack18-e0a96.appspot.com",
  messagingSenderId: "799354832896"
};


firebase.initializeApp(config);

export default firebase;

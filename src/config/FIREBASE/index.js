import firebase from 'firebase';
import auth from '@react-native-firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyAxNO9DLUF6_r1zA6inAjVzaMNmdjVZdbQ',
  authDomain: 'simplecrud-45fdb.firebaseapp.com',
  projectId: 'simplecrud-45fdb',
  storageBucket: 'simplecrud-45fdb.appspot.com',
  messagingSenderId: '1081985622500',
  appId: '1:1081985622500:web:574c769aa7fcf0cf6367f1',
});

const FIREBASE = firebase;

export default FIREBASE;

// import * as React from 'react';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAxNO9DLUF6_r1zA6inAjVzaMNmdjVZdbQ',
//   authDomain: 'simplecrud-45fdb.firebaseapp.com',
//   projectId: 'simplecrud-45fdb',
//   storageBucket: 'simplecrud-45fdb.appspot.com',
//   messagingSenderId: '1081985622500',
//   appId: '1:1081985622500:web:574c769aa7fcf0cf6367f1',
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default () => {
//   return {firebase, auth};
// };

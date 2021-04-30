import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBB9-Ru7CZb1Xfd9IeB-9tfKZ4IYk6Tt6s",
    authDomain: "todo-app-eaccc.firebaseapp.com",
    projectId: "todo-app-eaccc",
    storageBucket: "todo-app-eaccc.appspot.com",
    messagingSenderId: "587892507149",
    appId: "1:587892507149:web:6ccc05972f19857e3f4b44",
    measurementId: "G-63KZJ1KXKD"
  });

const db = firebaseApp.firestore();

export default db;

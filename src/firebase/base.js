import firebase from '../../node_modules/firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey            : 'AIzaSyAWmhqIZjb2G7mQqSEJ505DKUJV1EXvJgQ',
    authDomain        : 'react-todo-list-ef6b2.firebaseapp.com',
    databaseURL       : 'https://react-todo-list-ef6b2.firebaseio.com',
    projectId         : 'react-todo-list-ef6b2',
    storageBucket     : 'react-todo-list-ef6b2.appspot.com',
    messagingSenderId : '914343295567',
    appId             : '1:914343295567:web:9d45d2554fa55b43b6c83a',
    measurementId     : 'G-2FQ529XN5C'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbTodos = db.collection('Todo List');

export default dbTodos;

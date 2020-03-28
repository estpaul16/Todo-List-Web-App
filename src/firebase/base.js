//import Rebase from '../../node_modules/re-base';
import firebase from '../../node_modules/firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey            : '*',
    authDomain        : '*',
    databaseURL       : '*',
    projectId         : '*',
    storageBucket     : '*',
    messagingSenderId : '*',
    appId             : '*',
    measurementId     : '*'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbTodos = db.collection('Todo List');

export default dbTodos;

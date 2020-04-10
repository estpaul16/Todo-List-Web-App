import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Axios from 'axios';
import firestore, { dbTodos } from './firebase/base';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import { v4 as uuid } from 'uuid';

import './App.css';

const App = () => {

    // Todos are the only state in App
    const [ todos, setTodos ] = useState([]);

    // Fetches Todos from Firestore database on load
    useEffect(() => {
        dbTodos.get().then((snapshot) => {
            const initialState = [];
            console.log(snapshot);
            snapshot.forEach((doc) => {
                console.log(doc);
                const currentTodo = doc.data();
                currentTodo['id'] = doc.id;
                initialState.push(currentTodo);
            });
            setTodos(initialState);
        });
        
        // eslint-disable-next-line
    }, []);

    // Fetches Todos from Firestore database on load
    // componentDidMount() {
    //     dbTodos.get().then((snapshot) => {
    //         snapshot.forEach((doc) => {
    //             const currentTodo = doc.data();
    //             currentTodo['id'] = doc.id;
    //             setState({ ...state, todos: [ ...state.todos, currentTodo ] });
    //         });
    //     });
    // };

    // Toggle Complete
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        );
        const toggledTodo = dbTodos.doc(id);
        toggledTodo.get().then((snapshot) => {
            const isCompleted = snapshot.data().completed;
            toggledTodo.update({
                completed : !isCompleted
            });
        });
    };

    // Delete Todo
    const delTodo = (id) => {
        dbTodos.doc(id).delete().then((doc) => {
            setTodos(todos.filter((todo) => todo.id !== id));
        });
    };

    // Add Todo
    const addTodo = (title) => {
        const newTodo = {
            title     : title,
            completed : false
        };
        dbTodos.add(newTodo).then((doc) => {
            newTodo['id'] = doc.id;
            setTodos([ ...todos, newTodo ]);
        });
    };

    return (
        <Router>
            <div className='App'>
                <div className='container'>
                    <Header />
                    <Route
                        // exact path makes it so content in Route is only shown at exactly the url, and none of its extensions
                        exact
                        path='/'
                        render={(props) => (
                            <React.Fragment>
                                <AddTodo addTodo={addTodo} />
                                <Todos todos={todos} toggleComplete={toggleComplete} delTodo={delTodo} />
                            </React.Fragment>
                        )}
                    />
                    <Route path='/about' component={About} />
                </div>
            </div>
        </Router>
    );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Axios from 'axios';
import dbTodos from './firebase/base';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import { v4 as uuid } from 'uuid';

import './App.css';

class App extends React.Component {
    state = {
        todos : []
    };

    // Fetches Todos from Firestore database on load
    componentDidMount() {
        dbTodos.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const currentTodo = doc.data();
                currentTodo['id'] = doc.id;
                this.setState({ todos: [ ...this.state.todos, currentTodo ] });
            });
        });
    }

    componentWillUnmount() {
        //		base.removeBinding(this.todosRef);
    }

    // Toggle Complete
    toggleComplete = (id) => {
        this.setState({
            todos : this.state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
        const toggledTodo = dbTodos.doc(id);
        toggledTodo.get().then((snapshot) => {
            const isCompleted = snapshot.data().completed;
            toggledTodo.update({
                completed : !isCompleted
            });
        });
    };

    // Delete Todo
    delTodo = (id) => {
        dbTodos.doc(id).delete().then((doc) => {
            this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
        });
    };

    // Add Todo
    addTodo = (title) => {
        const newTodo = {
            title     : title,
            completed : false
        };
        dbTodos.add(newTodo).then((doc) => {
            newTodo['id'] = doc.id;
            this.setState({ todos: [ ...this.state.todos, newTodo ] });
        });
    };

    render() {
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
                                    <AddTodo addTodo={this.addTodo} />
                                    <Todos
                                        todos={this.state.todos} 
                                        toggleComplete={this.toggleComplete}
                                        delTodo={this.delTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

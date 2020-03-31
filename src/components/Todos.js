import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const Todos = (props) => {
	return props.todos.map((todo) => (
		<TodoItem
			key={todo.id}
			todo={todo}
			toggleComplete={props.toggleComplete}
			delTodo={props.delTodo}
		/>
	));

}


// PropTypes
Todos.propTypes = {
	todos          : PropTypes.array.isRequired,
	toggleComplete : PropTypes.func.isRequired,
	delTodo        : PropTypes.func.isRequired
};
export default Todos;

import React from 'react';
import PropTypes from 'prop-types';
//import dbTodos from '../firebase/base';

const TodoItem = (props) => {
	const getStyle = () => {
		return {
			background     : '#f4f4f4',
			padding        : '10px',
			borderBottom   : '1px #ccc dotted',
			textDecoration :
				props.todo.completed ? 'line-through' :
				'none'
		};
	};


	
	const { id, title, completed } = props.todo;
	return (
		<div style={getStyle()}>
			<p>
				<input
					type='checkbox'
					checked={completed}
					onChange={props.toggleComplete.bind(this, id)}
				/>{' '}
				{title}
				<button onClick={props.delTodo.bind(this, id)} style={btnStyle}>
					x
				</button>
			</p>
		</div>
	);

}


// PropTypes
TodoItem.propTypes = {
	todo           : PropTypes.object.isRequired,
	toggleComplete : PropTypes.func.isRequired,
	delTodo        : PropTypes.func.isRequired
};

const btnStyle = {
	background   : 'red',
	color        : 'white',
	border       : 'none',
	padding      : '5px 9px',
	borderRadius : '50%',
	cursor       : 'pointer',
	float        : 'right'
};

export default TodoItem;

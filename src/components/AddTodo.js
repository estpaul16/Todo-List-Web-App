import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
	state = {
		title : ''
	};

	// For this component we only use one field, but this is generalized to work with multiple inputs
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		// prevents form from submitting
		e.preventDefault();
		const newTitle = this.state.title;

		// If todo is blank, do nothing on submit
		if (newTitle === '') return;

		this.props.addTodo(newTitle);
		this.setState({ title: '' });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
				<input
					type='text'
					name='title'
					style={{ flex: '10', padding: '5px' }}
					placeholder='Add Todo ...'
					value={this.state.title}
					onChange={this.onChange}
				/>
				<input type='submit' value='Submit' className='btn' style={{ flex: '1' }} />
			</form>
		);
	}
}

AddTodo.propTypes = {
	addTodo : PropTypes.func.isRequired
};

export default AddTodo;

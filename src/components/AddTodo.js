import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddTodo = (props) => {
	// title is the only state property for this component
	const [title, setTitle] = useState('');

    // For this component we only use one field, but this is generalized to work with multiple inputs
    const onChange = (e) => setTitle(e.target.value);

    const onSubmit = (e) => {
        // prevents form from submitting
        e.preventDefault();
        const newTitle = title;

        // If todo is blank, do nothing on submit
        if (newTitle === '') return;

        props.addTodo(newTitle);
        setTitle('');
    };

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type='text'
                name='title'
                style={{ flex: '10', padding: '5px' }}
                placeholder='Add Todo ...'
                value={title}
                onChange={onChange}
            />
            <input type='submit' value='Submit' className='btn' style={{ flex: '1' }} />
        </form>
    );
};

AddTodo.propTypes = {
    addTodo : PropTypes.func.isRequired
};

export default AddTodo;

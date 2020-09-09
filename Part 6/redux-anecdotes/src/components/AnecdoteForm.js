import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showMessage, resetMessage } from '../reducers/notificationReducer';

const NewAnecdote = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(showMessage(`new anecdote '${content}' created`));
    event.target.anecdote.value = '';
    setTimeout(() => {
      resetMessage();
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

export default NewAnecdote;
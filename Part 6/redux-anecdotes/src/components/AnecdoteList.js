import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showMessage, resetMessage } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
}

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes;
      }

      return state.anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase().includes(state.filter));
    }
  );

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showMessage(`Voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000);
  }

  return (
    <div>
        {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
        )}
    </div>
  );
}

export default AnecdoteList;
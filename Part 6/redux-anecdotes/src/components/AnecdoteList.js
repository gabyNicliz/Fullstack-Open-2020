import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showMessage } from '../reducers/notificationReducer';

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
  const anecdotesToShow = () => {
    if (props.filter === '') {
      return props.anecdotes;
    }

    return props
      .anecdotes
      .filter((anecdote) => 
        anecdote.content.toLowerCase().includes(props.filter)
      );
  }

  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.showMessage(`Voted '${anecdote.content}'`, 5);
    console.log(anecdote.content);
  }

  return (
    <div>
        {anecdotesToShow().map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
        )}
    </div>
  );
}

const mapDispatchToProps = {
  voteAnecdote,
  showMessage,
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;
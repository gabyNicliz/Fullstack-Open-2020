import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const MostVotes = (props) => {
  let mostVotesIndex = 0

  for (let i = 1; i < props.votes.length; i++) {
    if (props.votes[mostVotesIndex] < props.votes[i]) {
      mostVotesIndex = i
    }
  }
    return (
      <>
        <p>{props.anecdotes[mostVotesIndex]}</p>
        <p>has {props.votes[mostVotesIndex]} votes</p>
      </>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [maxVotesIndex, setMax] = useState(0)

   const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    const copy = [ ...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button
        handleClick={vote}
        text='vote'
      />
      <Button
        handleClick={selectRandom}
        text='next anecdote'
      />
      <h1>Anecdote with most votes</h1>
      <MostVotes
        votes={votes}
        anecdotes={props.anecdotes}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App 
    anecdotes={anecdotes}
  />,
  document.getElementById('root')
)

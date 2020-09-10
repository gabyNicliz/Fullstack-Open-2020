import anecdoteService from '../services/anecdotes';

// sorts anecdotes in descending order according number of votes
const sortAnecdotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes);

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return sortAnecdotes(state
        .map((anecdote) => anecdote.id === id ? votedAnecdote : anecdote));
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = await anecdoteService
      .updateAnecdote({
        ...anecdote,
        votes: anecdote.votes + 1
      });
    
    const id = anecdoteToUpdate.id;

    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  }
}
export default reducer;
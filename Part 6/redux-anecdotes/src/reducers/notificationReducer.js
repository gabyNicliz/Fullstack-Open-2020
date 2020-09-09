const initialState = null;
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.message;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const showMessage = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message },
  };
}

export const resetMessage = () => {
  return { type: 'RESET' };
}

export default notificationReducer;
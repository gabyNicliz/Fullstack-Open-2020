const initialState = {
  message: '',
  displayTime: 0,
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      clearTimeout(state.displayTime);
      return action.data;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const showMessage = (message, displayTime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        displayTime: setTimeout(() => {
          dispatch({
            type: 'RESET'
          });
        }, displayTime * 1000),
      },
    });
  }
}

export default notificationReducer;
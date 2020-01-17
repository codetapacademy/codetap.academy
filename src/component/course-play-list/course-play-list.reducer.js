export const historyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...action.value }
    case 'UPDATE_HISTORY':
      return {
        ...state,
        history: {
          ...state.history,
          [action.secondToUpdate]: state.history[action.secondToUpdate] + 1
        }
      }
    default:
      return state;
  }
}

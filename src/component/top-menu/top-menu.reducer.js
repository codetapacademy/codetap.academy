export const topMenuReducer = (state = true, action) => {
  if(action.type) {
    return !state
  }
  return state
}

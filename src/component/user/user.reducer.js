export const defaultUser = JSON.parse(window.localStorage.getItem('user'))

export const userReducer = (state = defaultUser, action) => {
  switch(action.type) {
    case 'USER_AUTHENTICATE':
      window.localStorage.setItem('user', JSON.stringify(action.user))
      return action.user
    default:
      return state
  }
}

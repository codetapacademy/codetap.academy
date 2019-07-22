const toggleTopMenu = JSON.parse(window.localStorage.getItem('toggleTopMenu'))
console.log(toggleTopMenu)
export const intialToggleMenu = toggleTopMenu === null ? true : toggleTopMenu

export const topMenuReducer = (state = intialToggleMenu, action) => {
  if(action.type) {
    const newState = !state
    window.localStorage.setItem('toggleTopMenu', JSON.stringify(newState))
    return newState
  }
  return state
}

import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../dashboard/dashboard.reducer'
import { sectionListReducer } from '../course/section.reducer'
import { topMenuReducer, intialToggleMenu } from '../top-menu/top-menu.reducer'
import { userReducer, defaultUser } from '../user';

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, updateCourseList ] = useReducer(courseListReducer, []) 
  const [ sectionList, updateSectionList ] = useReducer(sectionListReducer, []) 
  const [ toggleChat, updateToggleChat ] = useReducer(topMenuReducer, intialToggleMenu)
  const [ user, updateUser ] = useReducer(userReducer, defaultUser)

  return (
    <WebInfoContext.Provider value={
      {
        user,
        updateUser,

        courseList,
        sectionList,

        updateCourseList,
        updateSectionList,

        toggleChat,
        updateToggleChat
      }
    }>
      {children}
    </WebInfoContext.Provider>
  )
}

export const WebInfoState = () => useContext(WebInfoContext)

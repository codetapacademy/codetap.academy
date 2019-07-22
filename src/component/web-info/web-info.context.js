import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../course-panel/course-panel.reducer'
import { sectionListReducer } from '../course/section.reducer'
import { topMenuReducer, intialToggleMenu } from '../top-menu/top-menu.reducer'

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, updateCourseList ] = useReducer(courseListReducer, []) 
  const [ sectionList, updateSectionList ] = useReducer(sectionListReducer, []) 
  const [ toggleChat, updateToggleChat ] = useReducer(topMenuReducer, intialToggleMenu)
  return (
  <WebInfoContext.Provider value={{
    courseList,
    sectionList,
    updateCourseList,
    updateSectionList,
    toggleChat,
    updateToggleChat
  }}>
    {children}
  </WebInfoContext.Provider>
)}

export const WebInfoState = () => useContext(WebInfoContext)

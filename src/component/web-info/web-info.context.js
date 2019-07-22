import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../course-panel/course-panel.reducer'
import { sectionListReducer } from '../course/section.reducer'

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, updateCourseList ] = useReducer(courseListReducer, []) 
  const [ sectionList, updateSectionList ] = useReducer(sectionListReducer, []) 
  return (
  <WebInfoContext.Provider value={{ courseList, sectionList, updateCourseList, updateSectionList }}>
    {children}
  </WebInfoContext.Provider>
)}

export const WebInfoState = () => useContext(WebInfoContext)

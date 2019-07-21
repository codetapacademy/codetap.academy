import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../course-panel/course-panel.reducer'
import { sectionListReducer } from '../course/section.reducer'

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, dispatch ] = useReducer(courseListReducer, []) 
  const [ sectionList ] = useReducer(sectionListReducer, []) 
  return (
  <WebInfoContext.Provider value={{ courseList, sectionList, dispatch }}>
    {children}
  </WebInfoContext.Provider>
)}

export const WebInfoState = () => useContext(WebInfoContext)

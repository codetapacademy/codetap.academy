import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../course-panel/course-panel.reducer'

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, dispatch ] = useReducer(courseListReducer, []) 
  return (
  <WebInfoContext.Provider value={{ courseList, dispatch }}>
    {children}
  </WebInfoContext.Provider>
)}

export const WebInfoState = () => useContext(WebInfoContext)

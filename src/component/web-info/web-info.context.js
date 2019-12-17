import React, { createContext, useContext, useReducer } from 'react'
import { courseListReducer } from '../dashboard/dashboard.reducer'
import { sectionListReducer } from '../course/section.reducer'
import { userReducer, defaultUser } from '../user';

const WebInfoContext = createContext()

export const WebInfoProvider = ({ children }) => {
  const [ courseList, updateCourseList ] = useReducer(courseListReducer, []) 
  const [ sectionList, updateSectionList ] = useReducer(sectionListReducer, []) 
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
      }
    }>
      {children}
    </WebInfoContext.Provider>
  )
}

export const WebInfoState = () => useContext(WebInfoContext)

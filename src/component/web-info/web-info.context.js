import React, { createContext, useContext } from 'react'

const initialValue = {
  test: 'some info'
}

const WebInfoContext = createContext(initialValue)

export const WebInfoProvider = ({ children }) => (
  <WebInfoContext.Provider value={initialValue}>
    {children}
  </WebInfoContext.Provider>
)

export const WebInfoState = () => useContext(WebInfoContext)

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ALL_USERS_LIST, GET_GENERAL_CHANNEL_HISTORY } from './chat.constant'

export const Chat = () => {
  const [ channelMessageList, setChannelMessageList] = useState([])
  useEffect(() => {
    // ditch fetch
    axios.get(GET_GENERAL_CHANNEL_HISTORY)
      .then(({ data }) => {
        console.log(data)
        setChannelMessageList(data)
      })
  }, [])

  return (
    <div>
      <h1>Gigi kent</h1>
      <pre>{JSON.stringify(channelMessageList, null, 2)}</pre>
    </div>
  )
}
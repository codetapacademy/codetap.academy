import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { GET_ALL_USERS_LIST, GET_GENERAL_CHANNEL_HISTORY } from './chat.constant'
import { StyledChannelMessage } from './chat.style';

export const Chat = () => {
  const [ channelMessageList, setChannelMessageList] = useState([])
  useEffect(() => {
    // ditch fetch
    axios.get(GET_GENERAL_CHANNEL_HISTORY)
      .then(({ data }) => {
        /** This is how a message looks like
          client_msg_id: "dbfc0466-0d98-4d19-be1f-b289044212bb"
          text: "Good morning! Update: yesterday I did not code. Today I start my new daily schedule and hope with this to have more time for coding. I will continue with Quick Blog. No blockers"
          ts: "1559805850.083300"
          type: "message"
          user: "UHF2ZUZH8"
         */
        setChannelMessageList(data.messages)
      })
  }, [])

  const renderChatMessage = () => {
    return channelMessageList.map(({ text, ts, user }) => {
      return (
        <StyledChannelMessage>
          <div>{user}</div>
          <div>{text}</div>
          <div>{moment(ts * 1000).fromNow()}</div>
        </StyledChannelMessage>
      )
    })
  }

  return (
    <div>
      <h1>CodeTap Members Chat</h1>
      {renderChatMessage()}
    </div>
  )
}
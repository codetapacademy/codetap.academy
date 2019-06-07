import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { GET_ALL_USERS_LIST, GET_GENERAL_CHANNEL_HISTORY } from './chat.constant'
import { StyledChannelMessage } from './chat.style';

export const Chat = () => {
  const [ channelMessageList, setChannelMessageList] = useState([])
  useEffect(() => {
    axios
      .all([
        axios.get(GET_GENERAL_CHANNEL_HISTORY),
        axios.get(GET_ALL_USERS_LIST),
      ])
      .then(axios.spread(
        (messagesResponse, usersResponse) => {
          const userList = usersResponse.data.members
          const messageList = messagesResponse.data.messages
            .map(message => {
              const something = userList.filter(user => user.id === message.user)
              return {
                ...message,
                niceName: something.reduce(a => a).real_name,
              }
            })
          setChannelMessageList(messageList)
        }
      ))
  }, [])

  const renderChatMessage = () => {
    return channelMessageList.map(({ text, ts, niceName }) => {
      return (
        <StyledChannelMessage>
          <div>{niceName}</div>
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
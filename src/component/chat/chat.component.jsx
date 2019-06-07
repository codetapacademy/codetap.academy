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
          console.log(userList)
          const messageList = messagesResponse.data.messages
            .map(message => {
              const something = userList.filter(user => user.id === message.user)
              // U1BLREAAE
              const mentionedUserId = message.text.match(/<@[A-Z0-9]+>/gm) || []
              const pairedNiceIdList = mentionedUserId
                .map(FBI => {
                  const name = '@' + userList
                    .filter(user => user.id === FBI.slice(2, -1))
                    .reduce(a => a).profile.display_name
                  return {
                    id: FBI,
                    name,
                  }
                })

              console.log(pairedNiceIdList)

              const niceName = something.reduce(a => a).profile.display_name
              let textToBeSplit = message.text
              let text2List = []
              pairedNiceIdList.forEach(pni => {
                const text2 = textToBeSplit.split(pni.id)
                if (!text2List.length) {
                  text2List = [...text2]
                    .reduce((a, c) => {
                      console.log('ccccc', c)
                      return [...a, {
                        type: 'span',
                        text: c
                      }, {
                        type: 'user',
                        text: pni.name
                      }]
                    }, [])
                  text2List = text2List.slice(0, -1)
                } else {
                  text2List = text2List.map(t => {
                    const text2 = t.text.split(pni.id)
                    if (t.type !== 'span' || text2.length === 1) return t
                    else if (text2.length > 1) {
                      const gigiKent = [...text2]
                        .reduce((a, c) => {
                          console.log('ccccc', c)
                          return [...a, {
                            type: 'span',
                            text: c
                          }, {
                            type: 'user',
                            text: pni.name
                          }]
                        }, [])
                      return gigiKent.slice(0, -1)
                    }
                  })
                }
              })
              const text = pairedNiceIdList.length 
                ? text2List
                  .flatMap(z => z)
                  .map(({ type, text }) => {
                    return type === 'span'
                      ? <span>{text}</span>
                      : <user style={{
                        margin: '0 0.4rem',
                        color: '#1264a3',
                        background: '#e8f5fa',
                        borderRadius: '3px',
                        padding: '1px 3px',
                      }}>{text}</user>
                  })
                : message.text
              console.log('****', text2List.flatMap(z => z))

              return {
                ...message,
                text,
                niceName,
              }
            })
          setChannelMessageList(messageList)
        }
      ))
  }, [])

  const renderChatMessage = () => {
    return channelMessageList.map(({ text, ts, niceName }) => {
      return (
        <StyledChannelMessage key={ts}>
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
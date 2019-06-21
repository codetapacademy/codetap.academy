import React, { useState, useEffect } from 'react'
import { StyledApp } from './app.style';
import WidgetBot from '@widgetbot/react-embed'

// interface IProps {
//   server?: string
//   channel?: string
//   shard?: string

//   defer?: boolean

//   className?: string
//   onAPI?: (api: Client) => void

//   style?: React.CSSProperties
//   height?: number
//   width?: number

//   options?: { [key: string]: string }
// }


export const CodeTapAcademy = () => {
  // const nostroBotonneCurrentItem = 0
  // const nostroBotonneCurrentTime = 0
  // const nostroBotonneMessageList = [
  //   {
  //     message: `Welcome to CodeTap Academy!`,
  //     time: 1
  //   },
  //   {
  //     message: `The place where you can become a web developer by building your skills and all the content is free, on YouTube.`,
  //     time: 3
  //   },
  //   {
  //     message: `This is the 8th second message since you got on the website`,
  //     time: 8
  //   },
  // ]
  // // I want to enhnce the web chat notify message and split
  // // it into multiple smaller messages which will appear
  // // on a timeline like sequence, one each (delay) in seconds
  // // that is configurable for each message
  // const getMessage = () => {
  //   nostroBotonneCurrentTime++;
  //   return nostroBotonneMessageList[nostroBotonneCurrentItem]
  // }

  // setInterval(() => {
  //   console.log(nostroBotonneCurrentTime)
  //   nostroBotonne.notify(getMessage)

  // }, 1000)

  const  onAPI = (api) => {
    api.on('signIn', user => {
      console.log(`Signed in as ${user.name}`, user)
    })
  }

  const propList = {
    server: '591067148403867650',
    channel: '591067149108379692',
    shard: 'https://disweb.deploys.io',
    defer: true,
    location: [
      'bottom',
      'right'
    ],
    color: '#d52027',
    onAPI
  }
  return (
    <StyledApp>
      {/* <WidgetBot {...propList} /> */}
      <WidgetBot
        server="591067148403867650"
        channel="591067149108379692"
        shard="https://disweb.deploys.io"
        // defer
        location={[
          'bottom',
          'right'
        ]}
        color="#d52027"
        width="100%"
        height="100%"
        />
    </StyledApp>
  )
}
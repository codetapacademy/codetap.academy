import React from 'react'
import { StyledApp } from './app.style';
import WidgetBot from '@widgetbot/react-embed'
import WebInfo from '../web-info';

export const CodeTapAcademy = () => {
  const showWidgetBot = false
  return (
    <StyledApp showWidgetBot={showWidgetBot}>
      <WebInfo />
      {showWidgetBot && <WidgetBot
        server="591067148403867650"
        channel="591067149108379692"
        shard="https://disweb.deploys.io"
        location={[
          'bottom',
          'right'
        ]}
        color="#d52027"
        width="100%"
        height="100%"
        />}
    </StyledApp>
  )
}
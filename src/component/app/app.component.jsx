import React from 'react'
import { StyledApp } from './app.style';
import WidgetBot from '@widgetbot/react-embed'
import WebInfo from '../web-info';

export const CodeTapAcademy = () => {
  return (
    <StyledApp>
      <WebInfo />
      <WidgetBot
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
        />
    </StyledApp>
  )
}
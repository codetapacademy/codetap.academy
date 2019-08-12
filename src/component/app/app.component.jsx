import React from 'react'
import { StyledApp, StyledWidgetWrapper } from './app.style';
import WidgetBot from '@widgetbot/react-embed'
import WebInfo from '../web-info';
import { WebInfoState } from '../web-info/web-info.context';
import TopMenu from '../top-menu/top-menu.component';

export const CodeTapAcademy = () => {
  const { toggleChat } = WebInfoState()

  return (
    <StyledApp showWidgetBot={toggleChat}>
      <WebInfo />
      {toggleChat && <StyledWidgetWrapper>
        <WidgetBot
          server="591067148403867650"
          channel="591067149108379692"
          shard="https://chat.codetap.academy"
          location={[
            'bottom',
            'right'
          ]}
          color="#d52027"
          width="100%"
          height="100%"
        />
      </StyledWidgetWrapper>}
      <TopMenu />
    </StyledApp>
  )
}
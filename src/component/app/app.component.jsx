import React from 'react'
import { StyledApp, StyledWidgetWrapper } from './app.style';
import WidgetBot from '@widgetbot/react-embed'
import WebInfo from '../web-info';
import TopMenu from '../top-menu/top-menu.component';

export const CodeTapAcademy = () => {
  return (
    <StyledApp>
      <TopMenu />
      <WebInfo />
    </StyledApp>
  )
}
import React from 'react'
import { StyledApp } from './app.style';
import WebInfo from '../web-info';
import TopMenu from '../top-menu/top-menu.component';

export const CodeTapAcademy = () => {
  return (
    <StyledApp>
      <WebInfo />
      <TopMenu />
    </StyledApp>
  )
}
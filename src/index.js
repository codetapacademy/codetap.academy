import React from 'react'
import { render } from 'react-dom'
import { CodeTapAcademy } from './component/app'
import './index.css'
import { ThemeProvider } from 'styled-components'
import theme from './component/theme'
import { WebInfoProvider } from './component/web-info/web-info.context';

const tagId = '#react-will-render-here-and-it-is-really-awesome'

render(
  <ThemeProvider theme={theme}>
    <WebInfoProvider>
        <CodeTapAcademy />
    </WebInfoProvider>
  </ThemeProvider>,
  document.querySelector(tagId)
)

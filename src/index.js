import React from 'react'
import { render } from 'react-dom'
import { CodeTapAcademy } from './component/app'
import './index.css'
import { ThemeProvider } from 'styled-components'
import theme from './component/theme'

const tagId = '#react-will-render-here-and-it-is-really-awesome'

render(
    <ThemeProvider theme={theme}>
        <CodeTapAcademy />
    </ThemeProvider>,
    document.querySelector(tagId)
)

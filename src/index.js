import React from 'react'
import { render } from 'react-dom'
import { CodeTapAcademy } from './component/app'

const tagId = '#react-will-render-here-and-it-is-really-awesome'

render(
    <CodeTapAcademy />,
    document.querySelector(tagId)
)

import React from 'react'
import { render } from 'react-dom'

const CodeTapAcademy = () => {
    return (
        <div>
            <h1>This is not Spartaaa!</h1>
            <h2>This is CodeTap!</h2>
        </div>
    )
}

const tagId = '#react-will-render-here-and-it-is-really-awesome'

render(
    <CodeTapAcademy />,
    document.querySelector(tagId)
)

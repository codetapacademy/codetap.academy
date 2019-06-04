import React, { useEffect } from 'react'
import { GET_CHANNEL_URL } from './chat.constant'

export const Chat = () => {
    useEffect(() => {
        fetch(GET_CHANNEL_URL)
            .then(response => response.json())
            .then(response => console.log(response))
    }, [])

    return (
        <div>Here will come the chat</div>
    )
}
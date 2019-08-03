import React from 'react'

const HeaderTitle = ({ text = 'Change Me', level = 1 }) => {
  const Tag = `h${level}`
  return <Tag>{text}</Tag>
}

export default HeaderTitle

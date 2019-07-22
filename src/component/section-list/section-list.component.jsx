import React from 'react'

const SectionList = ({ data = [] }) => {
  return (
    <div>
      {data.map(({ title}) => <div>{title}</div>)}
    </div>
  )
}

export default SectionList

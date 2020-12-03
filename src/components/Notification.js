import React from 'react'
const Notification = ({ message, type }) => {
  const disp = message === '' ? 'none' : 'block'
  const color = type === 'error' ? 'red' : 'green'
  var style = {
    color: `${color}`,
    border: `1px solid ${color}`,
    padding: '5px',
    display: `${disp}`
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification

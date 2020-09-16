import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div>
      {notification !== '' && <p>{notification}</p>}
    </div>
  )
}

export default Notification
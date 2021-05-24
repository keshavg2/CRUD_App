import React, { useState, useEffect } from 'react'
import './Update.css';
const Update = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()         
        //console.log(user);
        props.updateUser(user.id, user)
      }}
    >
      <div className="update">
      <div className="update-title"><label>Title</label></div>
      <div><input className="update-input"type="text" name="Title" value={user.Title} onChange={handleInputChange} /></div>
      <div className="update-label"><label>Description</label></div>
      <div><input className="update-description"type="text" name="Description" value={user.Description} onChange={handleInputChange} /></div>
      <div><button className="update-button">Update user</button></div>
      </div>
    </form>
  )
}

export default Update;

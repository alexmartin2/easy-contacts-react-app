import React from 'react'
import placeholderphoto from './layout/images/placeholder-photo.png';

export const Contact = ({ contact, deleteContact, setCurrentContact }) => {

  const deleteContactItem = () => {
    deleteContact(contact.id);
  }

  const setCurrent = () => {
    setCurrentContact(contact.id)
  }


  return (
    <div className="contact-card">
      <div className="card-image">
        <img src={placeholderphoto} alt="Contact"/>
      </div>
      <div className="card-info">
        <h4>{contact.name}</h4>
        <div className="email">
          <i className="im im-mail"></i>
          <p>{contact.email}</p>
        </div>
        <div className="phone">
          <i className="im im-phone"></i>
          <p>{contact.phone}</p>
        </div>
        <div className="card-buttons">
          <button onClick = {setCurrent} className="btn edit-btn">Edit</button>
          <button onClick={deleteContactItem} className="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

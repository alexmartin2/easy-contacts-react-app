import React from 'react';
import { Contact } from './Contact';

export const ContactList = ({ contacts, deleteContact, setCurrentContact }) => {
  return (
    <div>
      {contacts.map(contact => <Contact key={contact.id} deleteContact={deleteContact} setCurrentContact={setCurrentContact} contact={contact} />)}
    </div>
  )
}

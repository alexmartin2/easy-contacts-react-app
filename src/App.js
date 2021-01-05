import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import { AddContactForm } from './components/AddContactForm';
import { ContactList } from './components/ContactList';
import { Alert } from './components/layout/Alert';

const App = () => {
  
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://easy-contacts-react-app.herokuapp.com/contacts", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
      });
      const resData = await res.json();
      setContacts(resData);
    }
    fetchData();
  }, []);

  const addContact = async contact => {
    const res = await fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(contact)
    })
    const resData = await res.json();
    setContacts([...contacts, resData]);
  }

  const setCurrentContact = id => {
    setCurrent(contacts.filter(contact => contact.id === id));
  }

  const clearCurrentContact = () => {
    setCurrent(null);
  }

  const updateContact = async updatedContact => {
    updatedContact.id = current[0].id;
    const res = await fetch(`http://localhost:5000/contacts/${updatedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedContact)
    });
    const resData = await res.json();
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? resData : contact));
    setCurrent(null);
  }

  const deleteContact = id => {
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Alert alert={alert} />
        <div className="flex-50-50">
          <AddContactForm addContact={addContact} clearCurrentContact={clearCurrentContact} current={current} updateContact={updateContact} showAlert={showAlert} />
          <ContactList contacts={contacts} deleteContact={deleteContact} setCurrentContact={setCurrentContact} />
        </div>
      </div>  
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

export const AddContactForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const { current } = props;

  useEffect(() => {
    if (current) {
      setContact({ ...contact, name: current[0].name, email: current[0].email, phone: current[0].phone });
      setName(current[0].name);
      setEmail(current[0].email);
      setPhone(current[0].phone);
    }
  }, [current]);

  const nameOnChange = e => {
    setName(e.target.value);
    setContact({ ...contact, name: e.target.value })
  }
  const emailOnChange = e => {
    setEmail(e.target.value);
    setContact({ ...contact, email: e.target.value })
  }
  const phoneOnChange = e => {
    setPhone(e.target.value);
    setContact({ ...contact, phone: e.target.value })
  }

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setContact({
      name: "",
      email: "",
      phone: ""
    })
  }

  const formSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      props.showAlert('Please fill in all fields', 'danger');
    } else {
      if (props.current) {
        props.updateContact(contact)
      } else {
        setContact({ ...contact, name: name, email: email, phone: phone });
        props.addContact(contact);
      }
      clearFields();
    }
  }

  const clearCurrent = () => {
    props.clearCurrentContact();
    setContact({
      name: "",
      email: "",
      phone: ""
    });
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="add-contact-box">
      <h2 className="add-contact-h2">{props.current ? "Edit Contact" : "Add Contact"}</h2>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <input type="text" value={name} name='name' onChange={nameOnChange} className="form-control" placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="email" value={email} name='email' onChange={emailOnChange} className="form-control" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <input type="text" value={phone} name='phone' onChange={phoneOnChange} className="form-control" placeholder="Phone Number" />
        </div>
        <button type="submit" className={props.current ? "edit-contact-btn" : "add-contact-btn"}>{props.current ? "Update Contact" : "Add Contact"}</button>
        {props.current && <div>
          <button className="cancel-contact-btn" onClick={clearCurrent}>Cancel</button>
        </div>}
      </form>
    </div>
  )
}

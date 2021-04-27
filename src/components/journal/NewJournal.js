
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";  
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";

const NewJournal = () => {

  const [formData, setFormData] = useState({
  title: '',
  category: '',
  journal: '',
  date: '',
});

const { title, category, journal, date } = formData;
const onChange2 = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit2 = async (e) => {
  e.preventDefault();

  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let data = {
    title: title,
    category: category,
    journal: journal,
    date : date,
  };
  console.log(data)
  try {
    apiService("/api/journal",
    
    data,
        API_Types_Enum.post_with_auth,
        (response) => {console.log('journal added');
        setFormData(true)},
        (err) => console.log(err));
            return <Redirect to='/journal'  />
        // console.log(formData);
  } 
  
  catch (e) {
    console.log('error ', e);
  }
};











const [reminderFormData, setReminderData] = useState({
  name: '',
  startDate: '',
  endDate: ''
});

const { name, startDate, endDate } = reminderFormData;
const onChange02 = (e) =>
  setReminderData({ ...reminderFormData, [e.target.name]: e.target.value });

const onReminderSubmit = async (e) => {
  e.preventDefault();

  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let reminderData = {
    name: name,
    startDate: startDate,
    endDate: endDate,
  };
  console.log(reminderData)
  try {
    apiService("/api/reminder",
        reminderData,
        API_Types_Enum.post_with_auth,
        (response) => {console.log('reminder added');
        setReminderData(true)},
        (err) => console.log(err));
        // console.log(formData);
  } 
  
  catch (e) {
    console.log('error ', e);
  }
};


    return ( 
      <div>
<Form  onSubmit={(e) => onSubmit2(e)}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label  class="text-info"><b>Title :</b></Form.Label>
    <Form.Control type="text" placeholder="Enter Title For Your Journal" name="title" onChange={(e) => onChange2(e)} required/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label  class="text-info"><b>Select Category :</b></Form.Label>
    <Form.Control as="select" name="category"
            onChange={(e) => onChange2(e)} required>
      <option>Travel</option>
      <option>Personal</option>
      <option>Food</option>
      <option>Study</option>
      <option>Other</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
  </Form.Group>
  <Form.Group  controlId="exampleForm.ControlTextarea1">
    <Form.Label class="text-info"><b>Start Writing Your Journal Here :</b></Form.Label>
    <Form.Control placeholder="...." as="textarea" rows={3} name="journal" required onChange={(e) => onChange2(e)}  />
  </Form.Group>
  <FormGroup controlId="date" bsSize="large">
  <Form.Label class="text-info"><b>Date</b></Form.Label>
         <FormControl
            type="date" name="date" onChange={(e) => onChange2(e)}
            required/></FormGroup>
  <button type="submit" class="btn btn-success">Save</button>
</Form>

<br/><br/><br/><br/>
<h2>Add Reminder To Complete Draft Journal :</h2>
<Form  onSubmit={(e) => onReminderSubmit(e)}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label  class="text-info"><b>Reminder Name :</b></Form.Label>
    <Form.Control type="text" placeholder=" Name for your journal - reminder" name="name" onChange={(e) => onChange02(e)} required/>
  </Form.Group>
  <FormGroup controlId="date" bsSize="large">
  <Form.Label class="text-info"><b>Start Date</b></Form.Label>
         <FormControl
            type="date" name="startDate" onChange={(e) => onChange02(e)}
            required/></FormGroup>

  <FormGroup controlId="date" bsSize="large">
  <Form.Label class="text-info"><b>End Date</b></Form.Label>
         <FormControl
            type="date" name="endDate" onChange={(e) => onChange02(e)}
            required/></FormGroup>
  <button type="submit" class="btn btn-danger">Add Reminder</button>
</Form>
</div>

);

};

export default NewJournal;


import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


const NewJournal = () => {
    return ( 
<Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label  class="text-info"><b>Title :</b></Form.Label>
    <Form.Control type="text" placeholder="Enter Title For Your Journal" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label  class="text-info"><b>Select Category :</b></Form.Label>
    <Form.Control as="select">
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
    <Form.Control placeholder="...." as="textarea" rows={3}  />
  </Form.Group>
  
  <button type="button" class="btn btn-success">Save</button>
</Form>

);

};

export default NewJournal;
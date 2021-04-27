import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";  
import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";

const EditJournals = (props) => {

    const { values, handleChange } = props;
    const [isRedirect, setRedirect] = useState(false);
    const [isAddResLoading, setIsAddResLoading] = useState(false);
    const [addReserror, setaddResError] = useState();
   


  const [journalField,setJournalField]=useState(
    {
        title: '',
        category: '',
        journal: '',
        date: '',
    }
  );


  useEffect(() => {
{
// get api call on edit resume
apiService("/api/journal/",
  null,
  API_Types_Enum.get,
  (response) => setJournalField({
    step: 1,
title: response.data.title,
category: response.data.category,
journal: response.data.journal,
date: response.data.date,
id:response.data._id
  }),
  (err) => console.log(err));
}
  }, []);

 
  

const addJournal = async(journalData) => {
  let data = journalData;
  try {
      if(journalField.id)
      {
         //update api call with put method
          setIsAddResLoading(true);
          apiService("/api/journal",
          data,
              API_Types_Enum.put_with_auth,
              (response) => {console.log('journal updated');
              setIsAddResLoading(false);
              setaddResError(null);
              setRedirect(true)},
              (err) => {
              setIsAddResLoading(false);
   
    let error_message="";
    err.response.data.errors.map((error)=> 
(
  error_message += error.msg+"\n"
 
)
)
                  setaddResError(error_message);
              });
          
      }
            
      
  } catch (e) {
    console.log(e.response.data.errors);
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setJournalField({
      ...journalField,
      [evt.target.name]: value
    });
};
  };
  
  console.log("***********************888");
  console.log(journalField.title);
    



    return (  
      <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label  class="text-info"><b>Title :</b></Form.Label>
        <Form.Control type="text" placeholder="Enter Title For Your Journal" handleChange={handleChange} name="title"/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label  class="text-info"><b>Select Category :</b></Form.Label>
        <Form.Control as="select" name="category">
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
        <Form.Control placeholder="...." as="textarea" rows={3} name="journal"  />
      </Form.Group>
      <FormGroup controlId="date" bsSize="large">
      <Form.Label class="text-info"><b>Date</b></Form.Label>
             <FormControl
                type="date" name="date" /></FormGroup>
      <button type="submit" class="btn btn-success">Save</button>
    </Form>
    
    );

  };

export default EditJournals;
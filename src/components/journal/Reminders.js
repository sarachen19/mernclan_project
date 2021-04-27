
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeleteJournal from './DeleteJournal';
import EditJournal from './EditJournal';
import ReactDOM from "react-dom";
import { NavLink, Link } from "react-router-dom";
import React,{useState,useEffect,Component} from "react";
import './journal.css'; 
import Table from 'react-bootstrap/Table'
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";

const Reminders = () => {

const [reminderList,setReminderList ] = useState([]);

    //api validation code
const [isReminderListLoad, setIsReminderListLoad] = useState(false);
const [errorReminderList, setErrorReminderList] = useState();
     
useEffect(() => {
setIsReminderListLoad(true);
apiService("/api/reminder",
          null,
        API_Types_Enum.get_with_auth,
        (response) => {
        console.log(response["data"])
        setReminderList(response["data"]);
        setIsReminderListLoad(false);
        setErrorReminderList(null);
 },
        (err) => {
        console.log(err);
        setIsReminderListLoad(false);
        setErrorReminderList(err);
          });
      }, []);
    
      
    
      const handleDeleteReminder = async (passid) => {
       setReminderList((prevState) => prevState.filter((t) => t._id !== passid));
        apiService("/api/reminder",
        { id: passid },
        API_Types_Enum.delete_with_auth,
        (response) => {console.log(response);
         
          setErrorReminderList(null);
          console.log(reminderList);
          const remove = reminderList.filter(reminders => passid !== reminders._id)
          setReminderList(remove);
        },
        (err) => {
          console.log(err);
        
        });
      };
      function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
        }

if (errorReminderList) return <div className="alert alert-danger">Error: {errorReminderList}</div>;

const reminders = (reminderList)
console.log(reminders)

function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}


    return (
<Table striped bordered hover variant="dark">
    
  <thead>
    <tr>
      <th><h4>Reminder</h4></th>
      <th><h4>Start Date</h4></th>
      <th><h4>End Date</h4></th>
      <th><h4>Delete</h4></th>
    </tr>
  </thead>
  {reminders.map((reminder,index)=>(
  <tbody>
    <tr>
      <td><h6>{reminder.name}</h6></td>
      <td><h6>{formatDate(reminder.startDate)}</h6></td>
      <td><h6>{formatDate(reminder.endDate)}</h6></td>
      <td><button type="button" onClick={() => handleDeleteReminder(reminder._id)} class="btn btn-danger"><h6>Delete Reminder</h6></button></td>
    </tr>
  </tbody>))}
</Table>
    )
};

export default Reminders;
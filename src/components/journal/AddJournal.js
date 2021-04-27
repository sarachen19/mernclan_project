
import { NavLink} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ExistingJournal from './ExistingJournal';
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";
import _ from 'lodash';



const AddJournal = () => {


  const [journalList,setJournalList ] = useState([]);

//api validation code
const [isJournalListLoad, setIsJournalListLoad] = useState(false);
  const [errorJournalList, setErrorJournalList] = useState();

  
 
  useEffect(() => {
    setIsJournalListLoad(true);
    apiService("/api/journal",
      null,
      API_Types_Enum.get_with_auth,
      (response) => {
        console.log(response["data"])
        setJournalList(response["data"]);
        setIsJournalListLoad(false);
        setErrorJournalList(null);
    },
      (err) => {
        console.log(err);
        setIsJournalListLoad(false);
        setErrorJournalList(err);
      });
  }, []);

  const handleDeleteJournal = async (passid) => {
  
  setJournalList((prevState) => prevState.filter((t) => t._id !== passid));
    apiService("/api/journal",
    { id: passid },
    API_Types_Enum.delete_with_auth,
    (response) => {console.log(response);
     
      setErrorJournalList(null);
      console.log(journalList);
      const remove = journalList.filter(journals => passid !== journals._id)
      setJournalList(remove);
    },
    (err) => {
      console.log(err);
    
    });
  };




  if (errorJournalList) return <div className="alert alert-danger">Error: {errorJournalList}</div>;

  const journals = (journalList)
  console.log(journals)

    return (
        <div className="page-content">
        <p><b>Want To Add New Journal ? </b> 
        <NavLink to="../components/journal/NewJournal"><button type="button" class="btn btn-info">Start Here</button></NavLink>
        <NavLink to="../components/journal/Reminders"><button type="button" class="btn btn-warning">Check Reminders</button></NavLink>
        </p>
        
        <ExistingJournal 
        jorunal_data={journals}
        deleteJournal={handleDeleteJournal}>
          </ExistingJournal>
    </div>
    );

  };

export default AddJournal;
import React,{ useState, useEffect } from 'react';
import '../Note.css';

import NoteSidebar from './NoteSidebar' ;
import NoteContent from './NoteContent';
import uuid from 'react-uuid';
import axios from 'axios';

const Note = () => {

  const [notes,setNotes] = useState([]);
  const [test,setTest] = useState([]);
  useEffect(() => {

    axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
      response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
      setNotes(response.data);
      setTest(response.data);
      console.log(response);
    });
  }, []);
  

  const[activeNote,setActiveNote] = useState(false);
  const[textDisabled,setTextDisabled] = useState(true);

  const onAddNote = () => {
   
    const newNote = {

      _id:uuid(),

      title :"Title",

      description : "description",

      date:Date.now(),

      tagData:[null],

    }

    setNotes([newNote,...notes]);
    //setTest([newNote,...test]);
  }
   
  const onDeleteNote = async (noteId) => {
    console.log("Sandeep12 printing id"+ noteId);
    //setNotes(notes.filter((eachNote) => eachNote.id!== note.id ));
    let token = sessionStorage.getItem('token');
        console.log("Sandeep printing"+ token);
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          data : {
            id:noteId,
          }
        };

       
        console.log("Sandeep1234 printing id"+ noteId);
        try {
          const response = await axios.delete(
            'https://mern-clan.herokuapp.com/api/note',
            config
          );
          console.log(response);
        } catch (e) {
          console.log('error ', e);
        }
        axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
          response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
          setNotes(response.data);
          
        });
      };
  

  
  const onEditNote = (editedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note._id === editedNote._id){
        return editedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }

 
   
  const getActiveNote = () => {    
    const r = notes.find((note) => note._id === activeNote);
   return r;
    
  };
   
   return (  <div >
        <div className="col-lg-8 mx-auto text-center mt-5">
        <h1><b>Create a note!</b></h1>  
        </div>
        <div className="note"> 
      
          <NoteSidebar notes={notes} onAddNote={onAddNote} 
          onDeleteNote={onDeleteNote}
          activeNote = {activeNote}
          setNotes = {setNotes}
          setActiveNote = {setActiveNote}
          setTextDisabled = {setTextDisabled}
          
          />
          
          <NoteContent 
          activeNote ={ getActiveNote()} 
          onEditNote={onEditNote} 
          test={test} 
          setTest={setTest}
          textDisabled = {textDisabled}
          setActiveNote = {setActiveNote}  
          setNotes = {setNotes}    
          />   
          <hr />
        </div>  
       
      </div>   );
        }
      

      
 export default Note;
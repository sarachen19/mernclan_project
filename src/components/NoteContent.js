import ReactMarkdown from 'react-markdown';
import React, { useState,useCallback } from 'react';
import axios from 'axios';
import TagsInput from './TagsInput';

const NoteContent = ({ activeNote, onEditNote, test, textDisabled, setActiveNote, setNotes, setTest}) => {
  const [temp,setTemp] = useState([]);
  const [tag,setTag] = useState([]);
 
  const [formData, setFormData] = useState({ 
    title: '',
    description: '',
  });
  const { title, description }= formData;
  const onEditField = (key,value) => {
   
    onEditNote({
      ...activeNote,
     _id : activeNote._id,
      [key] :  value,
     
      date:Date.now(),
     // tagData:selectedTags,
    })
    setFormData({ ...formData,[key] : value});
  };
  const [check,setCheck] = useState(false);
  const selectedTags = tags =>{
      setTag(tags);
      setCheck(true);  
  } 
  
  const OnSubmit2 = async (e) => {
    e.preventDefault();
    
    let token = sessionStorage.getItem('token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    let data = {   
      id:activeNote._id,
      title: title,
      description: description,
      date:Date.now(),
      tags:[],
     
    };
    if(check == true){
      data.tags = tag;
      setCheck(false);
    }
    var cat = false;
    
    try {
      test.map(tes => {
        if(tes._id === activeNote._id){     
          cat = true;            
        }
      
      })
      
      if (cat === true){
        if(data.title == ""){
          data.title = activeNote.title;
        }
        if(data.description == ""){
          data.description = activeNote.description;
        }
        try{
          const response =  await axios.put(      
            'https://mern-clan.herokuapp.com/api/note',          
            data,
            config     
          );
        } 
        catch (e) {
          alert(e.response.data);
           console.log('error ', e.response);
         }             
      }
      else{
        if(data.description == ""){
          data.description = "description"
        }
        if(data.title == ""){
          data.title = "Title"
        }
          const response = await axios.post(      
          'https://mern-clan.herokuapp.com/api/note',
         
          data,
          config     
        ); 
        
       
      }
      setFormData({ 
        title: '',
        description: '',
      });
      
    } catch (e) {
      console.log('error ', e);
    }
   
    
    setActiveNote(!activeNote);
    // useCallback(() => {
    //   setActiveNote(!activeNote);
    // })
    axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
      response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
      setNotes(response.data);
      setTest(response.data);
      
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  if(!activeNote)
  return <div className ="no-active-note">No note selected</div>
  else{
    //console.log("Erri"+activeNote.tagData[0]);
    return (
      
    <div className = "note-main">

      <div className="note-tags">
      <TagsInput selectedTags={selectedTags} activeNote={activeNote}/>
      </div>
      
       <form onSubmit={(e) => OnSubmit2(e)}>
      
      <div className="note-main-note-edit">  
          <input
          type="text"
          id="title"
          disabled= {textDisabled}
          value={activeNote.title}
          onChange = { (e) => onEditField("title",e.target.value)}
          placeholder="Note Title"  
          autoFocus
        />

        <textarea
          id="body"
          disabled= {textDisabled}
          placeholder="Write your note here..."
          value={activeNote.description}  
          onChange = { (e) => onEditField("description",e.target.value)} 
        />
       
      </div>
      <div className="note-main-note-preview">      
      <div className="preview-title">{activeNote.title}</div> 
            <ReactMarkdown className="markdown-preview">{activeNote.description}</ReactMarkdown>        
      </div> 
   

      <div className="save">        
      <button type="submit">Submit</button>            
        </div>
      
        </form>
        </div>    
    );}
}

export default NoteContent;
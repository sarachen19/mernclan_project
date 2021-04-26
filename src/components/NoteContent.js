import ReactMarkdown from 'react-markdown';
import React, { useState,useCallback } from 'react';
import axios from 'axios';
import TagsInput from './TagsInput';

const NoteContent = ({ activeNote, onEditNote, test, textDisabled, setActiveNote, setNotes, setTest}) => {
  const [temp,setTemp] = useState([]);
  const [tag,setTag] = useState([]);
  
  test.map((tes) => {
    console.log("Akhil"+tes._id);
    console.log("Akhil"+tes.title);
  })
 
  console.log("Akhil"+textDisabled);
  const [formData, setFormData] = useState({ 
    title: '',
    description: '',
  });
  const { title, description }= formData;
  const onEditField = (key,value) => {
    console.log("Akka printing activeNote._id"+activeNote._id);
    console.log("Akka printing activeNote.title"+activeNote.title);
    console.log("Akka printing activeNote.description"+activeNote.description);
    console.log("Akka printing activeNote.date"+activeNote.date);
   
    onEditNote({
      ...activeNote,
     _id : activeNote._id,
      [key] :  value,
     
      date:Date.now(),
      tagData:selectedTags,
    })
    setFormData({ ...formData,[key] : value});
  };

  const selectedTags = tags =>{
    console.log("Jubba"+tags);
    setTag(tags);
  } 
  
  const OnSubmit2 = async (e) => {
    e.preventDefault();
    
    let token = sessionStorage.getItem('token');
    console.log("Tejal"+token);
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
   let d;
    let data = {   
      id:activeNote._id,
      title: title,
      description: description,
      date:Date.now(),
      tags:tag,
     
    };
     
    console.log("Huma"+tag);
    var res;
    var cat = false;
    
    try {
      test.map(tes => {
       
        console.log("gguu"+tes._id);
        console.log("gguu1"+activeNote._id);
        if(tes._id === activeNote._id){
        
          cat = true;            
        }
      
      })
      console.log("Rajesh printing value"+cat);
      if (cat === true){
        console.log("Parugu"+data.description);
        console.log("Parugu"+data.title);
        
        if(data.description == ""){
          data.description = activeNote.description;
        }
        if(data.title == ""){
          data.title = activeNote.title;
        }
       
          const response =  await axios.put(      
          'https://mern-clan.herokuapp.com/api/note',
          data,
          config     
        );
         
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
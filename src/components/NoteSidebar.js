import React,{ useState, useEffect } from 'react';
import Search from './Search';
import axios from 'axios';
import Button from './Button';
const Sidebar = ({notes,onAddNote,onDeleteNote,activeNote,setActiveNote,setTextDisabled,setNotes}) => {
    const [data,setData] = useState("");
    useEffect(() => {
        axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
          response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
          setData( response.data);
         // setTest(response.data);
          console.log(response);
        });
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setPosts(data);
        //     console.log(data);
        //   });
      }, []);

   // const sortedNotes = notes.sort((a, b) => b.date - a.date);
   
    function refreshPage() {
        window.location.reload(false);
    }
    
    notes.map(note => {
        console.log("Pranay printing notes"+note.date);
    })
    // sortedNotes.map(note => {
    //     console.log("Phani1 printing notes"+note.date);
    // })
    const [filteredList, setFilterList] = useState(notes);
    
    const FilterTask = (title) => {
        
        console.log("Mayank printing title"+title);
        if (!title || title ===" " || title===undefined) {
      
        axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
          response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
          setNotes(response.data);
          
        });
            
        }
        else{
          console.log("Howla printing")
            setNotes(
                notes.filter((t) => t.title.toLowerCase().includes(title.toLowerCase()))
            );
        }
        
      };

    //const [filteredList, setFilterList] = useState(notes);
  
  const [clicked,setClicked] = useState(false);
  const filterTag = (tag) => {
    console.log("Mayank printing tag"+tag);
    console.log("Mayank printing clicked"+clicked);
    if(!clicked){
      console.log("Mayank1 printing clicked"+clicked);
      setClicked(true);
      console.log("Mayank12 printing clicked"+clicked);
      
        
         
            const r = notes.filter((t) => {
              for(let i=0;i<t.tagData.length;i++){
              if(t.tagData[i].toLowerCase().includes(tag.toLowerCase())){
                  return t.tagData[i].toLowerCase().includes(tag.toLowerCase());
              } 
            }
          }           
           
            )
            setNotes(r);  
        
  }
  else if(clicked){
    console.log("Mayank2 printing clicked"+clicked);
    setClicked(false);
    axios.get('https://mern-clan.herokuapp.com/api/note').then((response) => {
      response.data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
      setNotes(response.data);
    });
  }

  }   
    return( 
    <div class="note-sidebar">
       <Button notes={notes} filterTag={filterTag}></Button> 
    
    {/* {/* <div>
{notes.map((note) => {
        for(let i=0;i<note.tagData.length;i++){
          console.log("Nhhu"+note.tagData[i]); 
          (<button>{note.tagData[i].toString}</button>)
        }
      })}
      </div>  */}
      
     
        <div className = "note-sidebar-header">
        
            <h1>Notes</h1>
            <button onClick={onAddNote}>Add</button>
    
        </div>

        <div className="note-sidebar-search">
        <Search filterTask={FilterTask}/>
        </div>
        
        
        <div className = "note-sidebar-notes">
        
            {notes.map((note) => (
              
              <div 
              className = {`note-sidebar-note ${note._id === activeNote && "active"} `}
               //onClick={() => setActiveNote(currentnote.id)}
            >

              <div className = "sidebar-note-title">
                  <strong>{note.title}</strong>
                  
                  <button onClick={
                      () => {
                        onDeleteNote(note._id);
                        refreshPage();
                      }}>Delete</button>
                  <button onClick={() => {setActiveNote(note._id);setTextDisabled(false)}}>Update</button>
                  <button  onClick={() =>{ setActiveNote(note._id);setTextDisabled(true)}}>View</button>
          </div>
          <p>{note.description && note.description.substr(0,100)+ "..."}</p>
          <small className ="note-meta">Lastmodified {new Date(note.date).toLocaleDateString("en-GB",{
              hour:"2-digit",
              minute:"2-digit",
          })}</small>
          </div>  
            ))}      
    
        </div>
    </div>)
    
    }
    
    export default Sidebar;
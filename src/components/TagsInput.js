import React from 'react';
import { useState } from 'react';
import '../components/TagsInput.css';



const TagsInput = (props) => {


const [tags,setTags] = useState([]);
const addTags = event => {
    if(event.key === "Enter" && event.target.value !== ""){
        setTags([...tags,event.target.value]);
        
        props.selectedTags([...tags, event.target.value]);
        event.target.value = "";
    }
}
let sam ="";
let s;  

const valueUpdate = () => {
  console.log("Manju"+props.activeNote.tagData);
  console.log("Manju22");
 
    if(props.activeNote.tagData != "" && props.activeNote.tagData != null){
      console.log("Manju inside if check");
      for(let i=0;i<props.activeNote.tagData.length;i++){
        if(sam ==""){
          sam = props.activeNote.tagData[i];
        }
        else{
          sam = sam+","+props.activeNote.tagData[i]; 
        }
         
      }
      console.log("Maharshi"+sam);
     s = sam;
      sam = "";
     
      return s;
    }
 
 

}
  

const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
}

return(
    <div className="body">
       <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <div className="tag-title">
      <input
        type="text"
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
      
        placeholder="Enter the tags"
       // value={props.activeNote.tagData[0]}    
      
       placeholder={valueUpdate()}
      />
      </div>
    </div>
    </div>
);
};
export default TagsInput;
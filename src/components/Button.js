import React from 'react';
import './Button.css'
var buttonStyle = {
  fontSize : '10px',
  margin : '4px 4px 4px 0',
  color:'#08c'
};

const Button = (props) => {

  const handleButtonClicked = (e) => {
    e.preventDefault(); //will give you the value continue
    props.filterTag(e.target.value);
  
  }

  const array = []; 
    props.notes.map((note) => {
      
      console.log("Huhu"+note.title);
      for(let i=0;i<note.tagData.length;i++){
        if(note.tagData[i] != null){
        
          {
            array.push(
              // <div id="parentDiv">
               <button
               
                  className="button button5"
                  //className="changed"
                  //className="tag"
                  //className= "btn btn-outline-info btn-rounded"
                  //data-mdb-ripple-color="dark"
                style={buttonStyle}
                 value={note.tagData[i]}
                 onClick={handleButtonClicked}
                 
                 >{"#"+note.tagData[i]}</button>
                 //</div>
                 )
          }
       
      }

    }}
      
      )
      const arrOne = new Set(array);
      console.log(arrOne);
      for(let i=0;i<arrOne.length;i++){
        console.log("Hulla"+arrOne[i]);  
      }
      const arrTwo = array.filter((item, index) => array.indexOf(item) == index);
      console.log(arrTwo);
    return array;
        
}

export default Button;
import '../Note.css';
import NoteSidebar from './NoteSidebar' ;
import NoteContent from './NoteContent';

const Note = () => {
    return (  <div >
        <div className="col-lg-8 mx-auto text-center mt-5">
        <h1><b>Create a note!</b></h1>  
        </div>
        <div className="note">
           
          <NoteSidebar/>
          <NoteContent/>
         
        
          <hr />
        </div>  
       
      </div>   );
        }
 export default Note;
 

const noteContent = () => {
    return (
    <div className = "note-main">
      <div className="note-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"  
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."      
        />
      </div>
      <div className="note-main-note-preview">
            <div className="markdown-preview">note preview</div>        
        </div>  
        <div className = "sidebar-note-title">
       
        </div>
        <div className="save">
        <button><b>Save</b></button>
        </div>
        </div>
    );
}

export default noteContent;


const sidebar = () => {
    return( <div class="note-sidebar">
    
        <div className = "note-sidebar-header">
            <h1>Notes</h1>
            <button>Add</button>
    
        </div>
        <div className = "note-sidebar-notes">
        <div className = "note-sidebar-note">
            <div className = "sidebar-note-title">
                <strong>Title</strong>
                <button>Delete</button>
                <button>Update</button>
                <button>Share</button>
        </div>
        <p>Note preview</p>
        <small className ="note-meta">Last</small>
        </div>
      
        
    
        </div>
    </div>)
    
    }
    
    export default sidebar;
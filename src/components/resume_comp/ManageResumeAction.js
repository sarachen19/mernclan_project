
import { NavLink} from "react-router-dom";


const ManageResumeAction = () => {
    return (
        <div className="page-content">
        
        <NavLink to="../resume/AddResume"><button type="button" class="btn btn-info">Add Resume</button></NavLink>
        
        
    </div>
    );

  };

export default ManageResumeAction;
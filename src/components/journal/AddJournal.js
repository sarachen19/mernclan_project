import AddedJournals from './AddedJournals';
import { NavLink} from "react-router-dom";


const AddJournal = () => {
    return (
        <div className="page-content">
        <p><b>Want To Add New Journal ? </b> 
        <NavLink to="../components/journal/NewJournal"><button type="button" class="btn btn-info">Start Here</button></NavLink>
        </p>
        <AddedJournals/> 
    </div>
    );

  };

export default AddJournal;

import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeleteJournal from './DeleteJournal';
import EditJournal from './EditJournal';
import ReactDOM from "react-dom";
import { NavLink, Link } from "react-router-dom";
import React,{Component} from "react";
import './journal.css'; 
import Form from 'react-bootstrap/Form';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
class ExistingJournal extends Component {
render (){

const { jorunal_data, deleteJournal} = this.props;
function formatDate(string){
var options = { year: 'numeric', month: 'long', day: 'numeric' };
return new Date(string).toLocaleDateString([],options);
}
return (

<p>
{jorunal_data.map((journal,index)=>(
<div class="shadow p-3 mb-5 bg-white rounded">

<h4 class="text-info">{journal.title}</h4>
<hr/>
<h5 class="text-secondary">Category : {journal.category}</h5>  
<h6>{journal.journal}</h6>  
<p>{formatDate(journal.date)}</p>  
<div class="modal-body">

</div>

{/* <NavLink to={"../components/journal/EditJournal/"+journal._id}><h1>sayali edit</h1></NavLink>  */}



<button className="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
Edit</button> 


<button type="button" className="btn btn-outline-danger" data-mdb-ripple-color="dark"  onClick={() => deleteJournal(journal._id)}>
Delete</button>

<div class="collapse" id="collapseExample">
<div class="card card-body">

<Form>
<Form.Group controlId="exampleForm.ControlInput1">
<Form.Label  class="text-info"><b>Title :</b></Form.Label>
<Form.Control type="text" placeholder="Enter Title For Your Journal" name="title" defaultValue={journal.title} required/>
</Form.Group>
<Form.Group controlId="exampleForm.ControlSelect1">
<Form.Label  class="text-info"><b>Select Category :</b></Form.Label>
<Form.Control as="select" name="category" required defaultValue={journal.category} >
    <option>Travel</option>
    <option>Personal</option>
    <option>Food</option>
    <option>Study</option>
    <option>Other</option>
</Form.Control>
</Form.Group>
<Form.Group controlId="exampleForm.ControlSelect2">
</Form.Group>
<Form.Group  controlId="exampleForm.ControlTextarea1">
<Form.Label class="text-info"><b>Start Writing Your Journal Here :</b></Form.Label>
<Form.Control placeholder="...." as="textarea" rows={3} name="journal" required  defaultValue={journal.journal} />
</Form.Group>
<FormGroup controlId="date" bsSize="large">
<Form.Label class="text-info"><b>Date</b></Form.Label>
        <FormControl
         name="endate" defaultValue={journal.date} 
        required/></FormGroup>
<button type="button" class="btn btn-success">Save</button>
</Form>



</div>
</div>
</div>
))}
</p>
);
}

};
export default ExistingJournal;
import React,{Component} from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';

class ResumeTable extends Component {
 raiseSort= path=>{
  const sortColumn = {...this.props.sortColumn};
  
  if(sortColumn.path === path)
  {
   
    sortColumn.order = sortColumn.order === "asc"?"desc":"asc";
  }
  
  else
  {
   
    sortColumn.path = path;
    sortColumn.order = "asc";
  }
  
  this.props.onSort(sortColumn);
  
 }
 renderSortIcon = column =>
 {
   const {sortColumn} = this.props;
  
   if(column !== sortColumn.path) return null;
   if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true"></i>
   return <i className="fa fa-sort-desc" aria-hidden="true"></i>
 }

  render() { 
    const { resume_detail, removeResume } = this.props;
    return (
      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
          
              <th onClick={()=>this.raiseSort('name')}>Name {this.renderSortIcon('name')}</th>
              <th onClick={()=>this.raiseSort('email')} scope="col">Email {this.renderSortIcon('email')}</th>
              <th onClick={()=>this.raiseSort('phone')} scope="col">Phone {this.renderSortIcon('phone')}</th>
              <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {resume_detail.map((resume,index) => (
              
            <tr key={resume._id}>
                
              <td><Link to={`/resume/${resume._id}`}>{resume.name}</Link></td>
              <td>{resume.email}</td>
              <td>{resume.phone}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm" onClick={() => removeResume(resume._id)}
                >
                  Delete
                </button>
                <Link to={`/resume/EditResume/${resume._id}`} className="btn btn-primary btn-sm">Update</Link>
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
 


export default ResumeTable;

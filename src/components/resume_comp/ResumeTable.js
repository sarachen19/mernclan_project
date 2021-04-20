import React from "react";
import { Link } from "react-router-dom";
const ResumeTable = (props) => {
  const { resume_detail, removeResume } = props;

  return (
    <table className="table table-striped table-bordered mt-3">
      <thead>
        <tr>
        
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
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
};

export default ResumeTable;

import React, { useState, useEffect } from 'react';
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import axios from 'axios';
import ResumeTable from './ResumeTable';
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";

const ResumeListing = () => {
  const [resumelist, setResumelists] = useState([]);

//api validation code
const [isResumeListLoad, setIsResumeListLoad] = useState(false);
  const [errorResumeList, setErrorResumeList] = useState();

  
  const [errorResumeDel, setErrorResumeDel] = useState();

  const [pagesettings, setPageSetting] = useState(
    {currentpage: 1,
      pageSize: 2,
    }
  );

  useEffect(() => {
    setIsResumeListLoad(true);
    apiService("/api/resume",
      null,
      API_Types_Enum.get_with_auth,
      (response) => {
        setResumelists(response["data"]);
      setIsResumeListLoad(false);
      setErrorResumeList(null);
    },
      (err) => {
        console.log(err.response.data.msg);
        setIsResumeListLoad(false);
        setErrorResumeList(err.response.data.msg);
      });
  }, []);

  const handleRemoveResume = async (idval) => {
   
    apiService("/api/resume",
    { id: idval },
    API_Types_Enum.delete_with_auth,
    (response) => {console.log(response);
     
      setErrorResumeDel(null);
      console.log(resumelist);
      const del = resumelist.filter(resume => idval !== resume._id)
      setResumelists(del);
    },
    (err) => {
      console.log(err.response);
    
      setErrorResumeDel(err.response.data);
    });
  };
  const handlePageChange = (page) => {
    setPageSetting({ ...pagesettings,currentpage: page });
  };

  const { length: count} = resumelist;
  const {
    pageSize,
    currentpage,
  } = pagesettings;


  
  
  
  if (errorResumeList) return <div className="alert alert-danger">Error: {errorResumeList}</div>;
  if (count === 0) return <span>There are no resumes in the database</span>;
 
  const resumes = paginate(resumelist, currentpage, pageSize);

    return (  <div className="row">
        <div className="col">
        {isResumeListLoad && <div className="alert alert-info "><strong>Loading...</strong></div>}
        
        {errorResumeDel && <div className="alert alert-danger">Error: {errorResumeDel}</div>}
          <span>User has {resumelist.length} resumes in the profile</span>
          <ResumeTable
            resume_detail={resumes}
            removeResume={handleRemoveResume}
          ></ResumeTable>
          <Pagination
            itemsCount={resumelist.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentpage}
          ></Pagination>
        </div>
      </div>
    );

  };



export default ResumeListing;
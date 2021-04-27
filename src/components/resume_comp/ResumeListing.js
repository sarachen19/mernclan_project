import React, { useState, useEffect } from 'react';
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import decode from 'jwt-decode';
import ResumeTable from './ResumeTable';
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";
import _ from 'lodash';

const ResumeListing = () => {
  const [resumelist, setResumelists] = useState([]);

//api validation code
const [isResumeListLoad, setIsResumeListLoad] = useState(false);
  const [errorResumeList, setErrorResumeList] = useState();

  
  const [errorResumeDel, setErrorResumeDel] = useState();

  const [pagesettings, setPageSetting] = useState(
    {currentpage: 1,
      pageSize: 3,
    }
  );
  const [sortsettings, setSortSetting] = useState(
    {path:'name',
      order: 'asc',
    }
  );

  useEffect(() => {
    let decodeduser = decode(sessionStorage.getItem('token'));
    let current_log_userid  = decodeduser.user.id;
    setIsResumeListLoad(true);
    apiService("/api/resume",
      null,
      API_Types_Enum.get_with_auth,
      (response) => {
     
        const current_user_data = response["data"].filter((resume) => resume.user === current_log_userid);
        setResumelists(current_user_data);
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
      const del = resumelist.filter((resume) => resume._id !== idval);
      
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

  const handleSort = sortColumn => {
    
    setSortSetting(sortColumn);
  };
//pagination and sorting logic
  const { length: count} = resumelist;
  const {
    pageSize,
    currentpage,
  } = pagesettings;

  const {
    path,
    order,
  } = sortsettings;

  
  
  
  if (errorResumeList) return <div className="alert alert-danger">Error: {errorResumeList}</div>;
  if (count === 0) return <span>There are no resumes in the profile</span>;

  const sorted = _.orderBy(resumelist,[path],[order])
 
  const resumes = paginate(sorted, currentpage, pageSize);

    return (  <div className="row">
        <div className="col">
        {isResumeListLoad && <div className="alert alert-info "><strong>Loading...</strong></div>}
        
        {errorResumeDel && <div className="alert alert-danger">Error: {errorResumeDel}</div>}
          <span>User has {resumelist.length} resumes in the profile</span>
          <ResumeTable
            resume_detail={resumes}
            sortColumn={sortsettings}
            removeResume={handleRemoveResume}
            onSort={handleSort}
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

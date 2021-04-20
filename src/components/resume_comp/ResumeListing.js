import React, { useState, useEffect } from 'react';
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import axios from 'axios';
import ResumeTable from './ResumeTable';

const ResumeListing = () => {
  const [resumelist, setResumelists] = useState([]);

  const [pagesettings, setPageSetting] = useState(
    {currentpage: 1,
      pageSize: 2,
    }
  );

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log(token);
    let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          };
    axios.get('http://localhost:5000/api/resume',config).then((response) => {
      setResumelists(response.data);
     // console.log(response);
    });
  }, []);

  const handleRemoveResume = async (idval) => {
    let token = localStorage.getItem('token');
    
    try {
            const response = await axios.delete(
              'http://localhost:5000/api/resume',
              { data: { id: idval },
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
              } },
              
            );
            console.log(response);
            console.log(resumelist);
          } catch (e) {
            console.log(e.response.data.errors);
          }
  };
  const handlePageChange = (page) => {
    setPageSetting({ ...pagesettings,currentpage: page });
  };

  const { length: count} = resumelist;
  const {
    pageSize,
    currentpage,
  } = pagesettings;


  
  if (count === 0) return <span>There are no resumes in the database</span>;
  const resumes = paginate(resumelist, currentpage, pageSize);

    return (  <div className="row">
        <div className="col">
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
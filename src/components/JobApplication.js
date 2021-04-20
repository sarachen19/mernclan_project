import React, { useState, useEffect } from "react";
import TableView from './TableView';
import apiService from './apiService';
import { apiCallURLS, API_Types_Enum } from "./DataConstants";

const JobApplication = () => {
    const [files, setFiles] = useState([]);
    const [jobApplications, setApplications] = useState([]);
    const tableHeaders = [{ organization: "Organization Name" }, { date: "Date Of Application" }];

    useEffect(() => {
        apiService(apiCallURLS.jobApplications,
            null,
            API_Types_Enum.get_with_auth,
            (response) => setApplications(response["data"]),
            (err) => console.log(err));
    }, []);
    return (
        <React.Fragment>
            <h4>Previous Job Applications</h4>
            <TableView datalist={jobApplications} tableHeaders={tableHeaders} addEditApplicationUrl={'/job-application/'} />
        </React.Fragment>
    );
}

export default JobApplication;
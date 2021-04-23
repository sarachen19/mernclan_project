import React, { useState, useEffect } from "react";
import TableView from './TableView';
import apiService from './apiService';
import { apiCallURLS, API_Types_Enum } from "./DataConstants";

const JobApplication = () => {
    const [files, setFiles] = useState([]);
    const [jobApplications, setApplications] = useState([]);
    const tableHeaders = [{ organization: "Organization Name" }, { transformedDate: "Date Of Application" }];

    useEffect(() => {
        apiService(apiCallURLS.jobApplications,
            null,
            API_Types_Enum.get_with_auth,
            (response) => {
                response["data"].map(app => {
                    var transformedDate = new Date(app.date);
                    app["transformedDate"] = transformedDate.toDateString();
                });
                setApplications(response["data"])
            },
            (err) => console.log(err));
    }, []);
    return (
        <React.Fragment>
            <h4>Previous Job Applications</h4>
            <TableView datalist={jobApplications} tableHeaders={tableHeaders} addEditApplicationUrl={'/job-application/'}
                deleteURL={apiCallURLS.jobApplications} />
        </React.Fragment>
    );
}

export default JobApplication;
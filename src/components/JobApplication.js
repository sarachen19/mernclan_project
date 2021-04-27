import React, { useState, useEffect } from "react";
import TableView from './TableView';
import apiService from './apiService';
import { apiCallURLS, API_Types_Enum } from "./DataConstants";

// Show all the job applications done, also plan for future job applications
const JobApplication = () => {
    // Array of job applications
    const [jobApplications, setApplications] = useState([]);
    // Table header json object for the generic table component.
    // *Key also used for choosing which columns to show from incoming data
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
            <h4>Job Applications Planner</h4>
            <TableView datalist={jobApplications} tableHeaders={tableHeaders} addEditApplicationUrl={'/job-application/'}
                deleteURL={apiCallURLS.jobApplications} />
        </React.Fragment>
    );
}

export default JobApplication;
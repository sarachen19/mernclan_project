import React, { useState, useEffect } from "react";
import FileUpload from './FileUpload';
import FileView from './FileViewer';
import TableView from './TableView';

const JobApplication = () => {
    const [files, setFiles] = useState([]);
    const [jobApplications, setApplications] = useState([
        { organizationName: "Humber", date: "28-Feb-2021" },
        { organizationName: "Google", date: "28-Feb-2021" },
        { organizationName: "Microsoft", date: "28-Feb-2021" }
    ]);
    const tableHeaders=["Organization Name","Date Of Application"];

    useEffect(() => {
        fetch('./sample.pdf')
            .then((data => {
                setFiles([{ name: data, type: "pdf" }]);
            }));
    }, []);
    return (
        <React.Fragment>
            <h4>Upload file</h4>
            <FileUpload fileChangeHandler={(e) => { setFiles(e.target.files) }} />
            <hr />
            <h4>Previous Job Applications</h4>
            <TableView datalist={jobApplications} tableHeaders={tableHeaders} />
            <hr />
            <h4>File Viewer</h4>
            {/* {files[0].name ? <FileView filePath={files[0].name} fileType={files[0].type.split('/')[1]} /> : null} */}
            {files[0] ? <FileView filePath={files[0].name} fileType={files[0].type} /> : null}
        </React.Fragment>
    );
}

export default JobApplication;
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FileUpload from '../FileUpload';
import FileView from '../FileViewer';
import apiService from '../apiService';
import { apiCallURLS, API_Types_Enum } from "../DataConstants";

const AddEditJobApplications = () => {
    const [files, setFiles] = useState([]);

    let { id } = useParams();
    let history = useHistory();
    const [job, setJob] = useState({ organizationName: "", dateOfApplication: new Date(19010101), documents: [] });
    useEffect(() => {
        if (id !== '0') {
            apiService(apiCallURLS.jobApplications + '/' + id,
                null,
                API_Types_Enum.get_with_auth,
                (response) => setJob({ "organizationName": response["data"].organization, "dateOfApplication": response["data"].date, documents: response["data"].attachment }),
                (err) => console.log(err));
        }
    }, [id]);

    function validateForm() {
        return true;//job.documents.length > 0 && job.organizationName.length > 0 && job.dateOfApplication.length > 0;
    }

    function handleSubmit(event) {
        if (id === '0') {
            apiService(apiCallURLS.jobApplications,
                {
                    organization: job.organizationName,
                    date: job.dateOfApplication,
                    attachment: job.documents
                },
                API_Types_Enum.post_with_auth,
                () => history.push('/job-application'),
                (err) => console.log(err));
        } else {
            apiService(apiCallURLS.jobApplications,
                {
                    id: id,
                    organization: job.organizationName,
                    date: job.dateOfApplication,
                    attachment: job.documents
                },
                API_Types_Enum.put_with_auth,
                () => history.push('/job-application'),
                (err) => console.log(err));
        }
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <h4>Job</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="organizationName">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="organizationName"
                        value={job.organizationName}
                        onChange={(e) => setJob({ ...job, organizationName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="dateOfApplication">
                    <Form.Label>Date of applcation</Form.Label>
                    <Form.Control
                        type="dateOfApplication"
                        value={job.dateOfApplication}
                        onChange={(e) => setJob({ ...job, dateOfApplication: e.target.value })}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="documents">
                    <Form.Label>Attachments</Form.Label>
                    <Form.Control
                        type="documents"
                        value={job.documents}
                        onChange={(e) => setJob({ ...job, documents: e.target.value })}
                    />
                </Form.Group>
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Save
                </Button>
                <Button size="lg" onClick={() => { history.push('/job-application'); }}>
                    Cancel
                </Button>
            </Form>
            <h4>Upload file</h4>
            <FileUpload fileChangeHandler={(e) => { setFiles(e.target.files) }} />
            <hr />
            <h4>File Viewer</h4>
            {files[0] ? <FileView filePath={files[0].name} fileType={files[0].type} /> : null}
        </React.Fragment>
    );
}

export default AddEditJobApplications;
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FileUpload from '../FileUpload';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FileView from '../FileViewer';
import apiService from '../apiService';
import { apiCallURLS, API_Types_Enum } from "../DataConstants";
import firebase from "firebase";

const AddEditJobApplications = () => {
    // const [files, setFiles] = useState([]);
    const [fileProgress, setFileProgress] = useState(0);

    let { id } = useParams();
    let history = useHistory();
    const [job, setJob] = useState({ organizationName: "", dateOfApplication: new Date(19010101), documents: [] });
    useEffect(() => {
        if (id !== '0') {
            apiService(apiCallURLS.jobApplications + '/' + id,
                null,
                API_Types_Enum.get_with_auth,
                (response) => {
                    var transformedDate = new Date(response["data"].date);
                    setJob({ "organizationName": response["data"].organization, "dateOfApplication": transformedDate, documents: response["data"].attachment });
                    setViewer(response["data"].attachment[0].name);
                },
                (err) => console.log(err));
        }
    }, [id]);

    function validateForm() {
        return true;//job.documents.length > 0 && job.organizationName.length > 0 && job.dateOfApplication.length > 0;
    }

    function setViewer(url) {
        let frame = document.getElementById('iframe');
        if (frame == null) {
            var doc = document.createElement('iframe');
            doc.setAttribute("id", "iframe");
            doc.frameBorder = 0;
            doc.width = 400;
            doc.height = 400;
            doc.src = url;
            document.getElementById('pdfView').appendChild(doc);
        } else {
            frame.src = url;
        }
    }

    function uploadFiles(e) {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref(file.name);
        storageRef.put(file).on(
            "state_changed",
            snapshot => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setFileProgress(prog);
            },
            error => {
                console.log(error);
            },
            () => {
                storageRef.getDownloadURL().then(url => {
                    setViewer(url);
                    setJob({ ...job, documents: [{ "name": url, "type": file.type }] });
                    //setFiles([{ "name": url, "type": file.type }]);
                });
            }
        );

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
                    <Form.Label>Date of application</Form.Label>
                    <Form.Control
                        type="date"
                        value={job.dateOfApplication}
                        defaultValue={job.dateOfApplication}
                        onChange={(e) => setJob({ ...job, dateOfApplication: e.target.value })}
                    />
                </Form.Group>
                {/* <Form.Group size="lg" controlId="documents">
                    <Form.Label>Attachments</Form.Label>
                    <Form.Control
                        type="documents"
                        value={job.documents}
                        onChange={(e) => setJob({ ...job, documents: e.target.value })}
                    />
                </Form.Group> */}
                <h4>Upload file</h4>
                {fileProgress !== 100 ? <ProgressBar animated now={fileProgress} label={`${fileProgress}%`} max="100" /> : null}
                <FileUpload fileChangeHandler={uploadFiles} />
                <hr />
                <div id="pdfView"></div>
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Save
                </Button>
                <Button size="lg" onClick={() => { history.push('/job-application'); }}>
                    Cancel
                </Button>
            </Form>

            {/* {files[0] ?
                <React.Fragment>
                    <h4>File Viewer</h4>
                    <FileView filePath={files[0].name} fileType={files[0].type.split('/')[1]} />
                </React.Fragment>
                : null} */}
        </React.Fragment>
    );
}

export default AddEditJobApplications;
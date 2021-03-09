import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeleteJournal from './DeleteJournal';
import EditJournal from './EditJournal';
import ReactDOM from "react-dom";
import { NavLink, Link } from "react-router-dom";
const AddedJournal = () => {
    const [videos, setVideos] = useState([]);
useEffect(() => {
    axios.get('/content.json').then((response) => {
        setVideos(response.data);
    });
}, []);

return (
    <div>
        {videos.map((ct) => (
            <InnerContent ct={ct} key={ct.id} />
        ))}
    </div>
);
}

const InnerContent = (props) => {
return (
    <div class="shadow p-3 mb-5 bg-white rounded">
            <h1>{props.ct.title}</h1>
            <p>{props.ct.journal}</p>
            <p>{props.ct.date}</p>

            <NavLink to="../components/journal/EditJournal"> <button type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark">
        Edit</button></NavLink>
        <NavLink to="../components/journal/DeleteJournal"> <button type="button" className="btn btn-outline-danger" data-mdb-ripple-color="dark"  >
        Delete</button></NavLink>
</div>
    );
};

export default AddedJournal;
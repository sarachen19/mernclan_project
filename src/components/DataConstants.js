//Constants 

const API_Types_Enum = Object.freeze({
    "get": 1,
    "get_with_auth": 2,
    "post": 3,
    "post_with_auth": 4,
    "put": 5,
    "put_with_auth": 6,
    "delete": 7,
    "delete_with_auth": 8
});
const backendURL = "https://mern-clan.herokuapp.com";
const apiCallURLS = Object.freeze({
    "authentication": "/api/auth",
    "jobApplications": "/api/jobApplications"
});

export { API_Types_Enum, backendURL, apiCallURLS }
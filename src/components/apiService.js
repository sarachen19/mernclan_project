import axios from 'axios';
import { API_Types_Enum, backendURL } from './DataConstants';

const apiService = (callURL, apiData, apiType, successCallBack, failCallBack) => {
    switch (apiType) {
        case API_Types_Enum.get:
            axios.get(backendURL + callURL).then(response => {
                successCallBack(response);
            }).catch(error => {
                failCallBack(error);
            });
            break;
        case API_Types_Enum.get_with_auth:
            axios.get(backendURL + callURL, {
                headers: {
                    "x-auth-token": sessionStorage.getItem('token')
                }
            }).then(response => {
                successCallBack(response);
            }).catch(error => {
                failCallBack(error);
            });
            break;
        case API_Types_Enum.post:
            axios.post(backendURL + callURL, apiData).then(response => {
                successCallBack(response);
            }).catch(error => {
                failCallBack(error);
            });
            break;
        case API_Types_Enum.post_with_auth:
            axios.post(backendURL + callURL, apiData, {
                headers: {
                    "x-auth-token": sessionStorage.getItem('token')
                }
            }).then(response => {
                successCallBack(response);
            }).catch(error => {
                failCallBack(error);
            });
            break;
        case API_Types_Enum.put_with_auth:
            axios.put(backendURL + callURL, apiData, {
                headers: {
                    "x-auth-token": sessionStorage.getItem('token')
                }
            }).then(response => {
                successCallBack(response);
            }).catch(error => {
                failCallBack(error);
            });
            break;
        case API_Types_Enum.delete_with_auth:
            axios.delete(backendURL + callURL, {
                headers: {
                    "x-auth-token": sessionStorage.getItem('token')
                },
                data: apiData
            }).then(response => {
                successCallBack(response);
            }).catch(err => failCallBack(err));
            break;
        default:
            break;
    }
}

export default apiService;
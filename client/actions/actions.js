import axios from 'axios';

// Exporting our actions
export const LOADING_PROJECTS = 'LOADING_PROJECTS';
export const GET_PROJECTS = 'GET_PROJECTS';
export const LOADING_CVS = 'LOADING_CVS';
export const GET_CVS = 'GET_CVS';

// An action to check if the projects are loaded accepts true or false
export function loadingProjects(loading) {
    return {
        type: LOADING_PROJECTS,
        payload: loading,
    };
}

export function loadingCvs(loading) {
    return {
        type: LOADING_CVS,
        payload: loading,
    };
}


// This will get the projects from the API
export function fetchProjects(data) {
    return {
        type: GET_PROJECTS,
        payload: data,
    };
}
// This will get the cvs from the API
export function fetchCvs(data) {
    return {
        type: GET_CVS,
        payload: data,
    };
}
// This is a redux thunk that will fetch our model data
export function projectsFetchData(url) {
    return (dispatch) => {
        const request = axios.get(url);
        request.then((response) => {
            dispatch(loadingProjects(false));
            dispatch(fetchProjects(response.data.project));
        });
    };
}

export function cvsFetchData(url) {
    return (dispatch) => {
        const request = axios.get(url);
        request.then((response) => {
            dispatch(loadingCvs(false));
            dispatch(fetchCvs(response.data.cv));
        });
    };
}
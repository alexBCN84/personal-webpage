import {
    combineReducers
} from 'redux';
import getProjects from './project_actions/get_projects.js';
import loadingProjects from './project_actions/loading_projects.js';
import getCvs from './cv_actions/get_cvs.js';
import loadingCvs from './cv_actions/loading_cvs.js';


const reducers = combineReducers({
    projects: getProjects,
    cvs: getCvs,
    loadProjects: loadingProjects,
    loadCvs: loadingCvs
});

export default reducers;
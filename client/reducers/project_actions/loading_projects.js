import {
    LOADING_PROJECTS
} from '../../actions/actions';

export default function loadingProjects(state = true, action) {
    switch (action.type) {
        case LOADING_PROJECTS:
            return action.payload;
    }
    return state;
}
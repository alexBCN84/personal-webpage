import {
    GET_PROJECTS
} from '../../actions/actions';

export default function getProject(state = {}, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return action.payload
    }
    return state;
}
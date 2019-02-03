import {
    LOADING_CVS
} from '../../actions/actions';

export default function loadingProjects(state = true, action) {
    switch (action.type) {
        case LOADING_CVS:
            return action.payload;
    }
    return state;
}
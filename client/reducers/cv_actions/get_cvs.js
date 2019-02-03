import {
    GET_CVS
} from '../../actions/actions';

export default function getCv(state = {}, action) {
    switch (action.type) {
        case GET_CVS:
            return action.payload
    }
    return state;
}
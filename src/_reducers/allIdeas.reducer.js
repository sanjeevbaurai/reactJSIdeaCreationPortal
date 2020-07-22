import { userConstants } from '../_constants';

export function allIdeas(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETALLIDEAS_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETALLIDEAS_SUCCESS:
        return {
          allIdeas: action.data
          };
    case userConstants.GETALLIDEAS_FAILURE:
        return [];    
    default:
      return state
  }
}
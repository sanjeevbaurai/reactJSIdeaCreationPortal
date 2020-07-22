import { userConstants } from '../_constants';

export function ideaFor(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETIDEAFOR_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEAFOR_SUCCESS:
        return {
          ideaFor: action.data
          };
    case userConstants.GETIDEAFOR_FAILURE:
        return [];    
    default:
      return state
  }
}
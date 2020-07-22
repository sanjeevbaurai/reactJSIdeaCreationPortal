import { userConstants } from '../_constants';

export function savedIdeas(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETSAVEDIDEA_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETSAVEDIDEA_SUCCESS:
        return {
          savedIdeas: action.data
          };
    case userConstants.GETSAVEDIDEA_FAILURE:
        return [];    
    default:
      return state
  }
}
import { userConstants } from '../_constants';

export function ideaTheme(state = {}, action) {
  switch (action.type) {
  
    case userConstants.GETIDEATHEME_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEATHEME_SUCCESS:
        return {
          ideaTheme: action.ideaTheme
          };
    case userConstants.GETIDEATHEME_FAILURE:
          return [];  
                
    default:
      return state
  }
}
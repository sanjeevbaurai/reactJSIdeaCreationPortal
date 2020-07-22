import { userConstants } from '../_constants';

export function submitIdeas(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETSUBMITTEDIDEA_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETSUBMITTEDIDEA_SUCCESS:
        return {
          submitIdeas: action.data
          };
    case userConstants.GETSUBMITTEDIDEA_FAILURE:
        return [];    
    default:
      return state
  }
}
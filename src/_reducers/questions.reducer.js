import { userConstants } from '../_constants';

export function questions(state = {}, action) {
  switch (action.type) {
    case userConstants.GETQUESTIONS_REQUEST:
    return {
        loading: true
      };
    case userConstants.GETQUESTIONS_SUCCESS:
    return {
        items: action.securityQuestions
      };
    case userConstants.GETQUESTIONS_FAILURE:
      return [];
    default:
      return state
  }
}
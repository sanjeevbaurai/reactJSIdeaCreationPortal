import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { ideaClassification } from './ideaClassification.reducer';
import { ideaStatusList } from './ideaStatus.reducer';
import { ideaTheme } from './ideaTheme.reducer';
import { accounts } from './accounts.reducer';
import { addAccount } from './addAccount.reducer';
import { deleteAccount } from './deleteAccount.reducer';
import { locations } from './location.reducer';
import { addClassification } from './addClassification.reducer'
import {approveIdeas} from './ideaApproval.reducer';
import {trackingIdeas} from './ideaTracking.reducer';
import { submitIdeas } from './ideaSubmmited.reducer';
import { savedIdeas } from './ideaSaved.reducer';
import { allIdeas } from './allIdeas.reducer';
import { ideaFor } from './ideaFor.reducer';
import { users } from './users.reducer';
import { changePassword } from './changePassword.reducer';
import { forgotPassword } from './forgotPassword.reducer';
import { userList } from './userList.reducer';
import { accountRequest } from './accountRequest.reducer';
import { accountNotifications } from './accountNotification.reducer';
import { accountUserList } from './accountUserList.reducer';
import { userInfo } from './userInfo.reducer';
import { accountApproval } from './approvalforAccountAccess';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  changePassword,
  forgotPassword,
  ideaClassification,
  accounts,
  addAccount,
  deleteAccount,
  ideaTheme,
  ideaStatusList,
  locations,
  ideaFor,
  addClassification,
  approveIdeas,
  trackingIdeas,
  submitIdeas,
  savedIdeas,
  allIdeas,
  userList,
  accountRequest,
  accountNotifications,
  accountUserList,
  userInfo,
  accountApproval,
  alert
});

export default rootReducer;
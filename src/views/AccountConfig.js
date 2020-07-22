import React, {Component} from 'react';


import '../assets/css/AccountConfig.css';
import UserRoles from '../components/UserRoles';
import { connect } from 'react-redux';
import IdeaService from '../Services/Idea.service';
import { userActions } from '../_actions';
import Loader from '../components/Loader';
import { compose } from 'redux';


const ideaService = new IdeaService()

class AccountConfig extends Component {

    state = {
        accounts: [],
        accountName: '',
        role: 'admin',
        customerSuccessMeasures: [ ],
        addedUsers: [
        
        ],
        successMeasureName: '',
        userEmail: '',
        emailError: false
    }

    componentDidMount =() =>{
        const {accounts, user,accountUserList} =this.props;
        const {addedUsers} =this.state;
          this.setState({userId:user.recordId});
			let selectedAccount = accounts.accounts[0];
           
            this.setState({accountId:selectedAccount.recordid});
            //const userRole=this.props.user.role;
      
            if(userRole !== null && userRole !=="Regular" && userRole !=="regular" && userRole !== undefined){
                this.interval = setTimeout(() => {	
                this.props.dispatch(userActions.getAccountList());
                this.props.dispatch(userActions.getUserList(selectedAccount.recordid));
                accountUserList.userList && accountUserList.userList.length>0 && accountUserList.userList.map((user) => {
                    addedUsers.push({"recordid":user.recordId, "loginId":user.loginId});
                });
                console.log(accountUserList, addedUsers)
                },500);
                console.log("accountUserList", accountUserList)
              // this.setState({userList:accountUserList[0]});
            }
            const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; 
            if(userRole !== null && userRole !=="Regular" && userRole !=="regular" && userRole !=="manager" && userRole !== undefined){
                this.interval = setTimeout(() => {	
                    this.props.dispatch(userActions.getIdeaTheme(selectedAccount.recordid)); 
                    
                }, 500);
            }
            
    }

    handleSelectBox = (e) => {
		//const name = e.target.name;1
		//this.setState({ [name]: e.target.value, isValid: isFormValid });
		const { name, value } = e.target;
        const {accounts,accountUserList}=this.props;
        const addedUsers =[];
        const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; 
       if(name==='accountName'){
			let selectedAccount = accounts.accounts.filter(account => {
				return account.accountName === value;
            });
            this.setState({accountId:selectedAccount[0].recordid});
               this.interval = setTimeout(() => {
                    if(userRole !== null && userRole !=="Regular" && userRole !=="regular" && userRole !=="manager" && userRole !== undefined){
                            this.props.dispatch(userActions.getIdeaTheme(selectedAccount[0].recordid));         
                      
                    }
                if(userRole !== null && userRole !=="Regular" && userRole !=="regular" && userRole !== undefined){
                       this.props.dispatch(userActions.getUserList(selectedAccount[0].recordid));
                       accountUserList.userList && accountUserList.userList.length>0 && accountUserList.userList.map((user) => {
                         addedUsers.push({"recordid":user.recordId, "loginId":user.loginId});
                    });
                    this.setState({addedUsers});
                    }
                },500);
              // this.setState({userList:accountUserList[0]});
            
        }
    }
		
	

    componentWillMount = () => {
		
        this.interval = setTimeout(() => {
       //  this.getAccountList();
          }, 500);
      }
      componentWillUnmount = () => {
        this.cancelTokenSource && this.cancelTokenSource.cancel()
    } 

   

    addAccount = (e) => {
        e.preventDefault();
        let { accountName } = this.state;
        const {accounts} =this.props;

        const accountExist = accounts.accounts.find(acc => acc.toString().toLocaleLowerCase() === accountName.toString().toLocaleLowerCase());

        if (accountExist || !accountName) {
            return
        }
       //accounts.push(this.state.accountName);
      setTimeout(() => {
        this.props.dispatch(userActions.addAccount(accountName)); 
        this.props.dispatch(userActions.getAccountList());
     },500);
  //   this.getAccountList();
    }

    addCustomerSuccessMeasures = () => {
        let { customerSuccessMeasures, successMeasureName } = this.state;
        const successMeasureExist = customerSuccessMeasures.find(csm => csm.toLocaleLowerCase() === successMeasureName.toLocaleLowerCase());

        if (successMeasureExist || !successMeasureName) {
            return
        }
        customerSuccessMeasures.push(successMeasureName);

        this.setState({ customerSuccessMeasures })
    }

    accountRequest =(e)=>{
         const  { reasonForRequest, accountId, userId }= this.state;
        
         console.log("reasonForRequest", reasonForRequest, "accountId", accountId, "userId", userId)
         if (reasonForRequest) {
                  setTimeout(() => {
                    this.props.dispatch(userActions.requestForAccountAccess(userId, accountId, reasonForRequest));
                 },500);
            
        } else {
            alert('Please enter reason for account request')
        }
    }

    addUser = (e) => {
        e.preventDefault();
        let { addedUsers, userEmail } = this.state;
        const result = this.validateEmail(userEmail);

        if (!result) {
            this.setState({ emailError: true });
            return
        } else {
            this.setState({ emailError: false })
        }

        const userExists = addedUsers.find(user => {
            const result = (user.toLocaleLowerCase() === userEmail.toLocaleLowerCase());
            return result;
        });
        if (userExists || !userEmail) {
            return
        }
        addedUsers.push(userEmail);
        this.setState({ addedUsers })
    }

    removeAccount = (e) => {
        e.preventDefault();
        let { accountName } = this.state;
        const {accounts}=this.props;
       // console.log(accountName)
        const account = accounts.accounts.find(item => item.accountName.toString().toLocaleLowerCase() === accountName.toString().toLocaleLowerCase());
       // console.log(account)
        if (account) {
            if (window.confirm(`Are you sure you want to remove ${accountName} account from the database`)) {
               // accounts.accounts = accounts.filter(account => account.accountName.toString().toLocaleLowerCase() !== accountName.toString().toLocaleLowerCase());
               // ideaService.deleteAccount(accountName);
              //  let response=null;
                // setTimeout(() => {
                //     this.getAccountList();
                //     },250);
                   // console.log(response); 
                  // this.setState({ accounts })
                  setTimeout(() => {
                    this.props.dispatch(userActions.deleteAccount(accountName)); 
                    this.props.dispatch(userActions.getAccountList());
                 },500);
            }
        } else {
            alert('Cannot able to find this account')
        }
    }

    removeUser = () => {
        let { addedUsers, userEmail } = this.state;
        const user = addedUsers.find(user => user.toLocaleLowerCase() === userEmail.toLocaleLowerCase());

        if (user) {
            if (window.confirm(`Are you sure you want to remove ${user} from user list`)) {
                addedUsers = addedUsers.filter(user => user.toLocaleLowerCase() !== userEmail.toLocaleLowerCase());

                this.setState({ addedUsers })
            }
        } else {
            alert('Cannot able to find this user')
        }
    }

    removeCustomerSuccessMeasures = () => {
        let { customerSuccessMeasures, successMeasureName } = this.state;
        const successMeasure = customerSuccessMeasures.find(successMeasure => successMeasure.toLocaleLowerCase() === successMeasureName.toLocaleLowerCase());

        if (successMeasure) {
            if (window.confirm(`Are you sure you want to remove ${successMeasure} success measure from the database`)) {
                customerSuccessMeasures = customerSuccessMeasures.filter(customerSuccessMeasures => customerSuccessMeasures.toLocaleLowerCase() !== successMeasure.toLocaleLowerCase());

                this.setState({ customerSuccessMeasures })
            }
        } else {
            alert('Cannot able to find this success measure')
        }
    }

    validateEmail = (email) => {
        var re = /\S+@gmail+\.\S+/;
        return re.test(email);
    }

    render() {
        const { role, customerSuccessMeasures, addedUsers, emailError } = this.state;
        const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ;      
        const {accounts,ideaTheme, accountUserList,user} =this.props;
        const {loading}= accounts;
        return (
            <div className="accountConfig row">
                <div className="column col-sm-4 col-md-4 col-lg-4 pr-0">
                    <div className="accountContainer selectAccount input-group mb-3" >
                        <h3>Account</h3>
                        {/* <select >
                            {accounts && accounts.accounts && accounts.accounts.map((account, i) => <option key={i}>{account.accountName}</option>)}
                        </select> */}
                        <select  name="accountName"  onChange={(e) => {
                                    this.handleSelectBox(e)}//this.handleChange)}
                                }>
                                 {accounts && accounts.accounts && accounts.accounts.map((account, i) => {
                                    return (
                                        <option key={i}>{account.accountName}</option>	
                                    )
                                })}
                    </select> 
                    </div>
                   {userRole !==null && userRole !=="Regular" && userRole !=="regular" && userRole !=="manager" && <div className="accountContainer addAccount input-group mb-3">
                        <h3>Add Account</h3>
                        <div className="inner-container " id="addAccount">
                            <form className="addRemove">
                                <input name="accountName" onChange={(e) => this.setState({ accountName: e.target.value })}
                                 placeholder="Add or Remove"/>
                                <div className="btnContainer">
                                    <button name="addAccount" type="button" onClick={this.addAccount} disabled={userRole === 'admin' ? false : true}>Add</button>
                                    <button name="removeAccount" type="button" onClick={this.removeAccount} disabled={userRole === 'admin' ? false : true}>Remove</button>
                                </div>
                            </form>
                            {loading ? <Loader /> :
                            <ul className="accountList">
                                { accounts && accounts.accounts.length>0 && accounts.accounts.map((account, i) => <li key={i}>{account.accountName}</li>) }
                            </ul>
                             }
                        </div>
                    </div>
                   }
                    { userRole !==null && userRole !=="Regular" && userRole !=="regular" && userRole !=="Manager" && userRole !=="manager" && <div className="accountContainer  addCustomerValues input-group mb-3">
                        <h3>Customer Success Measures</h3>
                        <div className="inner-container" id="customerSuccess">
                            <div className="addRemove">
                                <input name="SuccessMeasures" onChange={(e) => this.setState({ successMeasureName: e.target.value })}
                                placeholder="Add or Remove"/>
                                <div className="btnContainer">
                                    <button name="add" type="button" onClick={this.addCustomerSuccessMeasures}>Add</button>
                                    <button name="remove" type="button" onClick={this.removeCustomerSuccessMeasures}>Remove</button>
                                </div>
                            </div>
                            <ul className="accountList">
                                { userRole !==null && userRole !=="Regular" && userRole !=="regular" && ideaTheme && ideaTheme.ideaTheme && ideaTheme.ideaTheme.map((successMeasures, i) => {
                                    return (<li key={i}>{ successMeasures.custSuccessMeasuresName }</li>)
                                }) }
                            </ul>
                        </div>
                    </div>   
                    }                   
                </div> 
                <div className="column col-5  col-sm-5 col-md-5 col-lg-5 ">
                    <div className="accountContainer  accessRequest input-group mb-3 d-flex justify-content-end" >
                                    <h3>Enter reason for access request and click submit</h3>
                                    <textarea name="reasonForRequest" onChange={(e) => this.setState({ reasonForRequest: e.target.value })} placeholder="Enter reasonn for access request" length="150"></textarea>
                                    <button type="submit" onClick={this.accountRequest}>Submit</button>
                    </div>
                    { userRole !==null && userRole !=="Regular" && userRole !=="regular" &&  <div className="accountContainer  addUser input-group mb-3">
                        <h3>Add User</h3>
                        <div className="inner-container" id="addUser">
                            <div className="addRemove">
                                <input name="userEmail" type="email" onChange={(e) => this.setState({ userEmail: e.target.value })} placeholder="Add or Remove"/>
                                <div className="btnContainer">
                                    <button name="add" type="button" onClick={this.addUser}>Add</button>
                                    <button name="remove" type="button" onClick={this.removeUser}>Remove</button>
                                </div>
                            </div>
                            {emailError ? <div className="error">! Please enter a valid gmail email address</div> : ''}
                            <ul className="accountList" ref="list">
                            {/* {accountUserList && accountUserList.userList>0 && accountUserList.userList.map((user, i) => <li key={i}>{user.loginId}</li>)} */}
                            {addedUsers.map((user, i) => <li key={i}>{user.loginId}</li>)}
                            </ul>
                        </div>
                    </div>  
                    }   
                </div> 
                   <div className="column col-3  col-sm-3 col-md-3 col-lg-3 ">
                        { userRole !==null && userRole !=="Regular" && userRole !=="regular" &&  <div className="userRoles accountContainer">         
                                    <h3>Roles</h3>    <UserRoles /> 
                        </div> }
                         <div className="activeAccount">
                            <h3>Active Account</h3>  
                            <ul> 
                            {accounts && accounts.accounts && accounts.accounts.map((account, i) => {
                                        return (
                                            <li key={i}>{account.accountName}</li>	
                                        )
                                    })}
                            </ul>       
                        </div>
                </div>   
                
            </div>
        )
    }
}
//export default AccountConfig;

function mapStateToProps(state) {
    const { users, authentication, accounts, ideaTheme, accountUserList } = state;
    const { user } = authentication;
    return {
        user,
        users,
        accounts,
        ideaTheme,
        accountUserList
    };
}

const connectedAccountConfig = connect(mapStateToProps)(AccountConfig);
export { connectedAccountConfig as AccountConfig };
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from  '../components/Layout';
import {Sidebar} from '../components/SideBar';
import '../assets/css/Header.css';
import { UserInfo } from '../components/UserInfo';
import {Notifications} from '../components/Notifications';
import Loader from '../components/Loader';
import { userActions, alertActions } from '../_actions';


class HomePage extends React.Component {
    constructor(props)
      {
          super(props);
         this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
            ];
            this.state={
                showModal:false,
                userRole:'',
                notifications:[],
                loading:false
             
            }
        const { dispatch } = this.props;
       
        this.warn = this.warn.bind(this);
        this.logout = this.logout.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);

        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
        }
        //console.log("props", props.user.role);//.authentication.user.role
        this.setTimeout()
    }
   componentWillMount() {
      this.interval = setTimeout(() => {
        const { user } = this.props;
        const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; //this.props.user.role;//userService.getUserDetail().role;
        this.setState({userRole});
        {userRole != null && (userRole ==="Manager" || userRole ==="manager")  &&
            this.props.dispatch(userActions.fetchAccountRequestNotification(user.recordId));
            const notifications=this.props.accountNotifications; 
            this.setState(notifications)
            console.log("notifications",  this.props.accountNotifications.notification)
          }
        this.props.dispatch(userActions.getAccountList()); 
        this.props.dispatch(userActions.getIdeaClassification()); 
        this.props.dispatch(userActions.getIdeaLocation());
        this.props.dispatch(userActions.getIdeaFor());
        this.props.dispatch(userActions.getAdditionalClassification());
        this.props.dispatch(userActions.getIdeaStatus('Admin')); 

      },500);
    }

    handleDeleteUser(id) {
      //  return (e) => this.props.dispatch(userActions.delete(id));
    }
    
    clearTimeout() {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);
        
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
      }
      
      setTimeout() {
          this.warnTimeout = setTimeout(this.warn, 1*60 * 1000);
          this.logoutTimeout = setTimeout(this.logout, 29*60 * 1000);
      }
      
      resetTimeout() {
        this.clearTimeout();
        this.setTimeout();
      }
      
      warn() {
        //alert("You will be logged out automatically in 1 minute.");
        console.log("You will be logged out automatically in 1 minute.");
      }
      
      logout() {
      // Send a logout request to the API
        console.log("Sending a logout request to the API...");
       
       // this.setState({ showModal: true });
        this.destroy(); // Cleanup
        localStorage.clear();
        window.location.href = '/inactive';
       
      }
     
      
      destroy() {
        this.clearTimeout();
        
        for (var i in this.events) {
          window.removeEventListener(this.events[i], this.resetTimeout);
        }
      }
    render() {
       // const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; //this.props.user.role;//userService.getUserDetail().role;
       const { user, users, accounts } = this.props;
       const { showModal, userRole } = this.state;
       const notifications=this.props.accountNotifications ? this.props.accountNotifications: null; 
        return (
            <div>
              <div className="App-header">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-3 d-flex justify-content-center align-items-start flex-column">
                            <a href="https://www.google.com" target="_blank">
                                <div className="header-logo"></div>
                                <div className="value-creation"></div>
                            </a>                       
                        </div>
                        <div className="headerName col-6 d-flex justify-content-start align-items-center">
                         <a href="/" >Idea Generation Portal </a>
                        </div>
                        
                        <div className="notify col-1 d-flex align-items-center justify-content-end">
                        {userRole != null && (userRole ==="Manager" || userRole ==="manager")
                             &&  notifications && notifications.accountNotifications &&  <Notifications  notifications={notifications.accountNotifications} accounts={accounts} />}
                        </div>
                        <div className="UserInfo col-2 d-flex align-items-center justify-content-start">
                        <UserInfo />
                        </div>
                    </div>
                </div>
            </div>
              <Sidebar />
              
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication,accountNotifications,accounts } = state;
    const { user } = authentication;
    return {
        user,
        users,
        accountNotifications,
        accounts
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
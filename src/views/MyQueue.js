import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/MyQueue.css';
import StatusTracking from '../components/StatusTracking';
import MyApproval from '../components/MyApproval';
import MyIdeas from '../components/MyIdeas';
import Idea from '../components/Idea';
import SavedIdea from '../components/SavedIdea';
import ApprovedIdea from '../components/ApprovedIdea';
import IdeaService from '../Services/Idea.service';
import  UserService  from '../Services/user.service';

import { userActions, alertActions } from '../_actions';
import Loader from '../components/Loader';

const ideaService = new IdeaService();

const userService = new UserService();

class MyQueue extends Component {
 constructor(props){
     super(props);
     this.state = {
        myIdeas: true,
        myApproval: false,
        statusTracking: false,
        active: 'myIdeas',
        loading:false
    }
 }
 

    componentWillMount() {
        this.interval = setTimeout(() => {
            const  {account,recordId}=this.props.user;
            const userRole= this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; 
            const myapproval="MYApproval";
            const StatusTracking="StatusTracking";
            const submitIdea="SUBMIT";
            const savedIdea="SAVE";
            this.props.dispatch(userActions.fetchSubmittedIdea(recordId,submitIdea));
            this.props.dispatch(userActions.fetchSavedIdea(recordId,savedIdea));
            if(userRole !== null && userRole !=="Regular" && userRole !=="regular"){
                this.props.dispatch(userActions.fetchIdeasforApproval(userRole,account,myapproval));
                this.props.dispatch(userActions.fetchIdeasforTracking(userRole,account,StatusTracking)); 
            }
           
            },500);
      }
    tableToggle = (e) => {
        const tab = e.target.value;
        let state = this.state;

        if (this.state.active === tab) {
            return
        }

        for (let prop in state) {
            if (prop !== tab) {
                state[prop] = false
            }
        }
        this.setState({ [tab]: !this.state[tab], active: tab });
    }

    render() {
        const { myIdeas, myApproval, statusTracking, active,loading } = this.state;
       const {submitIdeas, savedIdeas,approveIdeas,trackingIdeas }= this.props;
  
        const userRole=this.props.user.role;
        const userAccount= this.props.user.account;
       // console.log(userAccount, submitIdeas, savedIdeas)
        return (
            <Router>
            <div>
            
               <div className="myQueue">
                 <div className="tabs">
                    <button value="myIdeas" title="My Ideas" className={ active === 'myIdeas' ? 'active' : '' } onClick={this.tableToggle}>My Ideas</button>
                    { userRole !=='Regular' && <button value="myApproval" title="My Approval" className={ active === 'myApproval' ? 'active' : '' } 
                    onClick={this.tableToggle}>My Approval</button> }
                    { userRole !=='Regular' &&
                    <button value="statusTracking" title="Status Tracking"
                        className={ active === 'statusTracking' ? 'active' : '' } 
                            onClick={this.tableToggle}>Status Tracking</button>
                    }      
                </div>
                    <div className="accordian">
                        { myIdeas  ?  <MyIdeas  submitIdeas={submitIdeas} savedIdeas={savedIdeas.savedIdeas}/>: '' }
                        { userRole !=='Regular' && userRole !=='regular' &&  myApproval ? <MyApproval  approveIdeas={approveIdeas.approveIdeas} userRole={userRole}  userAccount={userAccount}/> : ''}
                        { userRole  !=='Regular' &&  userRole !=='regular' && statusTracking ? <StatusTracking  trackingIdeas={trackingIdeas.trackingIdeas}  userRole={userRole}  userAccount={userAccount}/> : ''}
                    </div>
               </div>
               <Route path="/MyQueue/Idea/:id" component={Idea}></Route>
               <Route path="/MyQueue/SavedIdea/:id" component={SavedIdea}></Route>
               <Route path="/MyQueue/ApproveIdea/:id" component={ApprovedIdea}></Route>
            </div>
            </Router>
        )
    }
}


  function mapStateToProps(state) {
    const { authentication, savedIdeas, submitIdeas,approveIdeas,trackingIdeas} = state;
    const { user } = authentication;
    return {
        user,
        savedIdeas,
        submitIdeas,
        approveIdeas,
        trackingIdeas
    };
  }
  
  const connectedMyQueue = connect(mapStateToProps)(MyQueue);
  export { connectedMyQueue as MyQueue };
import React, { Component, Fragment } from 'react';
import notifications from '../data/notifications.json';

import { connect } from 'react-redux';
import Popover from 'react-simple-popover';
import { userActions, alertActions } from '../_actions';

class Notifications extends Component{
    constructor(props) {
        super(props);
       
        this.state = {
            display: 'none',
            open: false,
            notificationList: null
        };
        this.handleClick = this.handleClick.bind(this);
        const { dispatch } = this.props;
    }
    componentDidMount(){
    //     this.interval = setTimeout(() => {
    //     const  { notifications }= this.props;
    //     const abc  = notifications.filter(function(obj) { 
    //         return accounts.indexOf(obj.recordId==) == -1; 
    //     });
    //     )
    // },500);
    
    }
    // handleClick() {
    //     var show = this.state.display == 'none' ? 'block' : 'none';
    //     this.setState({
    //         display: show
    //     });
    // }
// if manager approves the request
approveRequest = (e) => {
    //recordId=2&userId=2&accountId=2&action=APPROVE/
    e.preventDefault();
   // this.props.dispatch(userActions.managerApprovalForAccountAccess(recordId,accountId,action));
}
// if manager reject the request
rejectRequest = (e) => {
    e.preventDefault();
   // this.props.dispatch(userActions.managerApprovalForAccountAccess(recordId,accountId,action));
}

    handleClick(e) {
        this.setState({open: !this.state.open});
      }
     
      handleClose(e) {
        this.setState({open: false});
      }

render() {
    const { notifications, accounts }= this.props;
    console.log("notifications in component", notifications, accounts)
        return(
            <div className="box">
                    <div className="notifications">
                            <div className="notifications-tab-icon" onClick= {this.handleClick}></div>
                            <span className="nav-item__title" onClick= {this.handleClick}>Notifications</span>
                            <span className="num" onClick= {this.handleClick}>{notifications.length}</span>
                            <div className="notification_box">
                                {/* <Fragment>
                                <ul>
                                    {notifications.map(item => (
                                       <li className="icon" key={item.id}>
                                        <span className="icon"><i className="fa fa-user"></i></span>
                                        <span className="text">{item.text}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </Fragment> */}

                            <Popover
                                placement='bottom'
                                container={this}
                                target={this.refs.target}
                                show={this.state.open}
                                onHide={this.handleClose.bind(this)} >
                                
                                <Fragment>
                                <ul>
                                        <div id="notification_title">
                                          <h6>Notifications</h6>
                                        </div>      
                                    {notifications.map((item,i) => (
                                       <li className="icon" key={i}>
                                      
                                       <a href="#">
                                            <span className="text">{} has requested access to {} account  '{item.reason}'</span>
                                            <br></br><br></br>
                                            <div id="actions" className="d-flex justify-content-between">
                                            {/* <span className="texTime">{item.time}</span> */}
                                                {/* <img className="loadingIndicator img" src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/0_KqJAcnl8J.gif" alt="" width="16" height="11" />  */}
                                                <button className="btn btn-approve "  onClick={this.approveRequest}  type="submit">Approve</button>
                                                <button className="btn btn-reject float-right"  onClick={this.rejectRequest}  type="submit" >Reject</button>
                                            </div>
                                        </a>
                                        </li>
                                    ))}
                                    </ul>
                                </Fragment>  
                            </Popover>
                        </div>
                </div>
            </div>
        );
    };
};
  
//export default Notifications;

function mapStateToProps(state) {
    const { users, authentication,accountNotifications } = state;
    const { user } = authentication;
    return {
        user,
        users,
        accountNotifications
    };
}

const connectedNotifications = connect(mapStateToProps)(Notifications);
export { connectedNotifications as Notifications };
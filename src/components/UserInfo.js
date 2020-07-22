import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Popover from 'react-simple-popover';
import { alertActions } from '../_actions';
import { history } from '../_helpers';


class UserInfo extends Component {
      constructor(props)
      {
          super(props);
          this.state={
            firstName:"",
            open: false
          };
          const { dispatch } = this.props;
          history.listen((location, action) => {
              // clear alert on location change
              dispatch(alertActions.clear());
          });
         
      }
     
      componentDidMount() {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty("user")) {
            // get the key's value from localStorage
              let value = localStorage.getItem("user");
      
              // parse the localStorage string and setState
              try {
                value = JSON.parse(value);
                this.setState({ firstName: value.fName });
              } catch (e) {
                // handle empty string
                this.setState({ firstName: value.fName });
              }
          }
          
        }
     
     handleClick(e) {
        this.setState({open: !this.state.open});
      }
     
      handleClose(e) {
        this.setState({open: false});
      }

   
    render() {
        return (
            <div className="userInfoPopup">
                        <a
                            href="javascript:void(0)"
                            className="button"
                            ref={(node) => { this.target = node }}
                            onClick={this.handleClick.bind(this)}>Hello, {this.state.firstName}</a>
                            <Popover
                                placement='bottom'
                                container={this}
                                target={this.refs.target}
                                show={this.state.open}
                                onHide={this.handleClose.bind(this)} >
                                <ul>
                                   <li><Link to="/">Edit profile</Link></li>
                                   <li><Link to="/login">Logout</Link></li>                          
                                </ul>   
                            </Popover>
                            
                    </div>

        )
    }
}
//export default UserInfo;

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(UserInfo);
export { connectedApp as UserInfo }; 
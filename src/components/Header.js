import React, {Component} from 'react';
import '../assets/css/Header.css';
import { UserInfo } from './UserInfo';
import Notifications from './Notifications';

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="headerName col-9 d-flex justify-content-center align-items-center">Idea Generation Portal</div>
                        
                        {/* <div className="notifcations col-1 d-flex align-items-center justify-content-end">
                                
                        </div> */}
                        <div className="UserInfo col-3 d-flex align-items-center justify-content-center">
                        <Notifications /> <UserInfo />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;
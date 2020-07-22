
import {Sidebar} from './SideBar';
import React, {Component} from 'react'
// import Header from './Header';
// import Footer from './Footer';
// import Login from '../views/LoginPage';
class Layout extends Component {
    render() {
        return (
            <div className="layout">
                {/* <Header /> */}
                <Sidebar/>
                {/* <Login /> */}
                {/* <Footer /> */}
            </div>
        )
    }
}

export default Layout;
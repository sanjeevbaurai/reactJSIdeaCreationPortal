import React, {Component} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/SideBar.css';

// import Header from './Header';
import Footer from './Footer';
import Routing from '../Routing/Routing';

import  UserService  from '../Services/user.service';

const user = new UserService()

class Sidebar extends Component{

  constructor(props){
    super(props)
    this.state={
      active: 'dashboard'
    };
  }
  
  handleClick = (menuItem) =>  { 
    this.setState({ active: menuItem });
  }

  render() {
    
    const activeStyle = { 
         boxShadow: '0 12px 20px -10px rgba(62, 80, 82, 0.28), 0 4px 20px 0 rgba(62, 80, 82, 0.28), 0 7px 8px -5px rgba(62, 80, 82, 0.28)',
         backgroundColor: '#1E90FF'
    };
    //const userRole=this.props.user.role;//user.getUserDetail().role;
    const userRole= this.props.user && this.props.user.userRoleAccount.length>0 ? this.props.user.userRoleAccount[0].roleName: null ; //this.props.user.role;//userService.getUserDetail().role;
 
    const linkStyle={
      color: '#fff'
    }
    return (
      <Router>
        <div  className="sideBar">    
          <div className="leftNavBar">
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item" style={this.state.active === 'dashboard' ? activeStyle : {}}>
                <Link  style={this.state.active === 'dashboard' ? linkStyle : {}} onClick={this.handleClick.bind(this, 'dashboard')} to="/">Dashboard</Link>
              </li>
              <li className="nav-item" style={this.state.active === 'ideasubmit' ? activeStyle : {}}>
                <Link style={this.state.active === 'ideasubmit' ? linkStyle : {}}  onClick={this.handleClick.bind(this, 'ideasubmit')} to="/IdeaSubmit">Submit an Idea</Link>
              </li>
              <li className="nav-item" style={this.state.active === 'valueadds' ? activeStyle : {}}>
                <Link style={this.state.active === 'valueadds' ? linkStyle : {}} onClick={this.handleClick.bind(this, 'valueadds')}  to="/ValueAdds">Value Adds</Link>
              </li>
              <li className="nav-item" style={this.state.active === 'myqueue' ? activeStyle : {}}>
                <Link style={this.state.active === 'myqueue' ? linkStyle : {}} onClick={this.handleClick.bind(this, 'myqueue')}  to="/MyQueue">My Queue</Link>
              </li>
             <li className="nav-item" style={this.state.active === 'accountconfig' ? activeStyle : {}}>
                <Link  style={this.state.active === 'accountconfig' ? linkStyle : {}} onClick={this.handleClick.bind(this, 'accountconfig')} to="/AccountConfig">Account Configuration</Link>
              </li> 
              <li className="nav-item"  style={this.state.active === 'About' ? activeStyle : {}}>
                <Link style={this.state.active === 'About' ? linkStyle : {}}  onClick={this.handleClick.bind(this, 'About')} to="/About">About</Link>
              </li>
            </ul>
            </nav>
          </div>

          {/* <div className="right-panel column" id="backgroundImg"> */}
          <div className="right-panel column">
          {/* <Header /> */}
            <div className="container ml-0">
              <Routing  routeChangeHandler={this.handleClick}/>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

//export default Sidebar;
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedSidebar = connect(mapStateToProps)(Sidebar);
export { connectedSidebar as Sidebar };
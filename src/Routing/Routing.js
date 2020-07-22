import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { history } from '../_helpers';
import Dashboard from '../views/Dashboard';
import { IdeaSubmit} from '../views/IdeaSubmit';
import {ValueAdds} from '../views/ValueAdds';
import {AccountConfig} from '../views/AccountConfig';
import AboutUs from '../views/AboutUs';
import { MyQueue } from '../views/MyQueue';
import '../assets/css/SideBar.css';


import { PrivateRoute } from '../_components';

const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Dashboard/>
    },
    {
      path: "/IdeaSubmit",
      main:  () => <IdeaSubmit/>
    },
    {
      path: "/ValueAdds",
      main:  () => <ValueAdds/> 
    },
    {
      path: "/AccountConfig",
      main:  () => <AccountConfig/> 
    },
    {
      path: "/About",
      main:  () => <AboutUs/>
    },
    {
      path: "/MyQueue",
      main:  () => <MyQueue/> 
    }
  ];


 class Routing extends Component {

    render () {
      return (
        <React.Fragment>
          {routes.map((route, index) => (
            <PrivateRoute history={history}
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </React.Fragment>
      )
    }
 }

 export default Routing;
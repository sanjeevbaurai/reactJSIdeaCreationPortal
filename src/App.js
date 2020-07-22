// import React, { Component } from 'react';
// import Layout from  './components/Layout';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <Layout />
//     );
//   }
// }

// export default App;

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import  AboutUs   from './views/AboutUs';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ForgetPassword } from './ForgetPassword';
import { ChangePassword } from './ChangePassword';
import { InactivePage } from './InactivePage';



class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="app">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Switch>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <Route path="/ForgetPassword" component={ForgetPassword} />
                                    <Route path="/ChangePassword" component={ChangePassword} />
                                    <Route path="/inactive" component={InactivePage} />
                                    <PrivateRoute exact path="/" component={HomePage} />
                                </Switch>
                            </div>
                        </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import  '../assets/css/LoginForm.css';
import SignUpForm from '../components/SignUpForm';

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <SignUpForm />
            </div>
        )
    }
}
export default SignUp;
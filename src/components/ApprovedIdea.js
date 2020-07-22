import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/Idea.css';
import PopupScreen from './PopupScreen';
import {IdeaDetailsForm} from './IdeaDetailsForm';
import Loader from './Loader';
import ApprovedIdeaForm from './ApprovedIdeaForm';

const api = {
    idea: 'https://valuecreation-api.herokuapp.com/idea/'
}

const linkStyle = {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '18px',
    borderStyle: 'none',
    marginLeft: '15px',
    padding: '4px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 500,
    background: '#3399ff',
    position: 'absolute',
    top: 2,
    right: 2
}

class ApprovedIdea extends Component {

  state = {
      idea: this.props.location.idea,
      loading: false,
      error: null
  }

  componentWillMount = () => {
     if (!this.state.idea)  {
         this.fetchIdea()
     }
  }

  fetchIdea = async () => {
    const id = this.props.match.params['id'];
    this.cancelTokenSource = axios.CancelToken.source();
      
    try {
        this.setState({ loading: true });
        const response = await axios.get(`${api.idea}${id}`, {
            CancelToken: this.cancelTokenSource.token
        });
        this.setState({ idea: response.data, loading: false });
    } catch (err) {
        if (axios.isCancel(err)) {
            this.setState({ error: null })
        } else {
            this.setState({ error: err, loading: false })
        }
    } finally {
        this.cancelTokenSource = null;
    }
  }

  componentWillUnmount = () => {
      this.cancelTokenSource && this.cancelTokenSource.cancel()
  }
  
  render() {
    const { idea, loading } = this.state;

    return (
     <div className="idea">
        <PopupScreen>
            <div>
                <h2>Approve Idea</h2>
            </div>
            { loading ? <Loader /> : idea &&  <ApprovedIdeaForm idea={idea}/> }
            <Link to="/MyQueue" title="close" style={linkStyle}>X</Link>
        </PopupScreen>
      </div>
    );
  };
}
export default ApprovedIdea;
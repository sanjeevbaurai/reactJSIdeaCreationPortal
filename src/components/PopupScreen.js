import React, { Component } from 'react';

import '../assets/css/PopupScreen.css';

class PopupScreen extends Component{
  
  render() {
    return (
     <div className='wrapper'>
        <div className='custom-modal'>
            {this.props.children}
        </div>
      </div>
    );
  };
}
  
export default PopupScreen;
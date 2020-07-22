import React, {Component} from 'react'
import VcfChat from './VcfChat';
import Popup from "reactjs-popup";
 

class InfoBot extends Component {
    
 render() {
            return ( 
                <Popup trigger={<button> Chat </button>} position="top center">
                    <VcfChat />
                </Popup>
            )
        }
    }
  export default InfoBot;
  
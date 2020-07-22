import React, {Component} from 'react'
import  InfoBot  from './InfoBot';
import '../assets/css/Footer.css';
class Footer extends Component {
    constructor(props)
    {
        super(props);
        this.state={
          open: false
        };
       
    }
    handleClick(e) {
        this.setState({open: !this.state.open});
      }
     
      handleClose(e) {
        this.setState({open: false});
      }
    render() {
        return (
            <div className="App-footer container-fluid InfoBot">
            <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4 d-flex justify-content-end InfoBot ">
                           <InfoBot />
                 </div>
                 </div>
            </div>
        )
    }
}
export default Footer;
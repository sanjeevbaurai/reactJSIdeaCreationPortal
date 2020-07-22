import React, {Component} from 'react';


class UploadIdea extends Component {
    render() {
        return (
            <div className="innerContainer" style={{ flex:2 }}>
               <div className="formField">
                    <span>Upload attachment: 
                        <input name="attachment" className="attachment" type="file" multiple="multiple"/>
                   </span>
               </div>
            </div>
        )
    }
}
export default UploadIdea;
import React, {Component} from 'react';

import '../assets/css/AdditionalInfo.css';

class AdditionalInfo extends Component {

    render() {
        const { ideaFor,addClassification, location, ideaTheme}= this.props;
        console.log(addClassification)
        return (
            <div className="innerContainer" style={{ flex:3 }}>
                <h3 className="heading">Additional Information</h3>
                <ul>
                    <li className="form-row">
                        <label>Idea for: </label>
                        <select defaultValue="-- select --" name="ideaFor" className="selectbox">
                            <option disabled> -- select -- </option>
                            {ideaFor.length>0 && ideaFor.map((option,i) => {
                            return (
                                <option key={i}>{option.ideaForName}</option>
                            )
                        })}
                        </select>
                    </li>
                    <li className="form-row">
                        <label>Generic/Account Specific: </label>
                        <select defaultValue="-- select --" name="accSpecific" className="selectbox">
                            <option disabled> -- select -- </option>
                            {addClassification.length>0 &&  addClassification.map((option,i) => {
                            return (
                                <option key={i}>{option.addIdeaClassificationName}</option>
                            )
                        })}
                        </select>
                    </li>
                    <li className="form-row">
                        <label>Location: </label>
                        <select defaultValue="-- select --" name="location" className="selectbox">
                            <option disabled> -- select -- </option>
                            {location.length>0 && location.map((option,i) => {
                            return (
                                <option key={i}>{option.locationName}</option>
                            )
                        })}
                        </select>
                    </li>
                    <li className="form-row">
                        <label>Idea Theme: </label>
                        <select defaultValue="-- select --" name="theme" className="selectbox">
                            <option disabled> -- select -- </option>
                            {ideaTheme && ideaTheme.map((option,i) => {
                            return (
                                <option key={i}>{option.custSuccessMeasuresName}</option>
                            )
                        })}
                        </select>
                    </li>
                    <li className="form-row">
                        <label>Cost Benefit Done: </label>
                        <select defaultValue="-- select --" name="costBenefitDone" className="selectbox">
                            <option disabled> -- select -- </option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </li>
                    
                    {/* <li className="form-row">
                        <label>Submitted By*: </label>
                        <select defaultValue="-- select --" name="userId" className="selectbox">
                            <option disabled> -- select -- </option>
                            <option>Mahant</option>
                            <option>Sriram</option>
                            <option>Asad</option>
                        </select>
                    </li> */}
                </ul>
            </div>
        )
    }
}
export default AdditionalInfo;
import React, {Component} from 'react';

class IdeaClassfiication extends Component {
    state = {
        selectedOption: null,
        classification: '',
        accountName: '',
        isclassificationValid: true,
        isAccountNamdValid: true
    }

    isFormValid = (classification, accountName) => {
        const isclassificationValid = classification ? true : false;
        const isAccountNamdValid = accountName ? true : false;
        this.setState({ isAccountNamdValid, isclassificationValid})
    }

    render() {
        const { classificationList, accountList, requiredData, submitted }= this.props;
        return (
            <div className="innerContainer ideaClassPanel" style={{ flex:2 }}>
                <h4 >Idea Classfication*</h4> 
                <div className={'form-group' + (submitted && !requiredData.classification ? ' has-error' : '')}>
                    <div className="ideaClassification" style={{ width: '100%' }}>
                        <select defaultValue="-- select --" name="classification" className="selectbox" style={{ width: '100%' }} onChange={(e) => {
                                this.props.handleSelectBox(e)}
                            }>
                            <option disabled> -- select -- </option>
                            {classificationList.length>0 && classificationList.map((option,i) => {
                                return (
                                    <option key={i}>{option.classificationName}</option>
                                )
                            })}
                        </select>
                        {/* {this.state.isclassificationValid ? '' : <div className="error">Information is required!</div> } */}
                        {submitted && !requiredData.classification &&
                                                <div className="help-block">Classfication is required</div>
                                            }
                    </div>
                </div> 
                <h4 >Account*</h4>
                <div className={'form-group' + (submitted && !requiredData.accountName ? ' has-error' : '')}>
                    <div className="ideaClassification" style={{ width: '100%' }}>
                        <select defaultValue="-- select --" name="accountName" className="selectbox" style={{ width: '100%' }} onChange={(e) => {
                                this.props.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option disabled> -- select -- </option>
                            {accountList.length>0 && accountList.map((option,i) => {
                                return (
                                    <option key={i}>{option.accountName}</option>
                                )
                            })}
                        </select>
                        {submitted && !requiredData.accountName &&
                                                <div className="help-block">Account name is required</div>
                                            }
                    </div>
                </div>

                <h4 style={{ color: "black" }}>Hardware requirements</h4> 
                <textarea name="hardwareReq" className="ideaClassification" maxLength={100} placeholder="100 characters or less, should not be generic" />
                <h4 style={{ color: "black" }}>Software requirements</h4> 
                <textarea name="softwareReq" className="ideaClassification" maxLength={100} placeholder="100 characters or less, should not be generic" />
            </div>
        )
    }
}
export default IdeaClassfiication;
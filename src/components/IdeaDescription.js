import React, {Component} from 'react';
import axios from 'axios';
import { file } from '@babel/types';

//import UploadIdea from './UploadIdea';


class IdeaDescription extends Component {
    state = {
        files: [],
        error: false
    }
    render() {
        const  { requiredData, submitted }= this.props;
        const {files, error } = this.state;
        console.log(files.length, 'files')
        return (
            <div style={{ flex:3 }}>
            <div className={'form-group' + (submitted && !requiredData.title ? ' has-error' : '')}>
                <div className="formField" id="title">
                    <label className="col-form-label">Title* : &nbsp; </label>
                    <input name="title"  style={{ width: "86%" }}   
                    onChange={(e) => {
                                this.props.handleSelectBox(e)}} />
                </div>
                {submitted && !requiredData.title &&
                                                <div className="help-block">Title field is required</div>
                                            }
            </div>
                <div className="innerContainer borderLine">
                    <div className="ideaInitialSection">
                         <div className={'form-group' + (submitted && !requiredData.problem ? ' has-error' : '')}>
                            <div className="problemSection">
                                <span>Problem* : </span> 
                                <textarea name="problem" maxLength={100}  placeholder="100 characters or less, should not be generic"  rows={8} 
                                onChange={(e) => {
                                    this.props.handleSelectBox(e, this.isFormValid)}}/>
                                {submitted && !requiredData.problem &&
                                    <div className="help-block"> Problem field is required</div>
                                 }
                            </div>
                        </div> 
                        <div className="solutionSection">
                            <span>Solution: </span>
                            <textarea name="solution" maxLength={100} placeholder="100 characters or less, should not be generic"  rows={8} />
                        </div>
                        <div className="benefitSection">
                            <span>Benefit: </span>
                            <textarea name="benefit" maxLength={100} placeholder="100 characters or less, should not be generic"  rows={8} />
                        </div>
                    </div>
                    <div className="ideaDescSection">
                        <div className={'form-group' + (submitted && !requiredData.detailedDesc ? ' has-error' : '')}>
                            <span>Detail Description* : </span>
                            <textarea name="detailedDesc" maxLength={1000} placeholder="Describe your idea in 1000 characters or less" rows={8} 
                            onChange={(e) => {
                                this.props.handleSelectBox(e, this.isFormValid)}} />
                                {submitted && !requiredData.detailedDesc &&
                                                <div className="help-block"> Detail Description field is required</div>
                                            }
                    </div>     
                   </div> 
                    <div className="innerContainer" style={{ flex:2 }}>
                        <div className="formField">
                                <input  name="attachment" className="attachment" ref="attachment" type="file" multiple="multiple" hidden="hidden"  onChange={(e) => { 
                                        const files = e.target.files;
                                        if (files.length <= 3) {
                                            const filelist = [];
                                            for (let i = 0; i < files.length; i++) {
                                                filelist.push(files[i])
                                            }
                                            this.setState({ error: false })
                                            this.setState({ files: filelist })
                                        } else {
                                            this.setState({ error: true })
                                        }
                                    } }/>
                                <button type="button" onClick={ () => {
                                    this.refs.attachment.click()
                                } }>Choose a File</button>
                
                                { files.length > 0 ? <div> { files.length > 1 ? <ul className="file-list">
                                    { files.map(file => <li><span> X </span> { file.name }</li>) }
                                        </ul> : <ul><li>{files[0].name}</li></ul> } </div> : <span> No file chosen, yet</span> }

                                <div className="error">{ error ? "!Not allowed to submit more than 3 files": "" }</div>
                        </div>
                    </div>              
                </div>
            </div>
        )
    }
}
export default IdeaDescription;
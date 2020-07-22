import React, {Component} from 'react';
import axios from 'axios';

import '../assets/css/MyIdeas.css';
import data from '../data/IdeaFields.json';
import '../assets/css/valueAdds.css';
import SubmittedIdeas from './SubmittedIdeas';
import SavedIdeas from './SavedIdeas';
import Loader from '../components/Loader';
import IdeaService from '../Services/Idea.service';

const ideaService = new IdeaService()

class MyIdeas extends Component {
	constructor(props) {
		super(props);

		this.state = {
			submitIdeas: [],
			savedIdeas: [],
			active: 'submittedIdeas',
			submittedIdeasToggle: true,
			savedIdeasToggle: false,
			error: null,
			loading: false
		};
	}

	componentDidMount = () => {
		this.interval = setTimeout(() => {
			//this.getIdeas();
		},250);
	}

	// getIdeas = (ideaType) => {
		
	// 	let state = this.state;
	// 	setTimeout(() => {
	// 		 if(ideaType=="SAVE"){
	// 			ideaService.fetchIdeas(ideaType)
	// 			.then(value => {
	// 				this.setState({ savedIdeas: value.ideas, error: value.error, loading: value.loading })
	// 			})
	// 		 }
	// 		 else{
	// 			ideaService.fetchIdeas("SUBMIT")
	// 			.then(value => {
	// 				this.setState({submitIdeas : value.ideas, error: value.error, loading: value.loading })
	// 			})
	// 		 }

	// 	},500);
	// }

	tableToggle = (e) => {
		this.setState({ loading: true });
		const tab = e.target.name;
		let ideaType="SUBMIT";
		let state = this.state;
		if (state.active === tab) {
			return
		}

		if (tab === 'submittedIdeas') {
			state['submittedIdeasToggle'] = true;
			state['savedIdeasToggle'] = false;
			ideaType="SAVE";
		//	this.getIdeas("SAVE");
		} else {
			state['savedIdeasToggle'] = true;
			state['submittedIdeasToggle'] = false;
			ideaType="SUBMIT";
//			this.getIdeas("SUBMIT");
		}
		//this.getIdeas(ideaType);
        this.setState({ ...state, active: tab });
	}
	
	componentWillUnmount = () => {
        this.cancelTokenSource && this.cancelTokenSource.cancel()
    }
	  
	render() {
		const { submittedIdeasToggle, savedIdeasToggle,  active} = this.state;
		const { submitIdeas,savedIdeas}=this.props;//this.state.submitIdeas;// || this.props.submitIdeas;
		console.log(submitIdeas)
		const loading = submitIdeas.loading;//this.state.loading;//(submitIdeas.loading )?true:false;//|| this.props.loading;
		console.log(loading)
		return (
			<div className="myIdeas">
				{loading ? <Loader /> : <div className="content">
					<h2>My Ideas</h2>
					<button title="Submitted Ideas" name="submittedIdeas" className={ active === 'savedIdeas' ? 'active' : '' } onClick={this.tableToggle}>Submitted Ideas</button>
					<button title="Saved Ideas" name="savedIdeas" className={ active === 'submittedIdeas' ? 'active' : '' } title="Saved Ideas" onClick={this.tableToggle}>Saved Ideas</button>
					{ submittedIdeasToggle ? <SubmittedIdeas submittedIdeas={submitIdeas.submitIdeas} ideaFields={data.SubmittedIdeas}/> : ''}
					{ savedIdeasToggle ? <SavedIdeas ideas={savedIdeas} ideaFields={data.SavedIdeas}/> : ''}	
				</div> }
			</div>
		);
	}
}
export default MyIdeas;
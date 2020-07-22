import React, {Component} from 'react';


class FlipCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newNum: (new Date).getSeconds() === 0 ? 60 : (new Date).getSeconds(),
			oldNum: (new Date).getSeconds() - 1 === -1 ? 59 : (new Date).getSeconds() - 1,
			change: true
		}
	}
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			50
		);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		const newNum = ((new Date).getSeconds()) === 0 ? 60 : ((new Date).getSeconds());
		if( this.state.newNum !== newNum) {
			const oldNum = newNum - 1 === 0 ? 60 : newNum - 1;
			const change = !this.state.change;
			this.setState({
				newNum,
				oldNum,
				change
			});
		}
	}
	
	render() {
		const { newNum, oldNum, change} = this.state;
		const animation1 = change ? 'fold' : 'unfold';
		const animation2 = !change ? 'fold' : 'unfold';
		const number1 = change ? oldNum : newNum;
		const number2 = !change ? oldNum : newNum;
		
		return(
			<div className="d-flex justify-content-center">
				<div className={'flipCounter'}>
					<div className={'upperCard'}>
						<span>{newNum}</span>
					</div>
					<div className={'lowerCard'}>
						<span>{oldNum}</span>
					</div>
					<div className={`flipCard first ${animation1}`}>
						<span>{number1}</span>
					</div>
					<div className={`flipCard second ${animation2}`}>
						<span>{number2}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default FlipCounter;
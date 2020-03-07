import React from 'react';

import SmallButton from '../Buttons/SmallButton';

class CurrentGames extends React.Component {
	constructor(props) {
		super(props);
		this.doThis = this.doThis.bind(this);
	}
	doThis = e => {
		e.preventDefault();
	};

	render() {
		return (
			<div style={outterBox}>
				<div id={this.props.gameToken} style={innerBox}>
					<p>Game Name: {this.props.gameName}</p>
					<div onClick={this.doThis}>
						<SmallButton
							color={'#88368D'}
							text={'Join Game'}
							name={this.props.gameName}
							token={this.props.gameToken}
							gameid={this.props.gameID}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const outterBox = {
	backgroundColor: '#555555',
	border: '3px solid white',
	curser: 'pointer',
	margin: '20px',
	width: '350px'
};

const innerBox = {
	padding: '1px'
};

export default CurrentGames;

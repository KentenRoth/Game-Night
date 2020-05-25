import React from 'react';
import axios from 'axios';

import InGamePlayerCard from './InGamePlayerCard';

class InGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken'),
		};
	}

	componentDidMount() {
		const token = this.state.gameToken;
		// const gameID = this.state.gameID;
		const config = {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};
		axios.get(`/ingameuser`, config).then((res) => {
			this.setState({ players: res.data });
		});
	}

	saveGameInfo = (value) => {
		console.log(value);
	};

	render() {
		return (
			<div className="container">
				<div style={cards}>
					{this.state.players.map((player) => (
						<InGamePlayerCard
							key={player._id}
							players={player}
							saveGameInfo={this.saveGameInfo}
						/>
					))}
				</div>
			</div>
		);
	}
}

const cards = {
	margin: 'auto',
};

export default InGame;

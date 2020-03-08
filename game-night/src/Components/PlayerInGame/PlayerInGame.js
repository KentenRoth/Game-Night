import React from 'react';
import axios from 'axios';

import SmallButton from '../Buttons/SmallButton';

class PlayerInGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player: {},
			allPlayers: [],
			playerID: localStorage.getItem('playerID'),
			playerToken: localStorage.getItem('playerAuthToken'),
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken')
		};
	}

	componentDidMount() {
		const playerID = this.state.playerID;
		const playerToken = this.state.playerToken;
		const gameToken = this.state.gameToken;
		const configPlayer = {
			headers: {
				Authorization: 'Bearer ' + playerToken
			}
		};
		const configGame = {
			headers: {
				Authorization: 'Bearer ' + gameToken
			}
		};
		axios.get(`/ingameuser/${playerID}`, configPlayer).then(res => {
			console.log(res);
		});
		axios.get('/ingameuser', configGame).then(res => {
			console.log(res);
		});
	}

	render() {
		return (
			<div>
				<div></div>
			</div>
		);
	}
}

export default PlayerInGame;

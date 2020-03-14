import React from 'react';
import axios from 'axios';

import SmallButton from '../Buttons/SmallButton';
import PlayerInGameCard from './PlayerInGameCard';

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
			this.setState({ player: res.data });
		});
		axios.get('/ingameuser', configGame).then(res => {
			this.setState({ allPlayers: res.data });
		});
	}

	content = {
		display: 'flex',
		flexWrap: 'wrap'
	};

	render() {
		return (
			<div className="container">
				<div className="box">
					<div style={this.content}>
						{this.state.allPlayers.map(player => {
							if (this.state.player._id !== player._id) {
								return (
									<PlayerInGameCard
										players={player}
										key={player._id}
									/>
								);
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default PlayerInGame;

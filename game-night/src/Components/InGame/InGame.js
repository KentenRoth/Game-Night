import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import InGamePlayerCard from './InGamePlayerCard';

class InGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			players: [],
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken'),
		};
	}

	componentDidMount() {
		const token = this.state.gameToken;
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
		const name = value.name;
		const pin = value.pin;
		const config = {
			headers: {
				Authorization: 'Bearer ' + this.state.gameToken,
			},
		};

		axios
			.post(
				'/ingameuser',
				{
					name,
					pin,
				},
				config
			)
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem('playerAuthToken', res.data.authToken);
					this.setState({ redirect: true });
				}
			});
	};

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/PlayerInGame" />;
		}

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

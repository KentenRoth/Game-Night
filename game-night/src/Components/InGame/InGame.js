import React from 'react';
import axios from 'axios';

class InGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken')
		};
	}

	componentDidMount() {
		const token = this.state.gameToken;
		const gameID = this.state.gameID;
		const config = {
			headers: {
				Authorization: 'Bearer ' + token
			}
		};
		axios.get(`/ingameuser`, config).then(res => {
			this.setState({ players: res.data });
		});
	}
	render() {
		return <div></div>;
	}
}

export default InGame;
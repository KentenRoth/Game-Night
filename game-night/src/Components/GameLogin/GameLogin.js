import React from 'react';
import axios from 'axios';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';
import CurrentGamesCard from './CurrentGamesCard';

class GameLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			currentGames: []
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const token = localStorage.getItem('userAuthToken');
		const config = {
			headers: {
				Authorization: 'Bearer ' + token
			}
		};

		const userID = localStorage.getItem('userID');
		axios
			.get(`/user/${userID}`, config)
			.then(res =>
				this.setState({ currentGames: res.data.currentGames })
			);
	}

	onSubmit = e => {
		const name = e.target.name.value;
		const password = e.target.password.value;
		e.preventDefault();

		// on succesful login need to change screen to in game screen
		// have not built out in game screen yet
		axios
			.post('/game/login', {
				name,
				password
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					localStorage.setItem('gameID', res.data.game._id);
					localStorage.setItem('gameAuthToken', res.data.authToken);
				}
			});
	};
	render() {
		return (
			<div className="content">
				<div className="container">
					<div className="box">
						{this.state.currentGames.map(game => (
							<CurrentGamesCard
								key={game.gameName}
								gameName={game.gameName}
								gameToken={game.gameToken}
							/>
						))}

						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Game Name'}
								name={'name'}
							/>

							<Input
								type={'password'}
								place={'Password'}
								name={'password'}
							/>

							<LargeButton
								type={'submit'}
								color={'#88368D'}
								text={'Join Game'}
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default GameLogin;

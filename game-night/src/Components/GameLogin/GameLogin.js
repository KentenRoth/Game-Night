import React from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';
import CurrentGamesCard from './CurrentGamesCard';

class GameLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			currentGames: [],
			cardAppear: false,
			selectedInput: ''
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
		axios.get(`/user/${userID}`, config).then(res =>
			this.setState({
				currentGames: res.data.currentGames,
				cardAppear: true
			})
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
						<CSSTransition
							in={this.state.cardAppear}
							appear={true}
							timeout={1000}
							classNames={'fade'}
						>
							<div>
								{this.state.currentGames.map(game => (
									<CurrentGamesCard
										key={game.gameName}
										gameName={game.gameName}
										gameToken={game.gameToken}
									/>
								))}
							</div>
						</CSSTransition>
						<div>
							<CSSTransition
								in={this.state.fade}
								timeout={1000}
								classNames={'fade'}
							>
								<p>{this.state.selectedInput}</p>
							</CSSTransition>
						</div>
						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Game Name'}
								name={'name'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
							/>

							<Input
								type={'password'}
								place={'Password'}
								name={'password'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
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

	whatInput = e => {
		if (e.target.name === 'name') {
			return this.setState({
				selectedInput: 'Game Name',
				error: '',
				fade: true
			});
		}
		if (e.target.name === 'password') {
			return this.setState({
				selectedInput: 'Password',
				error: '',
				fade: true
			});
		}
	};

	clearInput = () => {
		return this.setState({ selectedInput: '', fade: false });
	};
}

export default GameLogin;

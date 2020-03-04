import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

class CreateGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/createplayer" />;
		}

		return (
			<div className="content">
				<div className="container">
					<div className="box">
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
								text={'Create Game'}
							/>
						</form>
						<Link to="/gamelogin">
							<LargeButton text={'Join Game'} color={'#0F76C0'} />
						</Link>
					</div>
				</div>
			</div>
		);
	}

	onSubmit(e) {
		const name = e.target.name.value;
		const password = e.target.password.value;
		e.preventDefault();
		axios
			.post('/game', {
				name,
				password
			})
			.then(res => {
				if (res.status === 201) {
					const gameAuthToken = res.data.authToken;
					localStorage.setItem('gameAuthToken', res.data.authToken);
					axios
						.patch(
							`/user/${userID}`,
							{
								currentGames: {
									gameName: name,
									gameToken: gameAuthToken
								}
							},
							config
						)
						.then(res => {
							if (res.status === 200) {
								this.setState({ redirect: true });
							}
						});
				}
			});
	}
}

const token = localStorage.getItem('userAuthToken');
const userID = localStorage.getItem('userID');

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

export default CreateGame;

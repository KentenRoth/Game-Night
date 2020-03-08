import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

class CreatePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			token: localStorage.getItem('gameAuthToken')
		};
		this.onSubmit = this.onSubmit.bind(this);
	}
	render() {
		const { redirect } = this.state;
		if (redirect) {
			return <Redirect to="/InGame" />;
		}
		return (
			<div className="content">
				<div className="container">
					<div className="box">
						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Player Name'}
								name={'name'}
							/>

							<Input
								type={'password'}
								place={'Pin Number'}
								name={'pin'}
							/>

							<LargeButton
								type={'submit'}
								color={'#88368D'}
								text={'Create Player'}
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}

	onSubmit(e) {
		const name = e.target.name.value;
		const pin = e.target.pin.value;
		const config = {
			headers: {
				Authorization: 'Bearer ' + this.state.token
			}
		};
		e.preventDefault();

		axios
			.post(
				'/ingameuser',
				{
					name,
					pin
				},
				config
			)
			.then(res => {
				if (res.status === 200) {
					localStorage.setItem('playerAuthToken', res.data.authToken);
					this.setState({ redirect: true });
				}
			});
	}
}

export default CreatePlayer;

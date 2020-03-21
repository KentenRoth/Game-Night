import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

class CreatePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			token: localStorage.getItem('gameAuthToken'),
			fade: false
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
						<div>
							<CSSTransition
								in={this.state.fade}
								timeout={1000}
								classNames={'fade'}
							>
								<p>{this.inputDisplay()}</p>
							</CSSTransition>
						</div>
						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Player Name'}
								name={'name'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
							/>

							<Input
								type={'password'}
								place={'Pin Number'}
								name={'pin'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
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

	whatInput = e => {
		return this.setState({
			selectedInput: e.target.name,
			error: '',
			fade: true
		});
	};

	inputDisplay = () => {
		switch (this.state.selectedInput) {
			case 'name':
				return (
					<div>
						<div style={this.title}>
							Player Name
							<p style={this.bullet}>2-20 characters</p>
						</div>
					</div>
				);
			case 'pin':
				return (
					<div>
						<div style={this.title}>
							Pin
							<p style={this.bullet}>4 digit number</p>
						</div>
					</div>
				);
			default:
				return <div></div>;
		}
	};

	clearInput = () => {
		return this.setState({ selectedInput: '', fade: false });
	};

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

	title = {
		fontSize: '20px'
	};

	bullet = {
		fontSize: '15px'
	};

	errorTags = {
		margin: '10px'
	};

	titleError = {
		color: 'red',
		fontSize: '20px'
	};

	bulletError = {
		color: 'red',
		fontSize: '15px'
	};
}

export default CreatePlayer;

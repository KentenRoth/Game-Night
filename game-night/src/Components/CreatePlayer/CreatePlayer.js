import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

function checkInputsBeforeSubmit(name, pin) {
	const isBetween = (num, min, max) => {
		return num >= min && num <= max;
	};
	console.log('running');

	let errors = [];

	const pinRegex = new RegExp('^[0-9]{4}$');

	if (isBetween(name.length, 2, 20) === false) errors.push('name');

	if (pinRegex.test(pin) === false) errors.push('pin');

	return errors;
}

class CreatePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			token: localStorage.getItem('gameAuthToken'),
			fade: false,
			errors: []
		};
		this.onSubmit = this.onSubmit.bind(this);
	}
	render() {
		const { redirect, errors } = this.state;
		if (redirect) {
			return <Redirect to="/InGame" />;
		}
		return (
			<div className="content">
				<div className="container">
					<div className="box">
						<div>
							{errors.map(error => this.errorDisplay(error))}
						</div>
						<CSSTransition
							in={this.state.fade}
							timeout={1000}
							classNames={'fade'}
						>
							{this.inputDisplay()}
						</CSSTransition>

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

	errorDisplay = error => {
		switch (error) {
			case 'name':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>
							Player Name
							<p style={this.bulletError}>2-20 characters</p>
						</div>
					</div>
				);
			case 'pin':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>
							Pin
							<p style={this.bulletError}>4 digit number</p>
						</div>
					</div>
				);
			default:
				return;
		}
	};

	clearInput = () => {
		return this.setState({ selectedInput: '', fade: false });
	};

	onSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const pin = e.target.pin.value;
		const config = {
			headers: {
				Authorization: 'Bearer ' + this.state.token
			}
		};
		const errors = checkInputsBeforeSubmit(name, pin);

		if (errors.length > 0) {
			this.setState({ errors });
			return;
		}

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

import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

function checkInputsBeforeSubmit(name, username, email, password, password2) {
	const isBetween = (num, min, max) => {
		return num >= min && num <= max;
	};

	let errors = [];
	const emailRegex = new RegExp(
		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	);
	const passwordRegex = new RegExp(
		'^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{5,15}$'
	);
	if (isBetween(name.length, 2, 20) === false) errors.push('name');

	if (isBetween(username.length, 2, 20) === false) errors.push('username');

	if (emailRegex.test(email) === false) errors.push('email');

	if (passwordRegex.test(password) === false) errors.push('password');

	if (password !== password2) errors.push('password2');

	return errors;
}

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fade: false,
			redirect: false,
			errors: [],
			selectedInput: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		const { redirect, errors } = this.state;

		if (redirect) {
			return <Redirect to="/creategame" />;
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
							<div>{this.inputDisplay()}</div>
						</CSSTransition>

						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Name'}
								name={'name'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
							/>
							<Input
								type={'text'}
								place={'Username'}
								name={'username'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
							/>
							<Input
								type={'text'}
								place={'Email'}
								name={'email'}
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
							<Input
								type={'password'}
								place={'Re-Enter Password'}
								name={'password2'}
								whatInput={this.whatInput}
								clearInput={this.clearInput}
							/>
							<LargeButton
								color={'#0F76C0'}
								text={'Create Account'}
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}

	whatInput = e => {
		return this.setState({ selectedInput: e.target.name, fade: true });
	};

	clearInput = () => {
		return this.setState({ selectedInput: '', fade: false });
	};

	inputDisplay = () => {
		switch (this.state.selectedInput) {
			case 'name':
				return (
					<div>
						<div style={this.title}>Name</div>
						<p style={this.bullet}>2-20 characters</p>
					</div>
				);

			case 'username':
				return (
					<div>
						<div style={this.title}>Username</div>

						<p style={this.bullet}>2-20 characters</p>
					</div>
				);

			case 'email':
				return <div style={this.title}>Email Address</div>;

			case 'password':
				return (
					<div>
						<div style={this.title}>Password</div>
						<p style={this.bullet}>5-15 characters</p>
						<p style={this.bullet}>1 letter</p>
						<p style={this.bullet}>1 number</p>
					</div>
				);

			case 'password2':
				return (
					<div>
						<div style={this.title}>Re-Enter Password</div>
						<p style={this.bullet}>Passwords must match</p>
					</div>
				);
			default:
				return;
		}
	};

	errorDisplay = error => {
		switch (error) {
			case 'name':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>Name</div>
						<p style={this.bulletError}>2-20 characters</p>
					</div>
				);

			case 'username':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>Username</div>

						<p style={this.bulletError}>2-20 characters</p>
					</div>
				);

			case 'email':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>Email Address</div>
					</div>
				);

			case 'password':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>Password</div>
						<p style={this.bulletError}>5-15 characters</p>
						<p style={this.bulletError}>1 letter</p>
						<p style={this.bulletError}>1 number</p>
					</div>
				);

			case 'password2':
				return (
					<div key={error} style={this.errorTags}>
						<div style={this.titleError}>
							Passwords Do Not Match
						</div>
					</div>
				);
			default:
				return;
		}
	};

	onSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const password2 = e.target.password2.value;
		const errors = checkInputsBeforeSubmit(
			name,
			username,
			email,
			password,
			password2
		);

		if (errors.length > 0) {
			this.setState({ errors });
			return;
		}

		axios
			.post('./user', {
				name,
				username,
				email,
				password
			})
			.then(res => {
				if (res.status === 201) {
					localStorage.setItem('userAuthToken', res.data.authToken);
					localStorage.setItem('userID', res.data.user._id);
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

export default SignUp;

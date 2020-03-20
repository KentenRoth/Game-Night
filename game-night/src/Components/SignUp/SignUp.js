import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			errors: [],
			selectedInput: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/creategame" />;
		}
		return (
			<div className="content">
				<div className="container">
					<div className="box">
						<div>{this.inputDisplay()}</div>
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
		return this.setState({ selectedInput: e.target.name, errors: [] });
	};

	clearInput = () => {
		return this.setState({ selectedInput: '' });
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
				break;
			case 'username':
				return (
					<div>
						<div styel={this.title}></div>
						Username
						<p style={this.bullet}>2-20 characters</p>
					</div>
				);
				break;
			case 'email':
				return <div style={this.title}>Email Address</div>;
				break;
			case 'password':
				return (
					<div>
						<div style={this.title}>Password</div>
						<p style={this.bullet}>5-15 characters</p>
						<p style={this.bullet}>1 letter</p>
						<p style={this.bullet}>1 number</p>
					</div>
				);
				break;
			case 'password2':
				return (
					<div>
						<div style={this.title}>Re-Enter Password</div>
						<p style={this.bullet}>Passwords must match</p>
					</div>
				);
		}
	};

	passwordCheck = () => {
		// ^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{5,15}$
	};

	onSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
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
}

export default SignUp;

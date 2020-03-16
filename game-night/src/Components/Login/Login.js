import React from 'react';
import axios from 'axios';
import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';
import { Redirect, Link } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
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
						<form onSubmit={this.onSubmit}>
							<Input
								type={'text'}
								place={'Email Address'}
								name={'email'}
								whatInput={this.whatInput}
							/>

							<Input
								type={'password'}
								place={'Password'}
								name={'password'}
								whatInput={this.whatInput}
							/>

							<LargeButton
								type={'submit'}
								color={'#88368D'}
								text={'Login'}
							/>
						</form>
						<Link to="/SignUp">
							<LargeButton color={'#0F76C0'} text={'Sign Up'} />
						</Link>
					</div>
				</div>
			</div>
		);
	}

	whatInput = e => {
		console.log(e.target.name);
	};

	onSubmit(e) {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		axios
			.post('/user/login', {
				email,
				password
			})
			.then(res => {
				if (res.status === 200) {
					localStorage.setItem('userID', res.data.user._id);
					localStorage.setItem('userAuthToken', res.data.authToken);
					this.setState({ redirect: true });
				}
			});
	}
}

export default Login;

import React from 'react';
import axios from 'axios';
import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';
import { Redirect, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fade: false,
			redirect: false,
			selectedInput: '',
			error: ''
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
						<div>
							<p style={this.error}>{this.state.error}</p>
						</div>
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
								place={'Email Address'}
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

	error = {
		color: 'red',
		fontSize: '20px'
	};

	whatInput = e => {
		if (e.target.name === 'email') {
			return this.setState({
				selectedInput: 'Email Address',
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
			})
			.catch(e => {
				this.setState({ error: 'Login Failed' });
			});
	}
}

export default Login;

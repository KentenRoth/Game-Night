import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

class SignUp extends React.Component {
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
			return <Redirect to="/creategame" />;
		}
		return (
			<div className="content">
				<div className="container">
					<div className="box">
						<form onSubmit={this.onSubmit}>
							<Input type={'text'} place={'Name'} name={'name'} />
							<Input
								type={'text'}
								place={'Username'}
								name={'username'}
							/>
							<Input
								type={'text'}
								place={'Email'}
								name={'email'}
							/>
							<Input
								type={'password'}
								place={'Password'}
								name={'password'}
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
}

export default SignUp;

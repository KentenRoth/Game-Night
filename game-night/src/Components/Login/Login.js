import React from 'react';
import axios from 'axios';
import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<div className="content">
			<div className="container">
				<div className="box">
					<form onSubmit={onSubmit}>
						<Input
							type={'text'}
							place={'Email Address'}
							name={'email'}
						/>

						<Input
							type={'password'}
							place={'Password'}
							name={'password'}
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

const onSubmit = e => {
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;
	axios
		.post('/user/login', {
			email,
			password
		})
		.then(res => console.log(res));
};
export default Login;

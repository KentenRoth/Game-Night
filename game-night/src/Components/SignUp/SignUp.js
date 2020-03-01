import React from 'react';
import axios from 'axios';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

const SignUp = () => {
	return (
		<div className="content">
			<div className="container">
				<div className="box">
					<form onSubmit={onSubmit}>
						<Input type={'text'} place={'Name'} name={'name'} />
						<Input
							type={'text'}
							place={'Username'}
							name={'username'}
						/>
						<Input type={'text'} place={'Email'} name={'email'} />
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
};

const onSubmit = e => {
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
		.then(res => console.log(res));
};

export default SignUp;

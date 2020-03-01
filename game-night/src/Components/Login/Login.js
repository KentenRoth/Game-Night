import React from 'react';
import axios from 'axios';
import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

function Login() {
	return (
		<div className="content">
			<div className="container">
				<div styles={box}>
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
					<LargeButton color={'#0F76C0'} text={'Sign Up'} />
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

const box = {
	justifyContent: 'center',
	margin: '0px',
	textAlign: 'center'
};

export default Login;

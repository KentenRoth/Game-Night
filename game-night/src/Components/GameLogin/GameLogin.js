import React from 'react';
import axios from 'axios';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

const GameLogin = () => {
	return (
		<div className="content">
			<div className="container">
				<div className="box">
					<form onSubmit={onSubmit}>
						<Input
							type={'text'}
							place={'Game Name'}
							name={'name'}
						/>

						<Input
							type={'password'}
							place={'Password'}
							name={'password'}
						/>

						<LargeButton
							type={'submit'}
							color={'#88368D'}
							text={'Join Game'}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

const onSubmit = e => {
	const name = e.target.name.value;
	const password = e.target.password.value;
	e.preventDefault();

	axios
		.post('/game/login', {
			name,
			password
		})
		.then(res => console.log(res));
};

export default GameLogin;

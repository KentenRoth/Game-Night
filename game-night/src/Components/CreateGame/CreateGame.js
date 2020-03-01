import React from 'react';
import axios from 'axios';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

const CreateGame = () => {
	return (
		<div className="content">
			<div className="container">
				<div className="box">
					<form onSubmit={onSubmit}>
						<Input
							type={'text'}
							place={'Game Name'}
							name={'game'}
						/>

						<Input
							type={'password'}
							place={'Password'}
							name={'password'}
						/>

						<LargeButton
							type={'submit'}
							color={'#88368D'}
							text={'Create Game'}
						/>
					</form>
					<LargeButton text={'Join Game'} color={'#0F76C0'} />
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
		.post('/game', {
			name,
			password
		})
		.then(res => console.log(res));
};

export default CreateGame;

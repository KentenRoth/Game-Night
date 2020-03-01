import React from 'react';
import axios from 'axios';

import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

const CreatePlayer = () => {
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
							place={'Pin Number'}
							name={'pin'}
						/>

						<LargeButton
							type={'submit'}
							color={'#88368D'}
							text={'Create Player'}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

// Need to setup the config to grab the authToken from when game is created.
const onSubmit = e => {
	const name = e.target.name.value;
	const pin = e.target.pin.value;
	e.preventDefault();

	axios.post(
		'/ingameuser',
		{
			name,
			pin
		}
		// config
	);
};

export default CreatePlayer;

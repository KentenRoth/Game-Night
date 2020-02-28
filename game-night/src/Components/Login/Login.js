import React from 'react';
import LargeButton from '../Buttons/LargeButton';
import Input from '../Inputs/Input';

function Login() {
	return (
		<div className="content">
			<div className="container">
				<div styles={content}>
					<form>
						<Input type={'text'} place={'Email Address'} />

						<Input type={'password'} place={'Password'} />

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

const content = {
	justifyContent: 'center',
	margin: '0px',
	textAlign: 'center'
};

export default Login;

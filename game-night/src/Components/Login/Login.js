import React from 'react';

function Login() {
	return (
		<div className="container">
			<div>
				<form>
					<input
						type="text"
						placeholder="Email Address"
						style={inputStyle}
					/>
					<input
						type="password"
						placeholder="Password"
						style={inputStyle}
					/>
					<button type="submit" style={loginButtonStyle}>
						Login
					</button>
				</form>
				<button style={signUpButtonStyle}>Sign Up</button>
			</div>
		</div>
	);
}

const inputStyle = {
	backgroundColor: '#333333',
	border: 'none',
	borderBottom: '1px solid white',
	color: 'white',
	display: 'block',
	fontSize: '18px',
	margin: '0 auto',
	marginTop: '15px',
	padding: '5px 5px 0px 5px',
	width: '350px'
};

const loginButtonStyle = {
	backgroundColor: '#88368D',
	border: 'none',
	borderRadius: '20px',
	color: 'white',
	fontSize: '15px',
	fontWeight: 'bold',
	letterSpacing: '0.1em',
	margin: '30px 0px 15px 0px',
	padding: '8px 0px',
	width: '200px'
};

const signUpButtonStyle = {
	backgroundColor: '#0F76C0',
	border: 'none',
	borderRadius: '20px',
	color: 'white',
	fontSize: '15px',
	fontWeight: 'bold',
	letterSpacing: '0.1em',
	margin: '15px',
	padding: '8px 0px',
	width: '200px'
};

export default Login;

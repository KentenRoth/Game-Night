import React from 'react';

const LargeButton = props => {
	const color = props.color;

	const buttonStyle = {
		backgroundColor: color,
		border: 'none',
		borderRadius: '20px',
		color: 'white',
		fontSize: '15px',
		fontWeight: 'bold',
		letterSpacing: '0.1em',
		marginTop: '30px',
		padding: '8px 0px',
		width: '200px'
	};

	return (
		<button type={props.type} style={buttonStyle}>
			{props.text}
		</button>
	);
};

export default LargeButton;

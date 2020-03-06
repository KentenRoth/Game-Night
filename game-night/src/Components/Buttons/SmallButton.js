import React from 'react';

const SmallButton = props => {
	const color = props.color;

	const buttonStyle = {
		backgroundColor: color,
		border: 'none',
		borderRadius: '20px',
		color: 'white',
		fontSize: '12px',
		fontWeight: 'bold',
		letterSpacing: '0.1em',
		margin: '10px',
		padding: '2px',
		width: '100px'
	};

	return (
		<button
			type={props.type}
			style={buttonStyle}
			name={props.name}
			token={props.token}
			gameid={props.gameid}
		>
			{props.text}
		</button>
	);
};

export default SmallButton;

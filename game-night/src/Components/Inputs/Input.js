import React from 'react';

const Input = props => {
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

	return (
		<input type={props.type} placeholder={props.place} style={inputStyle} />
	);
};

export default Input;

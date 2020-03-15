import React from 'react';

const MortgageButton = props => {
	const isButtonDisabled = () => {
		if (props.text === 'Buy House' && props.disabled === true) {
			return {
				backgroundColor: props.color + '7F',
				border: 'none',
				borderRadius: '20px',
				color: 'white',
				cursor: 'not-allowed',
				fontSize: '12px',
				fontWeight: 'bold',
				letterSpacing: '0.1em',
				margin: '10px auto',
				padding: '2px',
				width: '150px'
			};
		} else {
			return {
				backgroundColor: props.color,
				border: 'none',
				borderRadius: '20px',
				color: 'white',
				fontSize: '12px',
				fontWeight: 'bold',
				letterSpacing: '0.1em',
				margin: '10px auto',
				padding: '2px',
				width: '150px'
			};
		}
	};

	const disabledButton = () => {
		if (props.text === 'Buy House' && props.disabled === true) {
			return 'disabled';
		}
		return;
	};

	return (
		<button
			type={props.type}
			style={isButtonDisabled()}
			name={props.name}
			token={props.token}
			gameid={props.gameid}
			disabled={disabledButton()}
		>
			{props.text}
		</button>
	);
};

export default MortgageButton;

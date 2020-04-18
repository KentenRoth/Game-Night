import React from 'react';

const MortgageButton = (props) => {
	const isButtonDisabled = () => {
		if (props.text === 'Buy House' && props.CanBuyHouse === false) {
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
				width: '150px',
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
				width: '150px',
			};
		}
	};

	const disabledButton = () => {
		if (props.text === 'Buy House' && props.CanBuyHouse === false) {
			return 'disabled';
		}
		return;
	};

	const letsGetMoreMoney = (e) => {
		console.log(props.property);
	};

	return (
		<button
			type={props.type}
			style={isButtonDisabled()}
			name={props.name}
			token={props.token}
			gameid={props.gameid}
			disabled={disabledButton()}
			onClick={letsGetMoreMoney}
		>
			{props.text}
		</button>
	);
};

export default MortgageButton;
